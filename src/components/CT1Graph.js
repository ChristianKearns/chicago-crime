import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line,Bar } from 'react-chartjs-2';

const CT1Graph = ({selectedYear,gunshots}) => {
    const [crimeData, setCrimeData] = useState({ labels: [], values: [] });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/complex-trend1/bar', {
                    params: {
                        year: selectedYear,
                        gunshots: gunshots
                    }
                });
                const data = response.data;
                const labels = data.map(entry => entry[0]); // Assuming labels are strings (e.g., month names)
                const values = data.map(entry => entry[1]);

                setCrimeData({ labels, values});


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData().then(() => console.log('Data fetched! ct1graph'));

    }, [selectedYear,gunshots]);

    return (
        <div className="App">
            <div className="dataCard revenueCard">
                <Bar
                    data={{
                        labels:crimeData.labels,
                        datasets: [
                            {
                                label: 'Murders',
                                data: crimeData.values,
                                backgroundColor: '#4f007d',
                                borderColor: '#4f007d',
                            },
                        ],
                    }}
                    options={{
                        elements: {
                            line: {
                                tension: 0.5,
                            },
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: 'Monthly Crimes Reported',
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default CT1Graph;