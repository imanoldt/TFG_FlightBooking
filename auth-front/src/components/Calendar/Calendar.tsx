// Calendar.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import airportMapping from '../../utils/airportMappings'; // Asegúrate de que la ruta es correcta

const DateSelector = ({ cityName, setSelection }) => {
    const [availableDates, setAvailableDates] = useState([]);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [airlines, setAirlines] = useState([]);
    const [selectedAirline, setSelectedAirline] = useState('');

    // Fetch available dates
    useEffect(() => {
        const airportName = airportMapping[cityName] || cityName;
        axios.get(`http://localhost:7903/api/available-dates/${airportName}`)
            .then(response => {
                const dates = new Set(response.data.map(date => date.split('T')[0]));
                const sortedDates = Array.from(dates).sort();
                setAvailableDates(sortedDates);
                if (sortedDates.length > 0) {
                    setFromDate(sortedDates[0]);
                    setToDate(sortedDates[sortedDates.length - 1]);
                }
            })
            .catch(error => {
                console.error('Error fetching available dates:', error);
            });
    }, [cityName]);

    // Fetch unique airlines
    useEffect(() => {
        const airportName = airportMapping[cityName] || cityName;
        axios.get(`http://localhost:7903/api/unique-airlines/${airportName}`)
            .then(response => {
                setAirlines(response.data);
                if (response.data.length > 0) {
                    setSelectedAirline(response.data[0]); // Set the first airline as selected by default
                }
            })
            .catch(error => {
                console.error('Error fetching unique airlines:', error);
            });
    }, [cityName]);

    const handleFromDateChange = (event) => {
        setFromDate(event.target.value);
        if (new Date(event.target.value) > new Date(toDate)) {
            setToDate(event.target.value);
        }
    };

    const handleToDateChange = (event) => {
        setToDate(event.target.value);
    };

    const handleAirlineChange = (event) => {
        setSelectedAirline(event.target.value);
    };

    const handleSelection = () => {
        setSelection(selectedAirline, fromDate, toDate);
    };

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="airline-selector" className="block text-sm font-medium text-gray-700">Aerolínea:</label>
                <select id="airline-selector" value={selectedAirline} onChange={handleAirlineChange} className="mt-1 block w-full py-2 px-3 border border-red-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm">
                    {airlines.map((airline) => (
                        <option key={airline} value={airline}>{airline}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="from-date" className="block text-sm font-medium text-gray-700">Desde:</label>
                <select id="from-date" value={fromDate} onChange={handleFromDateChange} className="mt-1 block w-full py-2 px-3 border border-red-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm">
                    {availableDates.map((date) => (
                        <option key={date} value={date}>{format(new Date(date), 'yyyy-MM-dd')}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="to-date" className="block text-sm font-medium text-gray-700">Hasta:</label>
                <select id="to-date" value={toDate} onChange={handleToDateChange} className="mt-1 block w-full py-2 px-3 border border-red-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm">
                    {availableDates.filter(date => new Date(date) >= new Date(fromDate)).map((date) => (
                        <option key={date} value={date}>{format(new Date(date), 'yyyy-MM-dd')}</option>
                    ))}
                </select>
            </div>
            <button onClick={handleSelection}>Seleccionar</button>
        </div>
    );
};

export default DateSelector;
