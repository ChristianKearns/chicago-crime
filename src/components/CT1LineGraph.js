import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line,Bar } from 'react-chartjs-2';

const CT1lineGraph = ({selectedYear,gunshots}) => {
    // create true string
    const trueString = 'true';
    const falseString = 'false';
    const [crimeData, setCrimeData] = useState({ labels: [], values: []});
    const [crimeDataF, setCrimeDataF] = useState({ labels: [] });

    useEffect(() => {
        const fetchData = async (arrest) => {
            try {
                const response = await axios.get('http://localhost:3001/complex-trend1', {
                    params: {
                        year: selectedYear,
                        arrest: arrest,
                        gunshots: gunshots
                    }
                });
                const data = response.data;
                const labels = data.map(entry => entry[0]); // Assuming labels are strings (e.g., month names)
                const values = data.map(entry => entry[1]);

                if(arrest === trueString){
                    setCrimeData({ labels, values });
                } else {
                    setCrimeDataF({ labels, values });
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(trueString).then(() => console.log('Data fetched!'));
        fetchData(falseString).then(() => console.log('Data fetched!'));

        // Cleanup function

    }, [selectedYear,gunshots]);

    return (
        <div className="App">
            <div className="dataCard revenueCard">

                <Line
                    data={{
                        labels:crimeData.labels,
                        datasets: [
                            {
                                label: 'Arrest Made',
                                data: crimeData.values,
                                backgroundColor: '#064FF0',
                                borderColor: '#064FF0',
                            },
                            {
                                label: 'No Arrest Made',
                                data: crimeDataF.values,
                                backgroundColor: '#ff4d00',
                                borderColor: '#ff4d00',
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

export default CT1lineGraph;




