import React, { useState, useEffect } from "react";
import axios from "axios";

const QueryMapInput = ({ onSelect }) => {
    const [queryResult, setQueryResult] = useState([]);

    useEffect(() => {
        fetchMapQuery().then(r => console.log('fetchMapQuery'));
    }, []);

    const fetchMapQuery = async () => {
        try {
            const response = await axios.get("http://localhost:3001/map-query", {
                params: {
                    primaryType: onSelect.primaryType,
                    LOCDescription: onSelect.LOCDescription,
                    startDate: onSelect.startDate,
                    endDate: onSelect.endDate,
                    arrest: onSelect.arrest,
                    domestic: onSelect.domestic
                }
            });
            setQueryResult(response.data); // Set query result in state
        } catch (error) {
            console.error("Error fetching map data:", error);
        }
    };

    return (
            <div>
                <h1>Query Results : {queryResult}</h1>
            </div>
    );
};

export default QueryMapInput;

