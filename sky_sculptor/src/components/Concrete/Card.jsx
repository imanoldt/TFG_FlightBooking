// Card.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiStar } from "react-icons/hi";

const Card = ({ image, text, accuracy, reviews, price }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/city/${text.toLowerCase()}`);
    console.log('Navigating to:', `/city/${text.toLowerCase()}`);
  };

  return (
    <div onClick={handleCardClick} className="cursor-pointer">
      <div className="overflow-hidden my-0 mx-auto rounded-2xl">
        <img
          src={image}
          alt={text}
          className="rounded-2xl w-[300px] h-[300px] hoverImg"
        />
      </div>
      <h5 className="text-2xl py-4 font-semibold">{text}</h5>
      <span className="flex items-center justify-between">
        <div className="bg-white text-gray shadow rounded-lg w-16 p-2 flex items-center gap-1">
          {accuracy}<HiStar className="text-orange" />
        </div>
        <p>{reviews}</p>
        <div className="bg-primary text-white text-lg text-center w-20 p-1 rounded-md transition-bg hover:bg-white hover:text-primary">
          {price}
        </div>
      </span>
    </div>
  );
};

export default Card;