/* Formulaire d'article */
class Article {
    constructor(titre, resume, contenu, auteur, date_creation, date_maj) {
      this.titre = titre;
      this.resume = resume;
      this.contenu = contenu;
      this.auteur = auteur;
      this.date_creation = date_creation;
      this.date_maj = date_maj;
    }
  }
  
  module.exports = { Article };