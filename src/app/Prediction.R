# ─── Configuration Initiale ─────────────────────────────────────────────────────
# Installation et chargement des packages nécessaires
packages <- c("dplyr", "stringr", "randomForest", "caret")

for (pkg in packages) {
  if (!require(pkg, character.only = TRUE)) {
    install.packages(pkg, dependencies = TRUE)
    library(pkg, character.only = TRUE)
  }
}

# ─── Lecture et nettoyage des données ───────────────────────────────────────────
split_line_outside_brackets <- function(text) {
  out <- c()
  current <- ""
  depth <- 0
  chars <- strsplit(text, "")[[1]]
  for (ch in chars) {
    if (ch == '"') {
      next
    } else if (ch == "[") {
      depth <- depth + 1
      current <- paste0(current, ch)
    } else if (ch == "]") {
      depth <- depth - 1
      current <- paste0(current, ch)
    } else if (ch == "," && depth == 0) {
      out <- c(out, current)
      current <- ""
    } else {
      current <- paste0(current, ch)
    }
  }
  out <- c(out, current)
  return(out)
}

setwd("~/Challenge48h")

# Lecture du fichier brut
lines <- readLines("Bdd.csv", encoding = "UTF-8")
header <- split_line_outside_brackets(lines[1])
data_lines <- lines[-1]
split_data <- lapply(data_lines, split_line_outside_brackets)

# Ajout de NA pour lignes incomplètes
max_len <- length(header)
split_data_padded <- lapply(split_data, function(x) {
  c(x, rep(NA, max_len - length(x)))
})

# Conversion en DataFrame
df <- as.data.frame(do.call(rbind, split_data_padded), stringsAsFactors = FALSE)
colnames(df) <- header

# ─── Prétraitement ──────────────────────────────────────────────────────────────
# Suppression de la première colonne (ID)
df <- df[, -1]

# Nettoyage de la colonne catastrophe
df$catastrophe <- gsub("\\[|\\]|'", "", df$catastrophe)
df$catastrophe <- gsub(" ", "", df$catastrophe)

# Création d'une variable binaire : "aucun" = 0, sinon = 1
df$has_catastrophe <- ifelse(df$catastrophe == "aucun", 0, 1)

# Suppression des lignes avec NA dans has_catastrophe (au cas où)
df <- df[!is.na(df$has_catastrophe), ]

# Conversion de has_catastrophe en facteur (très important pour classification)
df$has_catastrophe <- factor(df$has_catastrophe, levels = c(0, 1))

# Conversion des variables numériques
num_vars <- c("temperature", "humidite", "force_moyenne_du_vecteur_de_vent",
              "force_du_vecteur_de_vent_max", "pluie_intensite_max",
              "sismicite", "concentration_gaz", "pluie_totale")
df[num_vars] <- lapply(df[num_vars], as.numeric)

# Conversion de "quartier" en facteur
df$quartier <- as.factor(df$quartier)

# ─── Séparation train / test ────────────────────────────────────────────────────
set.seed(123)
index <- caret::createDataPartition(df$has_catastrophe, p = 0.8, list = FALSE)
train_data <- df[index, ]
test_data <- df[-index, ]

# S’assurer que has_catastrophe est facteur dans train et test
train_data$has_catastrophe <- factor(train_data$has_catastrophe, levels = c(0, 1))
test_data$has_catastrophe <- factor(test_data$has_catastrophe, levels = c(0, 1))

# ─── Entraînement Random Forest ─────────────────────────────────────────────────
rf_model <- randomForest(has_catastrophe ~ temperature + humidite +
                           force_moyenne_du_vecteur_de_vent + force_du_vecteur_de_vent_max +
                           pluie_intensite_max + sismicite + concentration_gaz +
                           pluie_totale + quartier,
                         data = train_data,
                         ntree = 200)
  
# ─── Évaluation ─────────────────────────────────────────────────────────────────
predictions <- predict(rf_model, test_data)

# Convertir predictions en facteur avec mêmes niveaux que test_data$has_catastrophe
predictions <- factor(predictions, levels = levels(test_data$has_catastrophe))

conf_matrix <- caret::confusionMatrix(predictions, test_data$has_catastrophe)
print(conf_matrix)

