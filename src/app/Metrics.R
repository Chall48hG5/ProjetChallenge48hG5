# Détecter le chemin du script en cours d'exécution
args <- commandArgs(trailingOnly = FALSE)
file_arg <- "--file="
script_path <- sub(file_arg, "", args[grep(file_arg, args)])

if (length(script_path) == 1) {
  script_dir <- dirname(normalizePath(script_path))
  setwd(script_dir)
  cat("Dossier de travail fixé à :", getwd(), "\n")
} else {
  cat("Impossible de déterminer le chemin du script, dossier de travail non modifié.\n")
}

# ─── Lancement du nettoyage initial ─────────────────────────────────────────────
# Lancer ClearBdd.R pour générer CleanData.csv
source("ClearBdd.R")

options(repos = c(CRAN = "https://cran.r-project.org"))

# ─── Configuration Initiale ─────────────────────────────────────────────────────
# Installation et chargement des packages nécessaires
packages <- c("dplyr", "stringr", "randomForest", "caret")

for (pkg in packages) {
  if (!require(pkg, character.only = TRUE)) {
    install.packages(pkg, dependencies = TRUE)
    library(pkg, character.only = TRUE)
  }
}

# ─── Lecture des données nettoyées ──────────────────────────────────────────────
df <- read.csv("CleanData.csv", stringsAsFactors = FALSE)

# Suppression éventuelle d'une première colonne inutile (souvent index automatique)
if (colnames(df)[1] %in% c("", "...1", "X", "X1")) {
  df <- df[, -1]
}

# ─── Prétraitement ──────────────────────────────────────────────────────────────
# Création d'une variable factor multi-classes pour la catastrophe
df$has_catastrophe_multi <- factor(df$catastrophe,
                                   levels = c("aucun", "seisme", "innondation", "innondation, seisme"))

# Suppression des lignes avec NA dans has_catastrophe (au cas où)
df <- df[!is.na(df$has_catastrophe), ]


# Conversion des variables numériques
num_vars <- c("temperature", "humidite", "force_moyenne_du_vecteur_de_vent",
              "force_du_vecteur_de_vent_max", "pluie_intensite_max",
              "sismicite", "concentration_gaz", "pluie_totale")
df[num_vars] <- lapply(df[num_vars], as.numeric)

# Conversion de "quartier" en facteur
df$quartier <- as.factor(df$quartier)

# ─── Agrégation par jour et quartier ────────────────────────────────────────────
df_daily <- df %>%
  group_by(date, quartier) %>%
  summarise(
    temperature = mean(temperature, na.rm = TRUE),
    humidite = mean(humidite, na.rm = TRUE),
    force_moyenne_du_vecteur_de_vent = mean(force_moyenne_du_vecteur_de_vent, na.rm = TRUE),
    force_du_vecteur_de_vent_max = max(force_du_vecteur_de_vent_max, na.rm = TRUE),
    pluie_intensite_max = max(pluie_intensite_max, na.rm = TRUE),
    sismicite = mean(sismicite, na.rm = TRUE),
    concentration_gaz = mean(concentration_gaz, na.rm = TRUE),
    pluie_totale = sum(pluie_totale, na.rm = TRUE),

    # Créer la variable multi-classes agrégée
    has_catastrophe_multi = {
      cats <- unique(has_catastrophe_multi)
      cats <- cats[cats != "aucun"]
      if (length(cats) == 0) {
        "aucun"
      } else if (length(cats) == 1) {
        cats
      } else {
        "innondation, seisme"
      }
    }
  ) %>%
  ungroup()
df_daily <- na.omit(df_daily)
df_daily$has_catastrophe_multi <- factor(df_daily$has_catastrophe_multi,
                                         levels = c("aucun", "seisme", "innondation", "innondation, seisme"))



# ─── Séparation train / test ────────────────────────────────────────────────────
index <- caret::createDataPartition(df_daily$has_catastrophe_multi, p = 0.8, list = FALSE)
train_data <- df_daily[index, ]
test_data <- df_daily[-index, ]

train_data$has_catastrophe_multi <- factor(train_data$has_catastrophe_multi,
                                           levels = c("aucun", "seisme", "innondation", "innondation, seisme"))
test_data$has_catastrophe_multi <- factor(test_data$has_catastrophe_multi,
                                          levels = c("aucun", "seisme", "innondation", "innondation, seisme"))


cat("Nombre de NA dans train_data :", sum(is.na(train_data)), "\n")


