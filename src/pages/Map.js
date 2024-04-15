import React, {useState} from 'react';
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import AutoPrimaryTypeInput from "../components/PrimaryTypeAutoInput";
import AutoLocationDescriptionInput from "../components/AutoLocationDescriptionInput";
import QueryMapInput from "../components/QueryMap";
import axios from "axios";

class Markers {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
const ChicagoMap = () => {

    const containerStyle = {
        width: '800px',
        height: '600px'
    };

    const center = {
        lat: 41.8781,
        lng: -87.6298 // Chicago's coordinates
    };

    const options = {
        restriction: {
            latLngBounds: {
                north: 42.023,
                south: 41.6445,
                east: -87.5241,
                west: -87.9401 // Chicago's bounding box
            },
            strictBounds: true
        },
        zoomControl: true
    };


    const [markers, setMarkers] = useState<Markers>([])

    const fetchCrimeLocations = async () => {
        try {
            const response = await axios.get('http://localhost:3001/map-markers', {
                params: selectedOptions // Pass selectedOptions as params
            });
            //set marker data
            let markers = new Markers(response.data.latitude, response.data.longitude);
            setMarkers(markers);
        } catch (error) {
            console.error('Error fetching crime locations:', error);
        }
    };


    const [selectedOptions, setSelectedOptions] = useState({
        primaryType: '',
        LOCDescription: '',
        arrest: '',
        domestic: '',
        endDate: '',
        startDate: ''
    });

    const [showQueryInput, setShowQueryInput] = useState(false); // State to track whether to show QueryMapInput

    // Function to handle dropdown changes
    const handleOptionChange = (event, option) => {
        setSelectedOptions({
            ...selectedOptions,
            [option]: event.target.value
        });
    };

    const handleStartDateChange = (e) => {
        setSelectedOptions({
            ...selectedOptions,
            startDate: e.target.value
        });
    };

    const handleEndDateChange = (e) => {
        setSelectedOptions({
            ...selectedOptions,
            endDate: e.target.value
        });
    };

    const handleButtonClick = () => {
        // Toggle the state to show/hide QueryMapInput
        setShowQueryInput(!showQueryInput);
        fetchCrimeLocations().then(r => console.log('fetchCrimeLocations'));
    };

    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            {/* Left side containing dropdowns */}
            <div style={{flex: 1}}>
                <div>
                    <label style={{marginRight: "10px"}}>Start Date:</label>
                    <input
                        type="text"
                        value={selectedOptions.startDate}
                        onChange={handleStartDateChange}
                        placeholder="MM/DD/YYYY"
                        style={{marginRight: "20px"}}
                    />
                    <label style={{marginRight: "10px"}}>End Date:</label>
                    <input
                        type="text"
                        value={selectedOptions.endDate}
                        onChange={handleEndDateChange}
                        placeholder="MM/DD/YYYY"
                        style={{marginRight: "20px"}}
                    />
                    {(selectedOptions.startDate && selectedOptions.endDate) &&
                        <p>Selected Date Range: {selectedOptions.startDate} - {selectedOptions.endDate}</p>}
                </div>

                <div>
                    <label>Primary Type:</label>
                    <AutoPrimaryTypeInput
                        onSelect={(value) => setSelectedOptions({...selectedOptions, primaryType: value})}/>
                </div>

                <div>
                    <label>Location Type:</label>
                    <AutoLocationDescriptionInput
                        onSelect={(value) => setSelectedOptions({...selectedOptions, LOCDescription: value})}/>
                </div>

                <div>
                    <label>Arrest:</label>
                    <select
                        value={selectedOptions.arrest}
                        onChange={(e) => handleOptionChange(e, 'arrest')}
                        style={{marginRight: '10px'}} // Add margin-right to create space
                    >
                        <option value="">Select Arrest</option>
                        <option value="false">False</option>
                        <option value="true">True</option>
                    </select>

                    <label>Domestic:</label>
                    <select
                        value={selectedOptions.domestic}
                        onChange={(e) => handleOptionChange(e, 'domestic')}
                        style={{marginRight: '325px'}}
                    >
                        <option value="">Select Domestic</option>
                        <option value="false">False</option>
                        <option value="true">True</option>
                    </select>
                    <button onClick={handleButtonClick} style={{backgroundColor: 'black', color: 'white'}}>See
                        Results
                    </button>

                </div>
                {showQueryInput && <QueryMapInput onSelect={selectedOptions}/>}
            </div>

            <div style={{flex: 1}}>
                <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_API_KEY}>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={10}
                        options={options}
                    >
                        {markers.map((marker, index) => (
                            <Marker
                                key={index}
                                position={{ lat: marker.latitude, lng: marker.longitude }}
                            />
                        ))}

                    </GoogleMap>
                </LoadScript>
            </div>
        </div>
    );
};

export default function Map() {
    return (
        <div>
            <h1>Chicago Crime Data Explorer</h1>
            <ChicagoMap/>
        </div>
    );
}
