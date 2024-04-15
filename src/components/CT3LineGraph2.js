import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const CT3LineGraph2 = ({ selectedYear, crimeType, communityArea }) => {
  const [crimeData, setCrimeData] = useState({ labels: [], values: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/complex-trend3', {
                    params: {
                        year: selectedYear,
                        type: crimeType,
                        area: communityArea
                    }
                });
                const data = response.data;
                console.log(data)
                const labels = data.map(entry => entry[0]); // Assuming labels are strings (e.g., month names)
                const values = data.map(entry => entry[1]);

                setCrimeData({ labels, values });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData().then(() => console.log('Data fetched!'));
    }, [selectedYear, crimeType, communityArea]);

    useEffect(() => {
        console.log(crimeData)
    },[crimeData])

  return (
        <Line
            data={{
                labels:crimeData.labels,
                datasets: [
                    {
                        label: 'Normalized Incident Rate',
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
                plugins: {
                    title: {
                        display: true,
                        text: 'Monthly Normalized Incident Rate',
                    },
                },
                maintainAspectRatio: false,
            }} 
        />
  );
};

export default CT3LineGraph2;
