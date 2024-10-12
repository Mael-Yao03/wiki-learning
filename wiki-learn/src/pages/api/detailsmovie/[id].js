import connectToDatabase from "../../../../config/database";
import Movies from "../../../../models/movies";

export default async function moviesList(req, res) {
  const { id } = req.query;

  if (req.method !== "GET") {
    return res.status(405).end();
  }

  await connectToDatabase();

  try {
    const movie = await Movies.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "movie not found" });
    }
    res.status(200).json(movie);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Une erreur est survenue" });
  }
}
