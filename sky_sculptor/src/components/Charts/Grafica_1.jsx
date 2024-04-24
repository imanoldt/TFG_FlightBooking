// Grafica_1.jsx
import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

const Grafica1 = () => {
    const chartContainerRef = useRef();

    useEffect(() => {
        // Asegúrate de que el contenedor de la gráfica esté montado
        if (chartContainerRef.current) {
            const chart = createChart(chartContainerRef.current, { width: chartContainerRef.current.clientWidth, height: 300 });
            const lineSeries = chart.addLineSeries();
            lineSeries.setData([
                { time: '2019-04-11', value: 80.01 },
                { time: '2019-04-12', value: 96.63 },
                { time: '2019-04-13', value: 76.64 },
                { time: '2019-04-14', value: 81.89 },
                { time: '2019-04-15', value: 74.43 },
            ]);

            // Ajusta la gráfica al tamaño del contenedor si la ventana cambia de tamaño
            const resizeChart = () => chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            window.addEventListener('resize', resizeChart);

            // Limpieza al desmontar
            return () => {
                window.removeEventListener('resize', resizeChart);
                chart.remove();
            };
        }
    }, []);

    return <div ref={chartContainerRef} className="h-full w-full" />;
};

export default Grafica1;