# ─── Entraînement Random Forest ─────────────────────────────────────────────────
rf_model <- randomForest(has_catastrophe_multi ~ temperature + humidite +
                           force_moyenne_du_vecteur_de_vent + force_du_vecteur_de_vent_max +
                           pluie_intensite_max + sismicite + concentration_gaz +
                           pluie_totale + quartier,
                         data = train_data,
                         ntree = 200)


# ─── Évaluation ─────────────────────────────────────────────────────────────────
predictions <- predict(rf_model, test_data)

conf_matrix <- caret::confusionMatrix(factor(predictions), factor(test_data$has_catastrophe_multi))
# Affichage de la matrice de confusion complète
print(conf_matrix)
# ─── Tableau de confusion inversé (lignes = Réalité, colonnes = Prédictions) ─────────────
conf_table <- as.data.frame.matrix(t(conf_matrix$table))  # transposer ici

# Réordonner pour que les lignes soient dans le bon ordre
conf_table <- conf_table[c("aucun", "seisme", "innondation", "innondation, seisme"), 
                         c("aucun", "seisme", "innondation", "innondation, seisme")]

# Ajouter une colonne "Réalité" pour plus de clarté
conf_table <- cbind(Realite = rownames(conf_table), conf_table)


# Sauvegarder dans un CSV
write.csv(conf_table, "confusion_matrix_tableau.csv", row.names = FALSE)
cat("✅ Tableau de confusion sauvegardé dans confusion_matrix_tableau.csv\n")

# Installer et charger gridExtra si nécessaire
if (!require(gridExtra)) {
  install.packages("gridExtra", dependencies = TRUE)
  library(gridExtra)
}

if (!require(grid)) {
  install.packages("grid", dependencies = TRUE)
  library(grid)
}

# Convertir conf_table en table grob
table_grob <- tableGrob(conf_table)

# Enregistrer le tableau en image PNG
png(filename = "confusion_matrix_tableau.png", width = 700, height = 200)
grid.draw(table_grob)
dev.off()

cat("✅ Image PNG du tableau de confusion sauvegardée dans confusion_matrix_tableau.png\n")


# Extraire les métriques par classe (Precision, Recall, F1)
byClass <- conf_matrix$byClass
# byClass est un vecteur nommé quand 2 classes, ou matrice si multiclasse

# Pour classification binaire, byClass est un vecteur nommé
if (is.matrix(byClass)) {
  metrics_class <- as.data.frame(byClass[, c("Precision", "Recall", "F1")])
  metrics_class$Class <- rownames(metrics_class)
  # Calculer moyenne (macro)
  avg_metrics <- colMeans(metrics_class[, c("Precision", "Recall", "F1")], na.rm = TRUE)
  avg_metrics <- data.frame(Class = "Average", t(avg_metrics))
  metrics_class <- rbind(metrics_class, avg_metrics)
} else {
  # binaire simple
  metrics_class <- data.frame(
    Class = c("0", "1"),
    Precision = byClass["Precision"],
    Recall = byClass["Recall"],
    F1 = byClass["F1"]
  )
  avg_metrics <- data.frame(Class = "Average",
                            Precision = mean(metrics_class$Precision, na.rm=TRUE),
                            Recall = mean(metrics_class$Recall, na.rm=TRUE),
                            F1 = mean(metrics_class$F1, na.rm=TRUE))
  metrics_class <- rbind(metrics_class, avg_metrics)
}

# Arrondir pour lisibilité
metrics_class[, -1] <- round(metrics_class[, -1], 3)

# Afficher résumé visuel des métriques par classe
cat("\n💡 Résumé visuel des métriques par classe :\n")
print(metrics_class)


# Calcul manuel de la précision et du F1-score
TP <- conf_matrix$table[2, 2]
FP <- conf_matrix$table[1, 2]
FN <- conf_matrix$table[2, 1]

precision <- TP / (TP + FP)
recall <- TP / (TP + FN)
f1_score <- 2 * (precision * recall) / (precision + recall)

# Ajouter les prédictions au jeu de test
test_data$prediction <- predictions

# Enregistrer les résultats dans un fichier CSV
write.csv(test_data, "predictions.csv", row.names = FALSE)

# ─── Sauvegarde des métriques dans un CSV ───────────────────────────────────────
metrics <- data.frame(
  Accuracy = conf_matrix$overall["Accuracy"],
  Kappa = conf_matrix$overall["Kappa"],
  Precision = precision,
  F1_Score = f1_score
)

write.csv(metrics, "metrics.csv", row.names = FALSE)
