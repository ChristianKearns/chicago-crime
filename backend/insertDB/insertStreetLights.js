
const db = require('../db/session');
const { readCSV } = require('./csvReader.js');


// Function to insert data into Oracle database
async function insertStreetLightsIntoOracle(data) {
    let session;
    try {
        session = await db;

        // Arrays to store data for bulk insertion
        const streetLightDataArray = [];


        // Iterate through the data
        for (let i = 1; i < data.length; i++) {
            const row = data[i];
            console.log("row :", i);

            // Extract data for StreetLight table
            const streetLightData = {
                CreationDate: row[0],
                Status: row[1],
                CompletionDate: row[2],
                ServiceRequestNumber: row[3],
                TypeOfServiceRequest: row[4],
                StreetAddress: row[5],
                ZipCode: row[6],
                XCoordinate: row[7],
                YCoordinate: row[8],
                Ward: row[9],
                PoliceDistrict: row[10],
                CommunityArea: row[11],
                Latitude: row[12],
                Longitude: row[13],
                Location: row[14]
            };

            // Push data for bulk insertion
            streetLightDataArray.push(streetLightData);
        }

        // Bulk insertion into StreetLight table
        const streetLightQuery = `
            INSERT INTO StreetLight (
                Creation_Date, Status, Completion_Date, Service_Request_Number,
                Type_of_Service_Request, Street_Address, Zip_Code, X_Coordinate,
                Y_Coordinate, Ward, Police_District, Community_Area,
                Latitude, Longitude, Location
            ) VALUES (
                TO_DATE(:CreationDate, 'MM/DD/YYYY'),
                :Status,
                TO_DATE(:CompletionDate, 'MM/DD/YYYY'),
                :ServiceRequestNumber,
                :TypeOfServiceRequest,
                :StreetAddress,
                :ZipCode,
                :XCoordinate,
                :YCoordinate,
                :Ward,
                :PoliceDistrict,
                :CommunityArea,
                :Latitude,
                :Longitude,
                :Location
            )`;

        await session.executeMany(streetLightQuery, streetLightDataArray);
        await session.execute('commit');

        console.log('Street lights inserted successfully into Oracle database.');
        await session.close();
    } catch (error) {
        console.error('Error inserting street lights into Oracle database:', error);
        if (session) {
            await session.rollbackTransaction;
        }
    } finally {
        if (session) {
            try {
                await session.close();
            } catch (error) {
                console.error('Error closing database connection:', error);
            }
        }
    }
}

const filePath = '.\\csv_files\\Street_Lights.csv';

// Read CSV file and extract data
readCSV(filePath)
    .then(records => {
        // console.log('Parsed records:', records);
        // Now you can call your insertDataIntoOracle function with the parsed records
        insertStreetLightsIntoOracle(records).then(r => console.log('completed inserting data into Oracle database') );
    })
    .catch(error => {
        console.error('Error reading CSV file:', error);
    });
