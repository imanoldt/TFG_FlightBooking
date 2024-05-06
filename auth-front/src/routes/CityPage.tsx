// CityPage.tsx
import DefaultLayoutTemplate from "../layout/DefaultLayoutTemplate";
import Collage from "../components/Collage/Collage";
import Text from "../components/Text/Text";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Map from "../components/Map/Map";
import Calendar from "../components/Calendar/Calendar";
import Graph from "../components/Chart/Graph";
import { addDays } from "date-fns";

const CityPage = () => {
    const { cityName } = useParams();
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

    // Fetch city details and graph data
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

    useEffect(() => {
        if (cityName && selectedAirline && dateRange.startDate && dateRange.endDate) {
            const formattedStartDate = dateRange.startDate.toISOString().split('T')[0];
            const formattedEndDate = dateRange.endDate.toISOString().split('T')[0];

            const fetchPriceData = async () => {
                try {
                    if (!cityName || !selectedAirline || !dateRange.startDate || !dateRange.endDate) {
                        console.error("Missing data for API request:", { cityName, selectedAirline, dateRange });
                        return;
                    }

                    const { data } = await axios.get(`http://localhost:7903/api/flight-price-history`, {
                        params: {
                            city: cityName,
                            airline: selectedAirline,
                            startDate: formattedStartDate,
                            endDate: formattedEndDate
                        }
                    });
                    setGraphData(data);
                } catch (error) {
                    console.error("Error fetching flight prices:", error);
                    setGraphData([]); // Consider resetting or handling empty data state
                }
            };

            fetchPriceData();
        }
    }, [cityName, selectedAirline, dateRange]);

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

                <div className="flex flex-col lg:flex-row justify-between gap-10 mt-10">
                    <div className="lg:w-1/2">
                        <Calendar cityName={cityName} setSelection={handleDateSelection} />
                    </div>
                    <div className="lg:w-1/2">
                        <Graph city={cityName} airline={selectedAirline} startDate={dateRange.startDate} endDate={dateRange.endDate} />
                    </div>
                </div>
            </div>
        </DefaultLayoutTemplate>
    );
};

export default CityPage;
