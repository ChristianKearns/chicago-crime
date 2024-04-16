import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const CT4LineGraph = ({Classified_As}) => {
    const [crimeData, setCrimeData] = useState({ streetLightDataSet: {labels: [], values: []}, crimesDataSet: {labels: [], values: []}});

    useEffect(() => {
        const fetchSTLData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/complex-trend4', {
                    params: {
                        Classified_As: Classified_As
                    }
                });

                const data = response.data;
                console.log('Here ---------- :' + Classified_As.toString());
                console.log(data);
                const labels = data.map(entry => entry[0]); // Assuming labels are strings (e.g., month names)
                const streetlights = data.map(entry => entry[2]);
                const crimes = data.map(entry => entry[4]);

                setCrimeData({
                    StreetLightData:{labels: labels, values: streetlights},
                    CrimesData:{labels: labels, values: crimes},
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchSTLData().then(() => console.log('Data fetched!'));

    }, []);

    useEffect(() => {
        console.log(crimeData)
    },[crimeData])




    return (
        <>
            {crimeData.StreetLightData && crimeData.CrimesData && (
                <Line
                    data={{
                        labels: crimeData.StreetLightData.labels,
                        datasets: [
                            {
                                label: 'Street Lights',
                                data: crimeData.StreetLightData.values,
                                backgroundColor: '#064FF0',
                                borderColor: '#064FF0',
                                yAxisID: 'y'
                            },
                            {
                                label: 'Crimes Committed',
                                data: crimeData.CrimesData.values,
                                backgroundColor: '#FF0000',
                                borderColor: '#FF0000',
                                yAxisID: 'y1',
                            }]
                    }}
                    width={900}
                    height={500}
                    options={{
                        elements: {
                            line: {
                                tension: 0.5,
                            },
                        },
                        scales: {
                            x: {
                                ticks: {
                                    display: true
                                },
                                display: true
                            },
                            y: {
                                type: 'linear',
                                display: true,
                                position: 'left',
                                title: {
                                    display: true,
                                    text: 'Street Light Outages',
                                },
                                suggestedMin: null, // Allow Chart.js to determine the scale
                                suggestedMax: null,
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
                                suggestedMin: null, // Allow Chart.js to determine the scale
                                suggestedMax: null,
                            }
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: 'Crime Trends vs. Street Light Outages',
                            },
                        },
                        maintainAspectRatio: false,
                    }}
                />
            )}
        </>
    );
};
export default CT4LineGraph;

