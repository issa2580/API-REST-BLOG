const { ObjectID } = require("bson");
const client = require("./connexion");
const { Article } = require("./article");

/* Formulaire d'ajout d'article */
const ajouterArticle = async (req, res) => {
  try {
    let article = new Article(
      req.body.titre,
      req.body.resume,
      req.body.contenu,
      req.body.auteur,
      req.body.date_creation,
      req.body.date_maj
    );
    let result = await client
      .database()
      .collection("articles")
      .insertOne(article);

    res.status(200).json(result);
  } 
  catch (erreur) {
    console.log(erreur);
    res.status(501).json(erreur);
  }
};

/* Affichage d'articles au maximum 10 avec pagination */
const listeArticles = async (req, res) => {
  try { 
    /*
    const pageNumber = 2
    const pageSize = 10
    */
    let pages = client
      .database()
      .collection("articles")
      .find()
      .limit(10)
    /*  let result = await result.skip((pageNumber-1)*pageSize).limit(pageSize); */
    let result = await pages.toArray();
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(204).json({ msg: "Aucun article trouvé" });
    }
  } catch (erreur) {
    console.log(erreur);
    res.status(501).json(erreur);
  }
};

/* Afficher les details d'un articles de par son id */
const detailsArticle = async (req, res) => {
  try {
    let id = new ObjectID(req.params.id);
    let page = client
      .database()
      .collection("articles")
      .find({ _id: id });

    let result = await page.toArray();
    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(204).json({ msg: "Cet article n'existe pas" });
    }
  } catch (erreur) {
    console.log(erreur);
    res.status(501).json(erreur);
  }
};

/* Modifier un articles de par son id */
const modifArticle = async (req, res) => {
  try {
    let id = new ObjectID(req.params.id);
    let titre = req.body.titre;
    let resume = req.body.resume;
    let contenu = req.body.contenu;
    let auteur = req.body.auteur;
    let date_creation = req.body.date_creation;
    let date_maj = req.body.date_maj;

    let result = await client
      .database()
      .collection("articles")
      .updateOne(
        { _id: id }, 
        { $set: { titre, resume, contenu, auteur, date_creation, date_maj} });

    if (result.modifiedCount === 1) {
      res.status(200).json({ msg: "Modification réussie" });
    } else {
      res.status(404).json({ msg: "Cet article n'existe pas" });
    }
  } catch (erreur) {
    console.log(erreur);
    res.status(501).json(erreur);
  }
};

/* Modifier un articles de par son id */
const supArticle = async (req, res) => {
  try {
    let id = new ObjectID(req.params.id);
    let result = await client
      .database()
      .collection("articles")
      .deleteOne({ _id: id });
    if (result.deletedCount === 1) {
      res.status(200).json({ msg: "Suppression réussie" });
    } else {
      res.status(404).json({ msg: "Cet article n'existe pas" });
    }
  } catch (erreur) {
    console.log(erreur);

    res.status(501).json(erreur);
  }
};

module.exports = {
  ajouterArticle,
  listeArticles,
  detailsArticle,
  modifArticle,
  supArticle,
};