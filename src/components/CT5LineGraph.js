import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line } from 'react-chartjs-2';

const CT5lineGraph = ({district, selectedYear}) => {
    const [crimeData, setCrimeData] = useState({
        robbery: { labels: [], values: [] },
        burglary: { labels: [], values: [] },
        assault: { labels: [], values: [] },
        theft: { labels: [], values: [] },
        homicide: { labels: [], values: [] },
        battery: { labels: [], values: [] }
    });

    useEffect(() => {
        const fetchData = async (arrest) => {
            try {
                const response = await axios.get('http://localhost:3001/complex-trend5', {
                    params: {
                        district: district,
                        year: selectedYear,
                    }
                });
                const data = response.data;

                // Filter data for each crime category
                const robberyData = data.filter(entry => entry[0] === 'ROBBERY');
                const burglaryData = data.filter(entry => entry[0] === 'BURGLARY');
                const assaultData = data.filter(entry => entry[0] === 'ASSAULT');
                const theftData = data.filter(entry => entry[0] === 'THEFT');
                const homicideData = data.filter(entry => entry[0] === 'HOMICIDE');
                const batteryData = data.filter(entry => entry[0] === 'BATTERY');

                // Extract labels and values for each crime category
                const robberyLabels = robberyData.map(entry => entry[1]); // Month
                const robberyValues = robberyData.map(entry => entry[4]); // Monthly frequency

                const burglaryLabels = burglaryData.map(entry => entry[1]);
                const burglaryValues = burglaryData.map(entry => entry[4]);

                const assaultLabels = assaultData.map(entry => entry[1]);
                const assaultValues = assaultData.map(entry => entry[4]);

                const theftLabels = theftData.map(entry => entry[1]);
                const theftValues = theftData.map(entry => entry[4]);

                const homicideLabels = homicideData.map(entry => entry[1]);
                const homicideValues = homicideData.map(entry => entry[4]);

                const batteryLabels = batteryData.map(entry => entry[1]);
                const batteryValues = batteryData.map(entry => entry[4]);


                // Update state for each dataset
                setCrimeData({
                    robbery: { labels: robberyLabels, values: robberyValues },
                    burglary: { labels: burglaryLabels, values: burglaryValues },
                    assault: { labels: assaultLabels, values: assaultValues },
                    theft: { labels: theftLabels, values: theftValues },
                    homicide: { labels: homicideLabels, values: homicideValues },
                    battery: { labels: batteryLabels, values: batteryValues }
                });

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData().then(() => console.log('Data fetched!'));

        // Cleanup function

    }, [district,selectedYear]);

    return (
        <div className="App">
            <div className="dataCard revenueCard">
                <Line
                    data={{
                        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                        datasets: [
                            {
                                label: 'Robbery',
                                data: crimeData.robbery.values, // Use robbery data for values
                                backgroundColor: '#FFFF00',
                                borderColor: '#FFFF00',
                            },
                            {
                                label: 'Burglary',
                                data: crimeData.burglary.values, // Use burglary data for values
                                backgroundColor: '#E48D19',
                                borderColor: '#E48D19',
                            },
                            {
                                label: 'Assault',
                                data: crimeData.assault.values, // Use assault data for values
                                backgroundColor: '#FF0000',
                                borderColor: '#FF0000',
                            },
                            {
                                label: 'Theft',
                                data: crimeData.theft.values, // Use theft data for values
                                backgroundColor: '#FFFFFF',
                                borderColor: '#FFFFFF',
                            },
                            {
                                label: 'Battery',
                                data: crimeData.battery.values, // Use battery data for values
                                backgroundColor: '#0000FF',
                                borderColor: '#0000FF',
                            },
                            {
                                label: 'Homicide',
                                data: crimeData.homicide.values, // Use homicide data for values
                                backgroundColor: '#000000',
                                borderColor: '#000000',
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
                                text: 'Monthly Crimes',
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default CT5lineGraph;
