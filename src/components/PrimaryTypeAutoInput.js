import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

const AutoPrimaryTypeInput = ({ onSelect }) => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetchPrimaryTypes = async () => {
            try {
                const response = await axios.get("http://localhost:3001/primary-types");
                setOptions(response.data.map((type) => ({ value: type, label: type })));
            } catch (error) {
                console.error("Error fetching primary types:", error);
            }
        };

        fetchPrimaryTypes().then(r => console.log('fetchPrimaryTypes') );
    }, []);

    const handleChange = (selectedOption) => {
        onSelect(selectedOption.value);
    };

    return (
        <Select
            options={options}
            onChange={handleChange}
            placeholder="Type to search..."
        />
    );
};

export default AutoPrimaryTypeInput
