// Card_H_load.tsx
const Card_H_load = () => {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <div className="animate-pulse ">
                <div className="w-full h-64 bg-gray-300 shimmer"></div> {/* Placeholder para la imagen, mismo tamaño que en Card_H */}
                <div className="p-4 text-center space-y-2">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto shimmer"></div> {/* Placeholder para el título, intenta imitar el estilo */}
                    <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto shimmer"></div> {/* Placeholder para la descripción */}
                    <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto shimmer"></div> {/* Segunda línea de la descripción */}
                    <div className="mt-4">
                        <div className="bg-red-200 h-10 w-24 mx-auto rounded-full shimmer"></div> {/* Placeholder para el botón */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card_H_load;
