import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

const AutoLocDescriptionInput = ({ onSelect }) => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetchLocDescriptions = async () => {
            try {
                const response = await axios.get("http://localhost:3001/location-types");
                setOptions(response.data.map((description) => ({ value: description, label: description })));
            } catch (error) {
                console.error("Error fetching LOC descriptions:", error);
            }
        };

        fetchLocDescriptions().then(r => console.log('fetchLocDescriptions'));
    }, []);

    const handleChange = (selectedOption) => {
        onSelect(selectedOption.value);
    };

    return (
        <Select
            options={options}
            onChange={handleChange}
            placeholder="Select LOCDescription..."
        />
    );
};

export default AutoLocDescriptionInput;
