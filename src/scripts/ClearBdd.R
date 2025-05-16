library(dplyr)
library(stringr)

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


# Fonction pour splitter une ligne sur les virgules hors des crochets
split_line_outside_brackets <- function(text) {
  out <- c()
  current <- ""
  depth <- 0
  chars <- strsplit(text, "")[[1]]
  for (ch in chars) {
    if (ch == '"') {
      next  # ignorer les guillemets
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

# Vérifie que le fichier "Bdd.csv" existe dans le dossier courant
if (!file.exists("Bdd.csv")) {
  stop("Le fichier Bdd.csv n'existe pas dans le dossier courant : ", getwd())
}
# Lire les lignes
lines <- readLines("Bdd.csv")

# S�parer l'en-t�te des donn�es
header <- split_line_outside_brackets(lines[1])
data_lines <- lines[-1]

# Appliquer le traitement sur les lignes de donn�es
split_data <- lapply(data_lines, split_line_outside_brackets)

# Ajustement des lignes in�gales
max_len <- length(header)  # On prend le header comme r�f�rence
split_data_padded <- lapply(split_data, function(x) {
  c(x, rep(NA, max_len - length(x)))
})

# Cr�ation du DataFrame avec noms de colonnes
df <- as.data.frame(do.call(rbind, split_data_padded), stringsAsFactors = FALSE)
colnames(df) <- header

# Exemple : vérification dossier courant
cat("Le dossier de travail actuel est :", getwd(), "\n")

# Export du CSV dans le dossier courant (celui où tu lances le script)
write.csv(df, "CleanData.csv", row.names = FALSE, na = "")
cat("Fichier CleanData.csv créé avec succès dans le dossier courant.\n")
