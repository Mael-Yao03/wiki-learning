import { useState } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Swal from "sweetalert2";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const isValidYouTubeUrl = (url) => {
    const pattern = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    return pattern.test(url);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !description || !link) {
      Swal.fire({
        title: "Erreur",
        text: "Tous les champs sont obligatoires",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    if (!isValidYouTubeUrl(link)) {
      Swal.fire({
        title: "Erreur",
        text: "Veuillez entrer un lien YouTube valide",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    setIsSubmitting(true); 

    try {
      const res = await fetch("/api/addmovie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title, description: description, link: link }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Erreur lors de l'ajout de la vidéo");
      }

      Swal.fire({
        title: "Succès",
        text: "Vidéo ajoutée avec succès !",
        icon: "success",
        confirmButtonText: "Super !",
      });
      router.push("/"); 
    } catch (error) {
      Swal.fire({
        title: "Erreur",
        text: error.message || "Une erreur s'est produite. Veuillez réessayer.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } finally {
      setIsSubmitting(false); // Fin de la soumission du formulaire
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 font-[sans-serif] w-full max-w-lg p-10 bg-white shadow-lg rounded"
        >
          <h6 className="text-center mb-6 text-lg font-bold">Ajouter une nouvelle vidéo</h6>

          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Titre <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-gray-300 focus:border-blue-500 rounded transition duration-200"
            placeholder="Titre de la vidéo"
          />

          <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-2">
            Lien de la vidéo <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            name="link"
            id="link"
            value={link}
            onChange={(event) => setLink(event.target.value)}
            required
            className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-gray-300 focus:border-blue-500 rounded transition duration-200"
            placeholder="Lien YouTube de la vidéo"
          />

          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows="4"
            required
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Brève description de la vidéo"
          ></textarea>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-8 w-full px-4 py-2.5 block text-sm text-white rounded transition duration-200 ${
              isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isSubmitting ? "Enregistrement..." : "Enregistrer"}
          </button>
        </form>
      </div>
    </>
  );
}
