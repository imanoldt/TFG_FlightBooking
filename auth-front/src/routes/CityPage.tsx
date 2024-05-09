import DefaultLayoutTemplate from "../layout/DefaultLayoutTemplate";
import Collage from "../components/Collage/Collage";
import Text from "../components/Text/Text";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Map from "../components/Map/Map";
import { addDays } from "date-fns";
import Graph_2 from "../components/Chart/Graph_2";
import Graph from "../components/Chart/Graph";

const CityPage = () => {
    const { cityName } = useParams(); // Obtiene el nombre de la ciudad de los parámetros de la URL
    const [cityDetails, setCityDetails] = useState({ images: [], description: "" });
    const [selectedAirline, setSelectedAirline] = useState('');
    const [dateRange, setDateRange] = useState({
        startDate: new Date(),
        endDate: addDays(new Date(), 7),
        key: 'selection'
    });
    const [graphData, setGraphData] = useState([]);

    const handleDateSelection = (selectedAirline, startDate, endDate) => {
        setSelectedAirline(selectedAirline);
        setDateRange({ startDate, endDate });
    };

    useEffect(() => {
        if (cityName) {
            axios.get(`http://localhost:7903/api/city-images/${cityName}`)
                .then(response => {
                    setCityDetails(response.data);
                })
                .catch(error => {
                    console.error("Error fetching city details:", error);
                });
        }
    }, [cityName]);

    


    return (
        <DefaultLayoutTemplate>
            <Collage images={cityDetails.images} cityName={cityName} />
            <div className="container mx-auto px-4 lg:px-0">


                <div className="flex flex-col lg:flex-row justify-between gap-10 mt-10">
                    <div className="lg:w-1/2">
                        <Text quote={cityDetails.description} />
                    </div>
                    <div className="lg:w-1/2">
                        <Map cityName={cityName} />
                    </div>
                </div>
                <Graph_2 city={cityName} />
                

            </div>
        </DefaultLayoutTemplate>
    );
};

export default CityPage;
