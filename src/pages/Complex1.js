import React, { useState } from 'react';
import CT1lineGraph from "../components/CT1LineGraph";

export default function Complex1() {
    const [selectedOptions, setSelectedOptions] = useState({
        gunshots: '',
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

    const years = ['2019','2020','2021','2022','2023'];


    return (
        <>
            <div className='graphs-container'>
                {/* Text description */}
                <p>
                    Have there been changes in law enforcement response times,within the hour, to the ShotSpotter alerts over time,
                    and how do these changes correlate with the outcomes of crime incidents involving single or multiple gunshots? Are there trends
                    indicating improvements or challenges in police responsiveness to gun violence incidents, in particular, weapon violations?
                </p>

                {/* Input fields for arrest and year */}
                <div style={{marginTop: '20px'}}>
                    <label>Gunshot Description:</label>
                    <select
                        value={selectedOptions.gunshots}
                        onChange={(e) => handleOptionChange(e, 'gunshots')}
                        style={{marginRight: '10px'}}
                    >
                        <option value="">Select Description</option>
                        <option value="SINGLE GUNSHOT">Single Gunshot</option>
                        <option value="MULTIPLE GUNSHOTS">Multiple Gunshots</option>
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
                        <CT1lineGraph gunshots={selectedOptions.gunshots} selectedYear={selectedOptions.year}/>
                    </div>
                ) : (
                    <div style={{flex: 1, marginLeft: "50px", marginRight: "75px"}}>
                        <p>Please select an arrest and a year and click "Show Graph" to view the graph</p>
                    </div>
                )}

                {isGraphVisible && (
                    <div style={{ flex: 1, marginLeft: "25px", marginRight: "50px" }}>
                        percentage of gun violence incidents involving single or multiple gunshots
                    </div>
                )}


            </div>
        </>
    );
}



