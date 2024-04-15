import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {Chart} from "chart.js";

const TotalBarGraph = () => {
    const [data, setData] = useState({ labels: [], values: [] });
    const [lastRow, setLastRow] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/tuple-count');
                const fetchedData = response.data;

                // Extract the last row
                const lastEntryIndex = fetchedData.length - 1;
                const lastRowData = fetchedData[lastEntryIndex];

                // Remove the last row from the fetched data
                const dataWithoutLastRow = fetchedData.slice(0, -1);

                const labels = dataWithoutLastRow.map(entry => entry[0]);
                const values = dataWithoutLastRow.map(entry => entry[1]);

                setData({ labels, values });
                setLastRow(lastRowData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };


        fetchData().then(() => console.log('Data fetched!'));

        // Cleanup function
    }, []);

    return (
        <div className="App">
            <div className="dataCard revenueCard">
                <Bar
                    data={{
                        labels: data.labels,
                        datasets: [
                            {
                                label: 'Crimes',
                                data: data.values,
                                backgroundColor: '#064FF0',
                                borderColor: '#064FF0',
                            },
                        ],
                    }}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: 'Monthly Crimes',
                            },
                        },
                    }}
                />
            </div>
            <div>
                <h2>Database:</h2>
                <p>{`Total Tuples: ${lastRow[1]}`}</p>
            </div>
        </div>
    );
};

export default TotalBarGraph;
