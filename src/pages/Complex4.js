import React, { useState, useEffect } from 'react';
import CT4LineGraph from '../components/CT4LineGraph';

import axios from 'axios';

export default function Complex4({Classified_As}) {
    const [selectedOptions, setSelectedOptions] = useState({
        Classified_As: ''
    });

    const [isGraphVisible, setIsGraphVisible] = useState(false);
    const [crimeType, setCrimeType] = useState(false);

    useEffect(() => {
        const fetchCrimeTypes = async () => {
            try {
                const response = await axios.get('http://localhost:3001/crime-types');
                const data = response.data;
                const crimeTypes = data.map(entry => entry[0]);
                setCrimeType(crimeTypes);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCrimeTypes().then(() => console.log('Crime Types fetched!'));
    }, []);

    const handleOptionChange = (event, option) => {
        setSelectedOptions({
            ...selectedOptions,
            [option]: event.target.value
        });
        setIsGraphVisible(false);
    };

    const handleShowGraph = () => {
        setIsGraphVisible(true);
    };

    return (
        <>
            <div className='graphs-container'>
                {/* Text description */}
                <p>
                    Is there a correlation between the amount of streetlight outages in an area and the number of crimes committed?
                    Furthermore, do the absence of streetlights lead to an increase in certain types of crimes?
                </p>
                {/* Input fields for arrest and year */}
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', marginTop: '20px'}}>
                    <label style={{marginRight: "10px"}}>Crime Type:</label>
                    {crimeType && (<select
                        value={selectedOptions.Classified_As}
                        onChange={(e) => handleOptionChange(e, 'Classified_As')}
                        style={{marginRight: "20px"}}
                    >
                        <option value="">Select Crime Type:</option>
                        {crimeType.map((ct) => (
                            <option key={ct} value={ct}>{ct}</option>
                        ))}

                    </select>
                    )}

                    <button
                        onClick={handleShowGraph}
                        style={{width: '100px', padding: '5px', marginLeft: 'auto', marginRight: 'auto'}}
                    >
                        Show Graph
                    </button>

                </div>
            </div>

            {/* Graphs and text */}
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{flex: 1, marginLeft: "50px", marginRight: "75px"}}>
                    <p>Please select a Crime Type to display below.</p>
                </div>
                {/* Left side containing dropdowns */}
                <div style={{flex: 1, marginLeft: "50px", marginRight: "75px"}}>
                </div>

                {isGraphVisible ? (
                    <div style={{flex: 1, marginLeft: "50px", marginRight: "75px"}}>
                        <CT4LineGraph Classified_As={selectedOptions.Classified_As}/>
                    </div>

                ): (
                    <div style={{flex: 1, marginLeft: "50px", marginRight: "75px"}}>
                        <p>Please select a Crime Type and  click "Show Graph" to view the graph</p>
                    </div>
                )}
            </div>
        </>
    );
}


