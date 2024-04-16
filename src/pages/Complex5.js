import React, { useState } from 'react';
import CT5lineGraph from "../components/CT5LineGraph";

export default function Complex5() {
    const [selectedOptions, setSelectedOptions] = useState({
        district: '',
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
                How do the rates of different crime categories (e.g. homicide) vary throughout the year and in which districts (e.g. northern districts vs southern)?
                Has this changed over time? Can an increase in a certain crime category be predicted based on the time of the year and location?
                Identifying recurring patterns can help anticipate spikes in certain crime categories during particular times of the year and in specific districts, enabling proactive measures to mitigate potential risks.
                </p>

                {/* Input fields for arrest and year */}
                <div style={{marginTop: '20px'}}>
                    <label>District:</label>
                    <select
                        value={selectedOptions.district}
                        onChange={(e) => handleOptionChange(e, 'district')}
                        style={{marginRight: '10px'}}
                    >
                        
                        <option value="">Select District</option> {/* Added default option */}
                        {[...Array(25)].map((_, index) => (
                        <option key={index} value={index + 1}>{index + 1}</option>
                         ))}
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
                        <CT5lineGraph district={selectedOptions.district} selectedYear={selectedOptions.year}/>
                    </div>
                ) : (
                    <div style={{flex: 1, marginLeft: "50px", marginRight: "75px"}}>
                        <p>Please select a district and a year and click "Show Graph" to view the crime stats of the district.</p>
                    </div>
                )}

                {/* {isGraphVisible && (
                    <div style={{ flex: 1, marginLeft: "25px", marginRight: "50px" }}>
                        percentage of gun violence incidents involving single or multiple gunshots
                    </div>
                )} */}

            </div>
        </>
    );
}



