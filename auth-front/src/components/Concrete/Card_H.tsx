import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthProvider';
import axios from 'axios';
import { API_URL } from '../../auth/constant';

type CardProps = {
    title: string;
    description: string;
    image: string;
    isFavoriteInitially: boolean; // Añadir prop para el estado inicial
};

const Card_H = ({ title, description, image, isFavoriteInitially }: CardProps) => {
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(isFavoriteInitially);
    const auth = useAuth();

    useEffect(() => {
        setIsFavorite(isFavoriteInitially);
    }, [isFavoriteInitially]);

    const handleVisitClick = () => {
        navigate(`/city/${title.toLowerCase()}`);
    };

    const toggleFavorite = async () => {
        const newFavoriteStatus = !isFavorite;
        setIsFavorite(newFavoriteStatus);
        const cityNameNormalized = title.toLowerCase();
        try {
            const token = auth.getAccessToken();
            if (token) {
                await axios.post(`${API_URL}/user/update-favorites`, {
                    city: cityNameNormalized
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            } else {
                setIsFavorite(!newFavoriteStatus); // Revert back if no token
            }
        } catch (error) {
            console.error('Error updating favorites:', error);
            setIsFavorite(!newFavoriteStatus); // Revert back on error
        }
    };

    const cardBackgroundColor = isFavorite ? 'bg-red-100' : 'bg-white';

    return (
        <div className={`relative ${cardBackgroundColor} rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer`}>
    <img src={image} alt={title} className="object-cover w-full h-64"/>
    <div className="p-4 text-center">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-700 truncate">{description}</p>
        <div className="mt-4">
            <button onClick={handleVisitClick} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition-colors">
                Visitar
            </button>
        </div>
    </div>
    <svg onClick={toggleFavorite} xmlns="http://www.w3.org/2000/svg" className={`absolute bottom-4 right-4 h-6 w-6 cursor-pointer ${isFavorite ? 'fill-current text-red-500 animate-pulse' : 'text-gray-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isFavorite ? "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3 9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5 22 12.28 18.6 15.36 13.45 20.04L12 21.35z" : "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3 9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5 22 12.28 18.6 15.36 13.45 20.04L12 21.35z"} />
    </svg>
</div>
    );
};

export default Card_H;
