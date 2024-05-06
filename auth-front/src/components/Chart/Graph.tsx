import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { createChart, CrosshairMode } from 'lightweight-charts';

const Graph = ({ city, airline, startDate, endDate }) => {
    const chartContainerRef = useRef(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [city, airline, startDate, endDate]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:7903/api/flight-price-history`, {
                params: { city, airline, startDate, endDate }
            });
            setData(response.data);
        } catch (error) {
            console.error("Failed to fetch data:", error);
            setData([]);
        }
    };

    useEffect(() => {
        if (chartContainerRef.current && data.length > 0) {
            const chart = createChart(chartContainerRef.current, {
                width: chartContainerRef.current.clientWidth,
                height: 300,
                layout: {
                    backgroundColor: '#ffffff',
                    textColor: '#333',
                },
                grid: {
                    vertLines: {
                        color: 'rgba(197, 203, 206, 0.5)',
                    },
                    horzLines: {
                        color: 'rgba(197, 203, 206, 0.5)',
                    },
                },
                crosshair: {
                    mode: CrosshairMode.Normal,
                },
                priceScale: {
                    borderColor: 'rgba(197, 203, 206, 1)',
                },
                timeScale: {
                    borderColor: 'rgba(197, 203, 206, 1)',
                },
            });

            const lineSeries = chart.addLineSeries({
                color: '#2962FF',
                lineWidth: 2,
            });

            lineSeries.setData(data.map(item => ({
                time: item.time.split('T')[0], 
                value: item.price
            })));

            return () => {
                chart.remove(); // Clean up on unmount
            };
        }
    }, [data]);

    return <div ref={chartContainerRef} className="w-full h-64 bg-white shadow rounded-lg p-4"></div>;
};

export default Graph;
