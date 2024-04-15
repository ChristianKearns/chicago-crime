import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line } from 'react-chartjs-2';

const CT3LineGraph = ({ arrest, selectedYear }) => {
  const [crimeData, setCrimeData] = useState({ labels: [], values: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/complex-trend1', {
                    params: {
                        year: selectedYear,
                        arrest: arrest,
                    }
                });
                const data = response.data;
                const labels = data.map(entry => entry[0]); // Assuming labels are strings (e.g., month names)
                const values = data.map(entry => entry[1]);

                setCrimeData({ labels, values });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData().then(() => console.log('Data fetched!'));

        // Cleanup function

    }, [arrest, selectedYear]);

  return (
    <div className="App">
            <div className="dataCard revenueCard">
                <Line
                    data={{
                        labels:crimeData.labels,
                        datasets: [
                            {
                                label: 'Crimes',
                                data: crimeData.values,
                                backgroundColor: '#064FF0',
                                borderColor: '#064FF0',
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

export default CrimeTrendChart;
