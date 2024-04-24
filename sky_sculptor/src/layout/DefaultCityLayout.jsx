import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import axios from 'axios'; // Asegúrate de instalar axios con npm o yarn

const DefaultCityLayout = () => {
  const { cityName } = useParams();
  const [cityData, setCityData] = useState({});

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const response = await axios.get(`http://yourapi.com/cities/${cityName}`);
        setCityData(response.data);
      } catch (error) {
        console.error('Error fetching city data:', error);
        // Manejo opcional de errores, como mostrar un mensaje al usuario
      }
    };

    fetchCityData();
  }, [cityName]); // El efecto se ejecutará cuando 'cityName' cambie

  return (
    <>
      <Navbar />
      <div className="flex flex-col bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
        <div className="relative group">
          {/* Asignación condicional de la imagen y el nombre de la ciudad */}
          <img
            src={cityData?.image || '/path/to/default/image.jpg'}
            alt={cityName}
            className="h-64 md:h-96 w-full object-cover rounded-t-xl"
          />
          <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 w-full py-2 px-4 rounded-b-xl group-hover:bg-opacity-70 transition duration-300">
            <h2 className="text-xl md:text-3xl font-bold text-white text-center">{cityName}</h2>
          </div>
        </div>
        <div className="p-4">
          <div className="mt-2 bg-gray-100 p-3 rounded-lg">
            <p className="text-gray-600">{cityData?.description || 'No description available'}</p>
          </div>
          {/* Otros elementos basados en los datos cargados */}
        </div>
      </div>
    </>
  );
};

export default DefaultCityLayout;
