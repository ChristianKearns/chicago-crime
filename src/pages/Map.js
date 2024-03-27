

import React, { useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const ChicagoMap= () => {
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


    const [selectedOptions, setSelectedOptions] = useState({
        date: '',
        primaryType: '',
        primaryDescription: '',
        IUCR: '',
        location: '',
        LOCDescription: '',
        arrest: '',
        domestic: ''
    });

    // Function to handle dropdown changes
    const handleOptionChange = (event, option) => {
        setSelectedOptions({
            ...selectedOptions,
            [option]: event.target.value
        });
    };


    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            {/* Left side containing dropdowns */}
            <div style={{flex: 1}}>
                {/* Dropdowns */}
                <div>
                    <label>Date:</label>
                    <select value={selectedOptions.date} onChange={(e) => handleOptionChange(e, 'date')}>
                        <option value="">Select Date</option>
                        <option value="date1">Date 1</option>
                    </select>
                </div>

                <div>
                    <label>Primary Type:</label>
                    <select value={selectedOptions.primaryType} onChange={(e) => handleOptionChange(e, 'primaryType')}>
                        <option value="">Select Primary Type</option>
                        <option value="type1">Type 1</option>

                    </select>
                </div>

                <div>
                    <label>Label:</label>
                    <select value={selectedOptions.label} onChange={(e) => handleOptionChange(e, 'label')}>
                        <option value="">Select Label</option>
                        <option value="label1">Label 1</option>
                    </select>
                </div>

                <div>
                    <label>Location:</label>
                    <select value={selectedOptions.location} onChange={(e) => handleOptionChange(e, 'location')}>
                        <option value="">Select Location</option>
                        <option value="location1">Location 1</option>
                    </select>
                </div>

                <div>
                    <label>LOCDescription:</label>
                    <select value={selectedOptions.LOCDescription}
                            onChange={(e) => handleOptionChange(e, 'LOCDescription')}>
                        <option value="">Select LOCDescription</option>
                        <option value="LOCDescription1">LOCDescription 1</option>
                    </select>
                </div>

                <div>
                    <label>Arrest:</label>
                    <select value={selectedOptions.arrest} onChange={(e) => handleOptionChange(e, 'arrest')}>
                        <option value="">Select Arrest</option>
                        <option value="arrest1">Arrest 1</option>
                    </select>
                </div>

                <div>
                    <label>Domestic:</label>
                    <select value={selectedOptions.domestic} onChange={(e) => handleOptionChange(e, 'domestic')}>
                        <option value="">Select Domestic</option>
                        <option value="domestic1">Domestic 1</option>
                    </select>
                </div>
            </div>

            <div style={{flex: 1}}>
                <LoadScript
                    googleMapsApiKey={process.env.MAP_API_KEY}
                >
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={10}
                        options={options}
                    >
                        {/* Children components, markers, etc. */}
                    </GoogleMap>
                </LoadScript>
            </div>
    </div>
    );};


export default function Map() {
    return (
        <div>
            <h1>Chicago Crime Data Explorer</h1>
            <ChicagoMap/>
        </div>
    );
}