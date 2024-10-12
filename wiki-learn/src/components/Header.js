import Link from "next/link";
import styles from "@/styles/header.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu visibility
  const router = useRouter();

  useEffect(() => {
    // if (typeof window !== "undefined") {
    //   const token = localStorage.getItem("token");
    //   setIsAuthenticated(!!token);
    // }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      router.push("/signin");
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    router.push(`/search?query=${searchTerm}`);
  };

  return (
<nav className="bg-white shadow-md w-full">
  <div className="container mx-auto flex flex-wrap items-center justify-between py-4 px-6">
    <div className="flex items-center justify-between w-full">
      <div className="text-xl font-bold">
        <Link href="/">Wicki-learning</Link>
      </div>
      <button
        className="text-gray-800 hover:text-gray-600 focus:outline-none md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>
    <div className={`w-full md:flex md:items-center md:w-full ${isMenuOpen ? 'block' : 'hidden'}`}>
      <ul className="flex flex-col md:flex-row items-center w-full md:w-auto space-y-4 md:space-y-0 md:space-x-6 mt-4 md:mt-0">
        <li>
          <Link href="/">Accueil</Link>
        </li>
        {isAuthenticated ? (
        <><li>
                <Link href="/profile">Formations</Link>
              </li><li>
                  <Link href="/new_formation">Ajouter</Link>
                </li><>
                  <li className="md:hidden">
                    <Link href="/notifs" className="relative">
                      <svg
                        className="w-6 h-6 text-gray-800"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.133 12.632v-1.8a5.407 5.407 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.933.933 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175Zm-13.267-.8a1 1 0 0 1-1-1 9.424 9.424 0 0 1 2.517-6.391A1.001 1.001 0 1 1 6.854 5.8a7.43 7.43 0 0 0-1.988 5.037 1 1 0 0 1-1 .995Zm16.268 0a1 1 0 0 1-1-1A7.431 7.431 0 0 0 17.146 5.8a1 1 0 0 1 1.471-1.354 9.424 9.424 0 0 1 2.517 6.391 1 1 0 0 1-1 .995ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z" />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="logoutButton">
                      Logout
                    </button>
                  </li>
                </></>
        ) : (
          <>
            <li>
              <Link href="/signin">Sign in</Link>
            </li>
          </>
        )}
      </ul>
      <div className="flex items-center w-full md:w-[50%] lg:w-[60%] xl:w-[70%] mt-4 md:mt-0 md:ml-4">
        <form onSubmit={handleSearch} className="flex flex-grow">
          <label htmlFor="default-search" className="sr-only">Search</label>
          <div className="relative w-full">
            <input
              type="search"
              id="default-search"
              // value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full p-4 pl-12 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search Movie..."
              required
            />
            <button
              type="submit"
              className="text-white absolute right-3 bottom-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              Search
            </button>
          </div>
        </form>
        
      </div>
    </div>
  </div>
</nav>

  
  );
}