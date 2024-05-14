import React, { useEffect, useState, Suspense } from "react";
import axios from "axios";
import ScrollReveal from "scrollreveal";
import DefaultLayoutTemplate from "../layout/DefaultLayoutTemplate";
import Card_H_load from "../components/Concrete/Card_H_load";
import { useAuth } from "../auth/AuthProvider";

const LazyCard_H = React.lazy(() => import("../components/Concrete/Card_H"));

const Rutas = () => {
  const [cityDetails, setCityDetails] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useAuth();

  const fetchFavorites = async () => {
    try {
      const token = auth.getAccessToken();
      if (token) {
        const response = await axios.get(
          "http://localhost:7903/api/user/favorites",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // Normaliza los favoritos a minúsculas para la comparación
        const normalizedFavorites = response.data.favorites.map((f) =>
          f.toLowerCase()
        );
        setFavorites(normalizedFavorites);
        console.log("Normalized favorites fetched:", normalizedFavorites);
      } else {
        console.log("No token available for fetching favorites.");
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:7903/api/rutas/city-data")
      .then((response) => {
        setCityDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching city data:", error);
        setLoading(false);
      });

    fetchFavorites();

    ScrollReveal().reveal(".card", {
      delay: 500,
      duration: 1000,
      distance: "20px",
      origin: "bottom",
      opacity: 0,
      easing: "cubic-bezier(0.5, 0, 0, 1)",
      interval: 100,
    });
  }, [auth]); // Re-fetch when auth changes

  return (
    <DefaultLayoutTemplate>
      <div className="bg-[url('bg1.jpg')] bg-no-repeat bg-cover bg-center relative z-10 pb-32 overflow-x-hidden min-h-screen flex items-center justify-center">
        <div className="mt-8 mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
          <div className="flex flex-col gap-6">
            {Object.entries(cityDetails).map(([cityKey, cityInfo]) => {
              const isFavorite = favorites.includes(cityKey.toLowerCase().trim());
              console.log(
                `Rendering ${cityKey}: Favorite status is ${isFavorite}`
              );
              return (
                <div className="card w-full" key={cityKey}>
                  <Suspense fallback={<Card_H_load />}>
                    <LazyCard_H
                      title={cityKey.charAt(0).toUpperCase() + cityKey.slice(1)}
                      description={cityInfo.description}
                      image={cityInfo.images[0]}
                      isFavoriteInitially={isFavorite}
                    />
                  </Suspense>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DefaultLayoutTemplate>
  );
};

export default Rutas;
