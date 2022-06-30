/* Chemin d'acces des operations suivants */
const express = require("express");
const {
  ajouterArticle,
  listeArticles,
  detailsArticle,
  modifArticle,
  supArticle,
} = require("./traitement");
const router = express.Router();

router.route("/articles").post(ajouterArticle);
router.route("/articles").get(listeArticles);
router.route("/articles/:id").get(detailsArticle);
router.route("/articles/:id").put(modifArticle);
router.route("/articles/:id").delete(supArticle);

module.exports = router;