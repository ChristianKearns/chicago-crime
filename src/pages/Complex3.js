import React, { useState } from 'react';
import CT1lineGraph from "../components/CT1LineGraph";

export default function Complex1() {
    const [selectedOptions, setSelectedOptions] = useState({
        arrest: '',
        year: ''
    });

    const [isGraphVisible, setIsGraphVisible] = useState(false);

    const handleOptionChange = (event, option) => {
        setSelectedOptions({
            ...selectedOptions,
            [option]: event.target.value
        });
    };

    const handleShowGraph = () => {
        setIsGraphVisible(true);
    };

    const years = ['2021','2022', '2023'];

    const percentage = 50;

    return (
        <>
            <div className='graphs-container'>
                {/* Text description */}
                <p>
                    Have there been changes in law enforcement response times to ShotSpotter alerts over time,
                    and how do these changes correlate with the outcomes of crime incidents? Are there trends
                    indicating improvements or challenges in police responsiveness to gun violence incidents?
                </p>

                {/* Input fields for arrest and year */}
                <div style={{marginTop: '20px'}}>
                    <label>Arrest:</label>
                    <select
                        value={selectedOptions.arrest}
                        onChange={(e) => handleOptionChange(e, 'arrest')}
                        style={{marginRight: '10px'}}
                    >
                        <option value="">Select Arrest</option>
                        <option value="false">False</option>
                        <option value="true">True</option>
                    </select>

                    <label style={{marginRight: "10px"}}>Start Date:</label>
                    <select
                        value={selectedOptions.year}
                        onChange={(e) => handleOptionChange(e, 'year')}
                        style={{marginRight: "20px"}}
                    >
                        <option value="">Select Year</option>
                        {years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>

                    <button onClick={handleShowGraph}>Show Graph</button>
                </div>
            </div>

            {/* Graphs and text */}
            <div style={{display: 'flex', flexDirection: 'row'}}>
                {/* Left side containing dropdowns */}
                {isGraphVisible ? (
                    <div style={{flex: 1, marginLeft: "50px", marginRight: "75px"}}>
                        <CT1lineGraph arrest={selectedOptions.arrest} selectedYear={selectedOptions.year}/>
                    </div>
                ) : (
                    <div style={{flex: 1, marginLeft: "50px", marginRight: "75px"}}>
                        <p>Please select an arrest and a year and click "Show Graph" to view the graph</p>
                    </div>
                )}
                {/* Right side containing text */}
                <div style={{flex: 1, marginTop:'100px'}}>
                    <p>AVG Law Enforcement response: {percentage}%</p>
                </div>
            </div>
        </>
    );
}


