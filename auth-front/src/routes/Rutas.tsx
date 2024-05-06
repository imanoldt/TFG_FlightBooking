import React, { useEffect, useState, Suspense } from "react";
import axios from 'axios';
import ScrollReveal from 'scrollreveal';
import DefaultLayoutTemplate from "../layout/DefaultLayoutTemplate";
import Card_H_load from "../components/Concrete/Card_H_load"; // Asegúrate de que la ruta de importación sea correcta

const LazyCard_H = React.lazy(() => import("../components/Concrete/Card_H"));

const Rutas = () => {
    const [cityDetails, setCityDetails] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:7903/api/rutas/city-data')
            .then(response => {
                setCityDetails(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching city data:', error);
                setLoading(false);
            });

        ScrollReveal().reveal('.card', { 
            delay: 500,
            duration: 1000,
            distance: '20px',
            origin: 'bottom',
            opacity: 0,
            easing: 'cubic-bezier(0.5, 0, 0, 1)',
            interval: 100
        });
    }, []);

    return (
        <DefaultLayoutTemplate>
        <div className="mt-8 mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
            <div className="flex flex-col gap-6">
                
                {Object.entries(cityDetails).map(([cityKey, cityInfo]) => (
                    <div className="card w-full" key={cityKey}>
                        <Suspense fallback={<Card_H_load />}>
                            <LazyCard_H 
                                title={cityKey.charAt(0).toUpperCase() + cityKey.slice(1)} 
                                description={cityInfo.description} 
                                image={cityInfo.images[0]}
                            />
                        </Suspense>
                    </div>
                ))}
            </div>
        </div>
    </DefaultLayoutTemplate>
    );
};

export default Rutas;