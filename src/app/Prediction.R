library(readr)
library(dplyr)
library(randomForest)

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

# Appelle le script qui nettoie la base
source("ClearBdd.R")

# Charger les données nettoyées
df <- read_csv("CleanData.csv")

if (anyNA(df)) {
  cat("⚠️ Des valeurs manquantes ont été détectées dans les données. Suppression des lignes avec NA...\n")
  df <- na.omit(df)
}


# Supprimer la première colonne inutile si elle existe
if ("X1" %in% colnames(df)) {
  df <- df %>% select(-X1)
}

# Conversion des colonnes nécessaires
df$quartier <- as.factor(df$quartier)
df$date <- as.factor(df$date)
df$catastrophe <- as.factor(df$catastrophe)

# Variables d'entrée
features <- c("temperature", "humidite", "force_moyenne_du_vecteur_de_vent",
              "force_du_vecteur_de_vent_max", "pluie_intensite_max", 
              "quartier", "sismicite", "concentration_gaz", "pluie_totale")

# Modèles
modele_date <- randomForest(date ~ ., data = df[, c(features, "date")], ntree = 100)
modele_catastrophe <- randomForest(catastrophe ~ ., data = df[, c(features, "catastrophe")], ntree = 100)

# ✅ DONNÉES FIXES (exemple)
valeurs <- data.frame(
  temperature = 38.4,
  humidite = 44.1,
  force_moyenne_du_vecteur_de_vent = 3.6,
  force_du_vecteur_de_vent_max = 8.6,
  pluie_intensite_max = 0.0,
  quartier = as.factor(4),
  sismicite = 0.70,
  concentration_gaz = 125.27,
  pluie_totale = 642.95
)

# S'assurer que les niveaux du facteur 'quartier' sont compatibles
valeurs$quartier <- factor(valeurs$quartier, levels = levels(df$quartier))

# Prédictions
prediction_date <- predict(modele_date, valeurs)
prediction_catastrophe <- predict(modele_catastrophe, valeurs)

# Résultat
cat("\n--- Résultat de la prédiction ---\n")
cat("Date prédite : ", as.character(prediction_date), "\n")
cat("Catastrophe prédite : ", as.character(prediction_catastrophe), "\n")
