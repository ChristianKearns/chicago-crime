
const db = require('../db/session');
const { readCSV } = require('./csvReader.js');


// Function to insert data into Oracle database
async function insertEventPermitsIntoOracle(data) {
    let session;
    try {
        session = await db;

        // Initialize set for unique event types
        const distinctEventTypes = new Set();

        // Arrays to store data for bulk insertion
        const eventPermitDataArray = [];

        // Iterate through the data
        for (let i = 1; i < data.length; i++) {
            const row = data[i];

            // Extract data for EventPermit table
            const eventPermitData = {
                Requestor: row[0],
                Organization: row[1],
                ParkNumber: row[2],
                ParkName: row[3],
                ReservationStartDate: row[4],
                ReservationEndDate: row[5],
                EventType: row[6],
                EventDescription: row[7],
                PermitStatus: row[8]
            };

            // Collect unique event types
            distinctEventTypes.add(row[6]);

            // Push data for bulk insertion
            eventPermitDataArray.push(eventPermitData);
        }

        // Bulk insertion into EventPermit table
        const eventPermitQuery = `INSERT INTO EventPermit (Requestor, ORGANIZATION, Park_Number, Park_Name, Reservation_Start_Date, Reservation_End_Date, Event_Type, Event_Description, Permit_Status) VALUES (:Requestor, :Organization, :ParkNumber, :ParkName, TO_DATE(:ReservationStartDate, 'MM/DD/YYYY'), TO_DATE(:ReservationEndDate, 'MM/DD/YYYY'), :EventType, :EventDescription, :PermitStatus)`;
        await session.executeMany(eventPermitQuery, eventPermitDataArray);
        await session.execute('commit');

        console.log('Event permits inserted successfully into Oracle database.');
        await session.close();
    } catch (error) {
        console.error('Error inserting event permits into Oracle database:', error);
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

const filePath = '.\\csv_files\\Event_Permits.csv';

// Read CSV file and extract data
readCSV(filePath)
    .then(records => {
        // console.log('Parsed records:', records);
        // Now you can call your insertDataIntoOracle function with the parsed records
        insertEventPermitsIntoOracle(records).then(r => console.log('completed inserting data into Oracle database') );
    })
    .catch(error => {
        console.error('Error reading CSV file:', error);
    });
