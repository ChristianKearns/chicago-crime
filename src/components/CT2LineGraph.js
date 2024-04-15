import React from 'react';
import { Line } from 'react-chartjs-2';

const CT2LineGraph = ({ chartData }) => {
    const options = {
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'Avg. Student Attendance (%)',
                },
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                title: {
                    display: true,
                    text: 'Crime Count',
                },
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
            title: {
                display: true,
                text: `Crime Trends vs. Student Attendance`,
            },
        },
    };

    return (
        <div className="App">
            <div className="dataCard revenueCard">
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
};

export default CT2LineGraph;
