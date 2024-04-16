import React, { useState, useEffect } from 'react';
import CT2LineGraph from "../components/CT2LineGraph";
import CT2BarGraph from "../components/CT2BarGraph";
import axios from 'axios';

const Complex2 = () => {
    const [selectedOptions, setSelectedOptions] = useState({ arrest: '', year: '' });
    const [chartData, setChartData] = useState(null);
    const [isGraphVisible, setIsGraphVisible] = useState(false);
    const [visibleDistricts, setVisibleDistricts] = useState(new Set(['1']));  // Initialize with only district 1 visible
    const [dataByDistrict, setDataByDistrict] = useState({}); // Manage district data in state

    useEffect(() => {
        if (selectedOptions.year && isGraphVisible) {
            fetchData();
        }
    }, [selectedOptions, isGraphVisible]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/complex-trend2', {
                params: { year: selectedOptions.year, arrest: selectedOptions.arrest }
            });
            processChartData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setChartData(null);
        }
    };

    const processChartData = (data) => {
        const newDataByDistrict = data.reduce((acc, [district, yearMonth, avgAttendance, crimeCount]) => {
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

        setDataByDistrict(newDataByDistrict);

        const datasets = Object.entries(newDataByDistrict).flatMap(([district, info]) => {
            const isVisible = visibleDistricts.has(district);
            return [
                {
                    label: `${info.label} - Attendance`,
                    data: info.attendanceData,
                    borderColor: 'rgb(75, 192, 235)',
                    backgroundColor: 'rgba(75, 192, 235, 0.5)',
                    yAxisID: 'y',
                    hidden: !isVisible,
                },
                {
                    label: `${info.label} - Crime Count`,
                    data: info.crimeData,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    yAxisID: 'y1',
                    hidden: !isVisible,
                }
            ];
        });

        setChartData({
            labels: Object.values(newDataByDistrict)[0]?.labels,
            datasets,
        });
    };

    const toggleDistrictVisibility = (district) => {
        const newVisibleDistricts = new Set(visibleDistricts);
        if (newVisibleDistricts.has(district)) {
            newVisibleDistricts.delete(district);
        } else {
            newVisibleDistricts.add(district);
        }
        setVisibleDistricts(newVisibleDistricts);
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
                <button onClick={() => setIsGraphVisible(!isGraphVisible)}>Toggle Graphs</button>
            </div>
            {isGraphVisible && chartData && (
                <>
                    <CT2LineGraph chartData={chartData} />
                    <CT2BarGraph chartData={chartData} />
                </>
            )}
            <div>
                {Object.keys(dataByDistrict).map(district => (
                    <button key={district} onClick={() => toggleDistrictVisibility(district)}>
                        Toggle District {district}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Complex2;
