import { useNavigate } from 'react-router-dom';

type CardProps = {
    title: string;
    description: string;
    image: string;
};

const Card_H = ({ title, description, image }: CardProps) => {
    const navigate = useNavigate();

    const handleVisitClick = () => {
        navigate(`/city/${title.toLowerCase()}`);
    };

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
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
        </div>
    );
};

export default Card_H;
