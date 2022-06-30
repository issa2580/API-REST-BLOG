const { MongoClient, Db } = require("mongodb");

let client = null;

/* Creation de nouvelle connexion sur mongodb */
function connexion(url, clbk) {
  if (client === null) {
    client = new MongoClient(url);

    client.connect((erreur) => {
      if (erreur) {
        client = null;
        clbk(erreur);
      } else {
        clbk();
      }
    });
  } else {
    clbk();
  }
}

/* Creation de la base de donnees dbBlog sur mongodb */
function database() {
  let db = new Db(client, "dbBlog");
  return db;
   
}

/* Fermer la connexion sur mongodb */
function fermconnexion() {
  if (client) {
    client.close();
    client = null;
  }
}

module.exports = { connexion, database, fermconnexion };