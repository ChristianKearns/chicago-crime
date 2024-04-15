import React, { useState, useEffect } from 'react';
import CT2LineGraph from "../components/CT2LineGraph";
import axios from 'axios';

const Complex2 = () => {
    const [selectedOptions, setSelectedOptions] = useState({ arrest: '', year: '' });
    const [chartData, setChartData] = useState(null);
    const [isGraphVisible, setIsGraphVisible] = useState(false);

    useEffect(() => {
        if (selectedOptions.year && isGraphVisible) {  // Only fetch data if the year is selected and graph is intended to be shown
            fetchData();
        }
    }, [selectedOptions, isGraphVisible]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/complex-trend2', {
                params: { year: selectedOptions.year, arrest: selectedOptions.arrest }
            });
            const dataByDistrict = response.data.reduce((acc, item) => {
                const [district, yearMonth, avgAttendance, crimeCount] = item;
                if (!acc[district]) {
                    acc[district] = {
                        label: `District ${district}`,
                        attendanceData: [],
                        crimeData: [],
                        labels: [],
                    };
                }
                acc[district].labels.push(yearMonth);
                acc[district].attendanceData.push(avgAttendance);
                acc[district].crimeData.push(crimeCount);
                return acc;
            }, {});

            const datasets = [];
            Object.values(dataByDistrict).forEach(district => {
                datasets.push({
                    label: `${district.label} - Attendance`,
                    data: district.attendanceData,
                    borderColor: 'rgb(75, 192, 235)',
                    backgroundColor: 'rgba(75, 192, 235, 0.5)',
                    yAxisID: 'y',
                });
                datasets.push({
                    label: `${district.label} - Crime Count`,
                    data: district.crimeData,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    yAxisID: 'y1',
                });
            });

            setChartData({
                labels: Object.values(dataByDistrict)[0].labels, // Assumes all districts have the same labels
                datasets,
            });
        } catch (error) {
            console.error('Error fetching data:', error);
            setChartData(null);
        }
    };


    const handleOptionChange = (event, option) => {
        setSelectedOptions({
            ...selectedOptions,
            [option]: event.target.value
        });
    };

    return (
        <div className='graphs-container'>
            <p>Explore the relationship between monthly crime counts and average student attendance in Chicago police districts.</p>
            <div style={{ marginTop: '20px' }}>
                <label>Arrest:</label>
                <select value={selectedOptions.arrest} onChange={(e) => handleOptionChange(e, 'arrest')} style={{ marginRight: '10px' }}>
                    <option value="">Select Arrest</option>
                    <option value="false">False</option>
                    <option value="true">True</option>
                </select>
                <label>Year:</label>
                <select value={selectedOptions.year} onChange={(e) => handleOptionChange(e, 'year')}>
                    <option value="">Select Year</option>
                    {['2021', '2022', '2023'].map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
                <button onClick={() => setIsGraphVisible(!isGraphVisible)}>Toggle Graph</button>
            </div>
            {isGraphVisible && chartData && <CT2LineGraph chartData={chartData} />}
        </div>
    );
};

export default Complex2;
