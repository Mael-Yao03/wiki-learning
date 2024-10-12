import connectToDatabase from '../../../config/database';
import Movies from '../../../models/movies';

 
export default async function moviesList(req, res) {

    if (req.method !== "GET") {
        return res.status(405).end();
      }  
 
  await connectToDatabase();
 
  try{
    const movies = await Movies.find(req.query);
    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Une erreur est survenue" });
  }
  
}
 