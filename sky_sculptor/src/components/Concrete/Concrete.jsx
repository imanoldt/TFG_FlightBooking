import React from 'react';
import { HiStar } from 'react-icons/hi';

export default function Concrete() {

  const MadridCard = () => {
    return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg my-5 mx-auto">
        <img
          src="../public/LPA.jpg" // Asegúrate de tener una imagen representativa de Madrid
          alt="Madrid"
          className="w-full"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Descubre Madrid</div>
          <p className="text-gray-700 text-base">
            Explora la capital de España, con su rica historia, vibrante vida nocturna y famosos museos como el Prado y el Reina Sofía.
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">9.8 <HiStar className="text-orange-500" /></span>
          <span className="inline-block bg-primary cursor-pointer text-white text-sm px-3 py-1 rounded transition-bg hover:bg-white hover:text-primary">
            ≈ 50 €
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-lightGray my-16 py-16 relative">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          <p className="text-primary font-bold capitalize tracking-[0.15em]">
            Destino destacado
          </p>
          <h2 className="text-4xl font-bold capitalize my-4">
            Madrid
          </h2>
        </div>
        <div className="flex justify-center">
          <MadridCard />
        </div>
      </div>
    </div>
  );
}
