import { useRouter } from "next/router";
import Link from "next/link";

import { useEffect, useState } from "react";

export default function SearchResults() {
  const router = useRouter();
  const { query } = router.query;
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (query) {
      fetch(`/api/search?query=${query}`)
        .then((res) => res.json())
        .then((data) => setMovies(data))
        .catch((error) => console.error("Error fetching movies:", error));
    }
  }, [query]);

  return (
    <div className="gap-4 flex-col flex items-center justify-center p-10 w-full">
      <h1 className="text-center font-semibold text-4xl">Search Results</h1>
      {movies.length > 0 ? (
        <ul className="flex flex-col justify-between p-4 leading-normal">
          <li>
            <Link href="/">
              {" "}
              <strong>Accueil</strong>
            </Link>
          </li>
          {movies.map((movie) => (
            <li key={movie._id}>
              <img
                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                src={"https://image.tmdb.org/t/p/w300" + movie.image} alt="movie image" />
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {movie.title}
              </h2>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {movie.description}
              </p>
              <p>
                <strong>Genre:</strong> {movie.genre.join(", ")}
              </p>
              <p>Date: {movie.date}</p>
              <p>
                <strong>Director:</strong> {movie.director}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No movies found</p>
      )}
    </div>
  );
}
