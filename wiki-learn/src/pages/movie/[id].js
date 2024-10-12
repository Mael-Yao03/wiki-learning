import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";

export default function Movie(req, res) {
  const [Movie, setMovie] = useState(null);
  const router = useRouter();

  const params = router.query.id;

  useEffect(() => {
    async function Onemovie() {
      const id = params;
      const res = await fetch(`/api/detailsmovie/` + id);
      const data = await res.json();
      setMovie(data);
    }

    Onemovie();
  }, [router]);

  return (
    <>
      <Header />
      {Movie ? (
        <>
          <div className="gap-4 flex-col flex items-center justify-center p-10 w-full">

          <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${Movie.link.split('youtu.be/')[1].split('?')[0]}`}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>

              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center">
                  {Movie.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 text-gray-400">
                  {Movie.description}
                </p>
              </div>
          </div>
        </>
      ) : (
        <h1 className="text-center p-10">Loading ⌛</h1>
      )}
    </>
  );
}
