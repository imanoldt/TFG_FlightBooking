import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

type CardProps = {
    title: string;
    description: string;
    image: string;
};

const Card_H = ({ title, description, image }: CardProps) => {
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);

    const handleVisitClick = () => {
        navigate(`/city/${title.toLowerCase()}`);
    };

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <img src={image} alt={title} className="object-cover w-full h-64"/>
            <div className="p-4 text-center">
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-gray-700 truncate">{description}</p>
                <div className="mt-4">
                    <button onClick={handleVisitClick} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition-colors">
                  Visitar
                    </button>
                    <div className="absolute bottom-4 right-4">
                    <svg onClick={toggleFavorite} xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 cursor-pointer ${isFavorite ? 'fill-current text-red-500 animate-beat' : 'text-gray-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isFavorite ? "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3 9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5 22 12.28 18.6 15.36 13.45 20.04L12 21.35z" : "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3 9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5 22 12.28 18.6 15.36 13.45 20.04L12 21.35z"} />
                    </svg>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Card_H;
