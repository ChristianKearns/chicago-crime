import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CT2LineGraph from "../components/CT2LineGraph";

const Complex2 = () => {
    const [district, setDistrict] = useState('');
    const [availableYears, setAvailableYears] = useState([]);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        fetchYears();
    }, []);

    useEffect(() => {
        if (district) {
            fetchData();
        }
    }, [district]);

    const fetchYears = async () => {
        try {
            const response = await axios.get('http://localhost:3001/available-years');
            setAvailableYears(response.data);
        } catch (error) {
            console.error('Error fetching years:', error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/complex-trend2', {
                params: { district }
            });
            processChartData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setChartData(null);
        }
    };

    const processChartData = (data) => {
        const colorGenerator = () => `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`;

        const attendanceDataset = {
            label: `Avg Student Attendance`,
            data: data.map(item => ({
                x: item.year,
                y: item.avgStudentAttendance
            })),
            borderColor: colorGenerator(),
            backgroundColor: 'rgba(0, 0, 0, 0)', // Transparent background for the line
            fill: false,
            tension: 0.4, // This makes the line smooth
            yAxisID: 'y',
        };

        const crimeCountDataset = {
            label: `Crime Count`,
            data: data.map(item => ({
                x: item.year,
                y: item.crimeCount
            })),
            borderColor: colorGenerator(),
            backgroundColor: colorGenerator(),
            fill: false,
            tension: 0.4, // This makes the line smooth
            yAxisID: 'y1', 
        };

        const labels = availableYears; 

        setChartData({
            labels,
            datasets: [attendanceDataset, crimeCountDataset]
        });
    };

    return (
        <div className='graphs-container'>
            <p>Explore the relationship between crime counts and student attendance across districts.</p>
            <div>
                <label>District:</label>
                <input value={district} onChange={e => setDistrict(e.target.value)} placeholder="Enter District" />
                <button onClick={fetchData}>Show Graphs</button>
            </div>
            {chartData && <CT2LineGraph chartData={chartData} />}
        </div>
    );
};

export default Complex2;
