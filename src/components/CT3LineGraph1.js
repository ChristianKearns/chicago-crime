import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const CT3LineGraph1 = () => {
  const [crimeData, setCrimeData] = useState({ labels: [], values: [] });
  const decimals = 2;

    useEffect(() => {
        const fetchEconomicData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/area-income-info');
                const data = response.data;
                const labels = data.map(entry => entry[0]); // Assuming labels are strings (e.g., month names)
                const values = data.map(entry => entry[1]);

                setCrimeData({ labels, values });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchEconomicData().then(() => console.log('Data fetched!'));

    }, []);

    useEffect(() => {
        console.log(crimeData)
    },[crimeData])

  return (
        <Line
            data={{
                labels:crimeData.labels,
                datasets: [
                    {
                        label: 'Per-Capita-Income',
                        data: crimeData.values,
                        backgroundColor: '#064FF0',
                        borderColor: '#064FF0',
                    },
                ],
            }}
            width={900}
            height={500}
            options={{
                elements: {
                    line: {
                        tension: 0.5,
                    },
                },
                scales:{
                    x: {
                        ticks: {
                            display: false
                        },
                        display: false
                    },
                    y: {
                        ticks: {
                        // Include a dollar sign in the ticks
                        callback: function(value, index, values) {
                            return '$' + value.toFixed(decimals);
                        }
                    }}
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Community Areas in Relation to Per-Capita-Income',
                    },
                },
                maintainAspectRatio: false,
            }}
            
        />
  );
};

export default CT3LineGraph1;
