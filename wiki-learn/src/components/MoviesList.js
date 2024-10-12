import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

export default function Admin() {
  const [movies, setMovies] = useState([]);

  async function AllMovies() {
    const res = await fetch("/api/allmovies");
    const data = await res.json();
    setMovies(data);
  }

  async function delMovie(id) {
    const res = await fetch("/api/deletemovie/" + id, {
      method: "DELETE",
    });
    Swal.fire({
      title: 'Success!',
      text: 'Film bien supprimé !',
      icon: 'success',
      confirmButtonText: 'Super !'
    })
    AllMovies();
  }

  function confirmDelete(id) {
    Swal.fire({
      title: "Êtes-vous sûr?",
      text: "Cette action est irréversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimer!",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        delMovie(id);
      }
    });
  }

  useEffect(() => {
    AllMovies();
  }, []);

  return (
    <>
      {movies ? (
        <>
          <br />
          <div className="p-7">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-16 py-3">
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Titre
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {movies.map((movie) => (
                    <tr key={movie.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="p-4">
                        <img
                          src={"https://image.tmdb.org/t/p/w300" + movie.image}
                          className="w-16 md:w-32 max-w-full max-h-full"
                          alt="Movie picture"
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {movie.title}
                      </td>

                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {movie.description}
                      </td>
                      <td className="px-6 py-4">
                        <a
                        onClick={() => confirmDelete(movie._id)}
                          href="#"
                          className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        >
                          Supprimer
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <h1 className="text-center p-10">Loading ⌛</h1>
      )}
    </>
  );
}
