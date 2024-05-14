import React, { useState } from "react";
import DefaultLayoutTemplate from "../layout/DefaultLayoutTemplate";
import AsyncSelect from "react-select/async";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

const citySuggestions = [
  { name: "Paris", image: "https://source.unsplash.com/random/200x200?paris" },
  {
    name: "New York",
    image: "https://source.unsplash.com/random/200x200?new+york",
  },
  { name: "Tokyo", image: "https://source.unsplash.com/random/200x200?tokyo" },
  {
    name: "London",
    image: "https://source.unsplash.com/random/200x200?london",
  },
  {
    name: "Sydney",
    image: "https://source.unsplash.com/random/200x200?sydney",
  },
];

const loadCityOptions = async (inputValue) => {
  if (!inputValue) return [];
  try {
    const response = await axios.get(
      `http://localhost:7903/api/cities/search?prefix=${inputValue}`
    );
    return response.data.map((city) => ({
      label: city.city,
      value: city.city,
    }));
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
};

const Buscar = () => {
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.3, duration: 0.6 } },
  };

  const cardVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <DefaultLayoutTemplate>
      <div className="bg-[url('bg1.jpg')] bg-no-repeat bg-cover bg-center relative z-10 pb-32 overflow-x-hidden min-h-screen flex items-center justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white/90 backdrop-blur-lg rounded-xl shadow-lg p-6 w-full max-w-4xl"
        >
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold">Scrap Me</h2>
            🌍 ¿A dónde te gustaría viajar? ✈️
          </div>
          <div className="flex items-center w-full mb-4">
            <FaSearch className="text-red-600 w-6 h-6" />
            <AsyncSelect
              cacheOptions
              loadOptions={loadCityOptions}
              defaultOptions
              placeholder="Enter a city..."
              className="flex-grow ml-4"
            />
            <button
              className="ml-4 bg-red-500 py-3 px-6 text-white font-semibold rounded-lg"
              onClick={() => console.log("Search clicked")}
            >
              Scrap Me
            </button>
          </div>
          <div className="flex w-full justify-around mb-4">
            <input
              type="date"
              className="bg-gray-200 p-3 rounded-lg text-lg"
              value={dateStart}
              onChange={(e) => setDateStart(e.target.value)}
              placeholder="dd/mm/yyyy"
            />
            <input
              type="date"
              className="bg-gray-200 p-3 rounded-lg text-lg"
              value={dateEnd}
              onChange={(e) => setDateEnd(e.target.value)}
              placeholder="dd/mm/yyyy"
            />
          </div>
          <motion.div
            className="grid grid-cols-5 gap-4 w-full"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
          >
            {citySuggestions.map((city) => (
              <motion.div
                key={city.name}
                variants={cardVariants}
                whileHover="hover"
                className="relative"
              >
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover rounded-lg"
                />
                <motion.div
                  className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-lg"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <p className="text-white text-xl font-semibold">
                    {city.name}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </DefaultLayoutTemplate>
  );
};

export default Buscar;
