import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';

const Graph_2 = () => {
  const chartContainerRef = useRef(null);
  const [fromDate, setFromDate] = useState('2022-01-01');
  const [toDate, setToDate] = useState('2022-06-15');
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const airlines = ['Delta', 'American Airlines', 'United', 'Southwest']; // Ejemplo de aerolíneas

  const [data, setData] = useState([
    { time: '2022-01-01', value: 100 },
    // Añade más datos como los que ya tienes
    { time: '2022-06-15', value: 200 }
  ]);

  useEffect(() => {
    if (chartContainerRef.current) {
      const filteredData = data.filter(
        d => d.time >= fromDate && d.time <= toDate
      );

      const chartOptions = {
        layout: {
          textColor: 'black',
          background: { type: 'solid', color: 'white' },
        },
      };

      const chart = createChart(chartContainerRef.current, chartOptions);
      const series = chart.addLineSeries({
        color: '#2962FF',
        lineWidth: 2,
        lastValueVisible: false,
        priceLineVisible: false,
      });
      series.setData(filteredData);

      return () => {
        chart.remove();
      };
    }
  }, [fromDate, toDate, data]);

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };

  const handleAirlineChange = (airline) => {
    setSelectedAirlines(prev => {
      if (prev.includes(airline)) {
        return prev.filter(a => a !== airline);
      } else {
        return [...prev, airline];
      }
    });
  };

  return (
    <div className="flex">
      <div className="w-72 p-4 space-y-6 bg-white shadow-xl rounded-lg">
        <h3 className="text-lg font-bold text-gray-700">Filtros</h3>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Aerolíneas:</label>
          {airlines.map(airline => (
            <div key={airline} className="flex items-center">
              <input
                type="checkbox"
                id={airline}
                checked={selectedAirlines.includes(airline)}
                onChange={() => handleAirlineChange(airline)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor={airline} className="ml-2 block text-sm text-gray-900">
                {airline}
              </label>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <label htmlFor="from-date" className="block text-sm font-medium text-gray-700">Desde:</label>
          <select id="from-date" value={fromDate} onChange={handleFromDateChange} className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm">
            {data.map(d => (
              <option key={d.time} value={d.time}>{d.time}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="to-date" className="block text-sm font-medium text-gray-700">Hasta:</label>
          <select id="to-date" value={toDate} onChange={handleToDateChange} className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm">
            {data.map(d => (
              <option key={d.time} value={d.time}>{d.time}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex-grow p-4">
        <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">Historial de Precio</h2>
        <div
          ref={chartContainerRef}
          className="shadow-xl rounded-xl overflow-hidden transition-opacity duration-1000 ease-out opacity-0 animate-fade-in"
          style={{ height: '300px', width: '100%' }}
        />
      </div>
    </div>
  );
};

export default Graph_2;
