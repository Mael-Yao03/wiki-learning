import connectToDataBase from "@/../config/database";
import Movies from "@/../models/movies";
 
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end(); // Méthode non autorisée
  }
 
  await connectToDataBase();
 
  const { query } = req.query;
 
  try {
    const movies = await Movies.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { descriotion: { $regex: query, $options: "i" } },
        { link: { $regex: query, $options: "i" } },
      ],
    });
 
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: "Failed to search movies" });
  }
}