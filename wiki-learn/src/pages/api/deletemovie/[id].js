import connectToDatabase from "@/../config/database";
import Movies from "@/../models/movies";

export default async function deleteMovie(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).end();
  }
  const { id } = req.query;

  await connectToDatabase();

  try {
    const movie = await Movies.findByIdAndDelete(id);
    if (!movie) {
      return res.status(404).json({ message: "Ce film n'a pas été trouvé !" });
    }
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Une erreur est survenue" });
  }
}
