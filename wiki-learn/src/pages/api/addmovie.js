import connectToDatabase from "../../../config/database";
import Movies from "@/../models/movies";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Méthode non autorisée
  }

  // Ajoute un log pour vérifier les données reçues
  console.log("Données reçues :", req.body);

  const { title, description, link } = req.body;

  if (!title || !description || !link) {
    return res.status(400).json({ message: "Toutes les données sont requises" });
  }

  try {
    // Connexion à la base de données
    await connectToDatabase();
    console.log("Connexion à la base de données réussie !");

    // Vérifie si le modèle est bien importé
    console.log("Modèle Movies :", Movies);

    // Création du nouveau document de film
    const movie = new Movies({
      title,
      description,
      link,
    });

    // Sauvegarde dans la base de données
    await movie.save();

    // Réponse en cas de succès
    res.status(201).json({ message: "Ajout réussi !" });
  } catch (error) {
    console.error("Erreur lors de l'ajout du film:", error.message, error.stack); // Log de l'erreur complet pour diagnostic
    res.status(500).json({ message: "Erreur interne du serveur", details: error.message });
  }
}
