import { useState } from 'react';
import { motion } from 'framer-motion';
import DefaultLayoutTemplate from '../layout/DefaultLayoutTemplate'; // Asegúrate de ajustar la ruta según tu estructura de carpetas
import 'tailwindcss/tailwind.css';

const TravelCardSlider = () => {
  const [positionIndexes, setPositionIndexes] = useState([0, 1, 2, 3, 4]);

  const handleNext = () => {
    setPositionIndexes((prevIndexes) => {
      const updatedIndexes = prevIndexes.map((prevIndex) => (prevIndex + 1) % 5);
      return updatedIndexes;
    });
  };

  const handleBack = () => {
    setPositionIndexes((prevIndexes) => {
      const updatedIndexes = prevIndexes.map((prevIndex) => (prevIndex + 4) % 5);
      return updatedIndexes;
    });
  };

  const cards = [
    { imageSrc: 'LPA.jpg', location: 'Gran Canaria' },
    { imageSrc: 'LPA.jpg', location: 'Madrid-Barajas' },
    { imageSrc: 'LPA.jpg', location: 'Ibiza' },
    { imageSrc: 'LPA.jpg', location: 'Londres-Gatwick' },
    { imageSrc: 'LPA.jpg', location: 'Málaga-Costa del Sol' },
  ];

  const positions = ['center', 'left1', 'left', 'right', 'right1'];

  const cardVariants = {
    center: { x: '0%', y: '0%', scale: 1, zIndex: 5 },
    left1: { x: '-50%', y: '10%', scale: 0.8, zIndex: 3 },
    left: { x: '-90%', y: '20%', scale: 0.6, zIndex: 2 },
    right: { x: '90%', y: '20%', scale: 0.6, zIndex: 2 },
    right1: { x: '50%', y: '10%', scale: 0.8, zIndex: 3 },
  };

  return (
    <DefaultLayoutTemplate>
      <div className="flex items-center flex-col justify-center bg-gray-100 h-screen relative overflow-hidden">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-lg p-4 absolute"
            initial="center"
            animate={positions[positionIndexes[index]]}
            variants={cardVariants}
            transition={{ duration: 0.5 }}
            style={{ width: '200px', height: '300px' }}
          >
            <img src={card.imageSrc} alt={card.location} className="rounded-t-lg w-full h-40 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2">{card.location}</h2>
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 w-full">
                Compartir Viaje
              </button>
            </div>
          </motion.div>
        ))}
        <div className="flex flex-row gap-3 mt-4">
          <button
            className="text-white bg-indigo-400 rounded-md py-2 px-4"
            onClick={handleBack}
          >
            Back
          </button>
          <button
            className="text-white bg-indigo-400 rounded-md py-2 px-4"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </DefaultLayoutTemplate>
  );
};

export default TravelCardSlider;
