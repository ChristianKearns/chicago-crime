import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const CT3LineGraph2 = ({ selectedYear, crimeType, communityArea }) => {
  const [crimeData, setCrimeData] = useState({ 
        data2019: { labels: [], values: [] },
        data2020: { labels: [], values: [] },
        data2021: { labels: [], values: [] },
        data2022: { labels: [], values: [] },
        data2023: { labels: [], values: [] }
   });

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

                // Filter data for each crime category
                const Data2019 = data.filter(entry => entry[1] == '2019');
                const Data2020 = data.filter(entry => entry[1] == '2020');
                const Data2021 = data.filter(entry => entry[1] == '2021');
                const Data2022 = data.filter(entry => entry[1] == '2022');
                const Data2023 = data.filter(entry => entry[1] == '2023');

                // Extract labels and values for each crime category
                const Labels2019 = Data2019.map(entry => entry[0]); // Month
                const Values2019 = Data2019.map(entry => entry[2]); // Monthly frequency

                const Labels2020 = Data2020.map(entry => entry[0]);
                const Values2020 = Data2020.map(entry => entry[2]);

                const Labels2021 = Data2021.map(entry => entry[0]);
                const Values2021 = Data2021.map(entry => entry[2]);

                const Labels2022 = Data2022.map(entry => entry[0]);
                const Values2022 = Data2022.map(entry => entry[2]);

                const Labels2023 = Data2023.map(entry => entry[0]);
                const Values2023 = Data2023.map(entry => entry[2]);

                setCrimeData({ 
                    data2019: { labels: Labels2019, values: Values2019 },
                    data2020: { labels: Labels2020, values: Values2020 },
                    data2021: { labels: Labels2021, values: Values2021 },
                    data2022: { labels: Labels2022, values: Values2022 },
                    data2023: { labels: Labels2023, values: Values2023 }
                 });
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
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [
                    {
                        label: '2019 Normalized Incident Rate',
                        data: crimeData.data2019.values,
                        backgroundColor: '#FFFF00',
                        borderColor: '#FFFF00',
                    },
                    {
                        label: '2020 Normalized Incident Rate',
                        data: crimeData.data2020.values, 
                        backgroundColor: '#E48D19',
                        borderColor: '#E48D19',
                    },
                    {
                        label: '2021 Normalized Incident Rate',
                        data: crimeData.data2021.values, 
                        backgroundColor: '#FF0000',
                        borderColor: '#FF0000',
                    },
                    {
                        label: '2022 Normalized Incident Rate',
                        data: crimeData.data2022.values, 
                        backgroundColor: '#FFFFFF',
                        borderColor: '#FFFFFF',
                    },
                    {
                        label: '2023 Normalized Incident Rate',
                        data: crimeData.data2023.values,
                        backgroundColor: '#0000FF',
                        borderColor: '#0000FF',
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
