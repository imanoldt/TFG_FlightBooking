import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import airportMapping from '../../utils/airportMappings';
import { API_URL } from '../../auth/constant';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface FlightPriceData {
  time: string;
  price: number;
  airline: string;
}

interface Props {
  city: string;
}

const Graph_2: React.FC<Props> = ({ city }) => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [airlines, setAirlines] = useState<string[]>([]);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [chartData, setChartData] = useState({ datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      const airportName = airportMapping[city.toLowerCase()] || city;
      const datesResponse = await axios.get(`${API_URL}/available-dates/${airportName}`);
      const airlinesResponse = await axios.get(`${API_URL}/unique-airlines/${airportName}`);
      const uniqueDates = [...new Set(datesResponse.data.map(date => date.split('T')[0]))].sort();

      setAvailableDates(uniqueDates);
      setAirlines(airlinesResponse.data);
      if (uniqueDates.length) {
        setFromDate(uniqueDates[0]);
        setToDate(uniqueDates[uniqueDates.length - 1]);
      }
    };

    fetchData();
  }, [city]);

  useEffect(() => {
    const fetchFlightData = async () => {
      if (fromDate && toDate && selectedAirlines.length > 0 && city) {
        const airportName = airportMapping[city.toLowerCase()] || city;
        const response = await axios.get(`${API_URL}/flight-price-history`, {
          params: {
            city: airportName,
            airlines: selectedAirlines.join(','),
            startDate: fromDate,
            endDate: toDate,
          },
        });

        const newChartData = {
          labels: response.data.map(d => new Date(d.time).toLocaleDateString()),
          datasets: selectedAirlines.map(airline => ({
            label: airline,
            data: response.data.filter(d => d.airline === airline).map(d => d.price),
            borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            fill: false,
          })),
        };
        setChartData(newChartData);
      }
    };

    fetchFlightData();
  }, [fromDate, toDate, selectedAirlines, city]);

  const handleAirlineChange = (airline: string) => {
    setSelectedAirlines(prev => prev.includes(airline) ? prev.filter(a => a !== airline) : [...prev, airline]);
  };

  return (
    <div className="flex p-4 "> {/* Usa h-screen o h-full para que tome toda la altura de la pantalla */}
      <div className="flex flex-col w-1/4 p-4 bg-white shadow-2xl rounded-lg overflow-y-auto "> {/* Sección de filtros */}
        <h2 className="text-lg font-bold text-gray-700 text-center">Filtros</h2>
        <div className='p-2'>
          <label className="block text-sm font-medium text-gray-700 mb-2">Aerolíneas:</label>
          {airlines.map(airline => (
            <div key={airline} className="flex items-center">
              <input
                type="checkbox"
                id={airline}
                checked={selectedAirlines.includes(airline)}
                onChange={() => handleAirlineChange(airline)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor={airline} className="ml-2 block text-sm text-gray-900">{airline}</label>
            </div>
          ))}
        </div>
        <div className='p-2'>
          <label htmlFor="from-date" className="block text-sm font-medium text-gray-700">Desde:</label>
          <select
            id="from-date"
            value={fromDate}
            onChange={e => setFromDate(e.target.value)}
            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          >
            {availableDates.map(date => (
              <option key={date} value={date}>{date}</option>
            ))}
          </select>
        </div>
        <div className='p-2'>
          <label htmlFor="to-date" className="block text-sm font-medium text-gray-700">Hasta:</label>
          <select
            id="to-date"
            value={toDate}
            onChange={e => setToDate(e.target.value)}
            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          >
            {availableDates.map(date => (
              <option key={date} value={date}>{date}</option>
            ))}
          </select>
        </div>
      </div>
  
      <div className="flex-grow p-4 ml-4 flex flex-col shadow-2xl rounded-lg"> {/* Sección del gráfico */}
        <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">Historial de Precio</h2>
        <div className="flex-grow"> {/* Asegura que el contenedor del gráfico ocupa el espacio restante */}
          <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
  
};

export default Graph_2;

