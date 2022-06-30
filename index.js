/* chargement du module et application express */
const express = require("express");
const serveur = express();
const { connexion } = require("./connexion");
const cheminArticles = require("./route");


serveur.use(express.urlencoded({ extended: true }));
serveur.use(express.json());
serveur.use("/api/blog", cheminArticles);


/* Connexion au base de données de mongodb */
connexion("mongodb://localhost:27017/", (erreur) => {
  if (erreur) {
    console.log("Erreur lors de la connexion a la base de données",erreur);
    process.exit(-1);
  } else {
    console.log("Connexion avec la base de données établie");
    serveur.listen(3000);
    console.log("Attente des requetes au port 3OOO");
  }
});
