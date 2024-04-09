
const db = require('../db/session');
const { readCSV } = require('./csvReader.js');

// Function to insert data into Shotspotter table
async function insertShotspotterIntoOracle(data) {
    let session;
    try {
        session = await db;

        // Arrays to store data for bulk insertion
        const shotspotterDataArray = [];

        // Iterate through the data
        for (let i = 1; i < data.length; i++) {
            const row = data[i];
            console.log("row :", i);

            // Extract data for Shotspotter table
            const shotspotterData = {
                AlertDate: row[0],
                Block: row[1],
                ZipCode: row[2],
                Ward: row[3],
                CommunityArea: row[4],
                Area: row[5],
                District: row[6],
                Beat: row[7],
                StreetOutreachOrganization: row[8],
                UniqueID: row[9],
                Month: row[10],
                DayOfWeek: row[11],
                Hour: row[12],
                IncidentTypeDescription: row[13],
                Rounds: row[14],
                IllinoisHouseDistrict: row[15],
                IllinoisSenateDistrict: row[16],
                Latitude: row[17],
                Longitude: row[18],
                Location: row[19]
            };

            // Push data for bulk insertion
            shotspotterDataArray.push(shotspotterData);
        }

        // Bulk insertion into Shotspotter table
        const shotspotterQuery = `
            INSERT INTO Shotspotter (
                Alert_Date, Block, Zip_Code, Ward, Community_Area, Area,
                District, Beat, Street_Outreach_Organization, UNIQUE_ID,
                Month, Day_of_Week, Hour, Incident_Type_Description, Rounds,
                Illinois_House_District, Illinois_Senate_District, Latitude,
                Longitude, Location
            ) VALUES (
                TO_TIMESTAMP(:AlertDate, 'MM/DD/YYYY HH24:MI:SS'),
                :Block,
                :ZipCode,
                :Ward,
                :CommunityArea,
                :Area,
                :District,
                :Beat,
                :StreetOutreachOrganization,
                :UniqueID,
                :Month,
                :DayOfWeek,
                :Hour,
                :IncidentTypeDescription,
                :Rounds,
                :IllinoisHouseDistrict,
                :IllinoisSenateDistrict,
                :Latitude,
                :Longitude,
                :Location
            )`;

        await session.executeMany(shotspotterQuery, shotspotterDataArray);
        await session.execute('commit');

        console.log('Shotspotter data inserted successfully into Oracle database.');
        await session.close();
    } catch (error) {

        console.error('Error inserting Shotspotter data into Oracle database:', error);
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


const filePath = '.\\csv_files\\Shotspotter_Alerts.csv';

// Read CSV file and extract data
readCSV(filePath)
    .then(records => {
        // console.log('Parsed records:', records);
        // Now you can call your insertDataIntoOracle function with the parsed records
        insertShotspotterIntoOracle(records).then(r => console.log('completed inserting data into Oracle database') );
    })
    .catch(error => {
        console.error('Error reading CSV file:', error);
    });
