import React, { useState, useEffect } from 'react';
import CT3LineGraph1 from '../components/CT3LineGraph1';
import CT3LineGraph2 from '../components/CT3LineGraph2';
import axios from 'axios';

export default function Complex3() {
    const [selectedOptions, setSelectedOptions] = useState({
        communityArea: '',
        crimeType: '',
        year: ''
    });
    const [isGraphVisible, setIsGraphVisible] = useState(false);
    const [crimeType, setCrimeType] = useState(null);
    const [communityArea, setCommunityArea] = useState([]);

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

        const fetchCommunityAreas = async () => {
            try {
                const response = await axios.get('http://localhost:3001/community-areas');
                const data = response.data;
                const cas = data.map(entry => entry[0]);
                setCommunityArea(cas);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCrimeTypes().then(() => console.log('Crime Types fetched!'));
        fetchCommunityAreas().then(() => console.log('Community Areas fetched!'));
    }, []);

    const handleOptionChange = (event, option) => {
        setSelectedOptions({
            ...selectedOptions,
            [option]: event.target.value
        });
    };

    const handleShowGraph = () => {
        setIsGraphVisible(true);
    };

    const years = ['2019', '2020', '2021', '2022', '2023'];

    return (
        <>
            <div className='graphs-container'>
                {/* Text description */}
                <p>
                    How was criminality affected by the drastic living changes caused by the coronavirus? Additionally, how was this 
                    change affected by the economic stature of each community area in Chicago, and which crime types were affected? The months
                    from 2019 to 2023 are analyzed to better understand the changes in criminality during the lifespan of COVID19, and in the
                    months that followed it.
                </p>

                {/* Input fields for arrest and year */}
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', marginTop: '20px'}}>
                    <label style={{marginRight: "10px"}}>Community Area:</label>
                    {communityArea && (
                        <select
                            value={selectedOptions.communityArea}
                            onChange={(e) => handleOptionChange(e, 'communityArea')}
                            style={{marginRight: "20px"}}
                        >
                        <option value="">Select Community Area</option>
                        {communityArea.map((ca) => (
                            <option key={ca} value={ca}>{ca}</option>
                        ))}
                        </select>
                    )}
                    <label style={{marginRight: "10px"}}>Crime Type:</label>
                    {crimeType && (<select
                        value={selectedOptions.crimeType}
                        onChange={(e) => handleOptionChange(e, 'crimeType')}
                        style={{marginRight: "20px"}}
                    >
                        <option value="">Select Crime Type:</option>
                        {crimeType.map((ct) => (
                            <option key={ct} value={ct}>{ct}</option>
                        ))}
                    </select>
                    )}
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
                    <p>Please select a community area based on the graph below, as well as a year to generate a trend graph.</p>
                </div>
                {/* Left side containing dropdowns */}
                <div style={{flex: 1, marginLeft: "50px", marginRight: "75px"}}>
                    <CT3LineGraph1/>
                </div>
                {isGraphVisible && (
                    <div style={{flex: 1, marginLeft: "50px", marginRight: "75px"}}>
                        <CT3LineGraph2 crimeType={selectedOptions.crimeType} communityArea={selectedOptions.communityArea} selectedYear={selectedOptions.year}/>
                    </div>
                )}
            </div>
        </>
    );
}


