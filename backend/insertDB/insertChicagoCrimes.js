const fs = require('fs');
const {parse} =  require('csv-parse');
const db = require('../db/session');

// Function to insert data into Oracle database
async function insertDataIntoOracle(data) {
    let session;
    try {
        // Establish a connection to the Oracle database
        session = await db;
        console.log(session);

        // Initialize sets for unique crime types and locations
        const distinctCrimeTypes = new Set();
        const uniqueLocations = new Set();
        const distinctCrimes = new Set();

        // Arrays to store data for bulk insertion
        const incidentDataArray = [];
        const crimeTypeDataArray = [];
        const locationDataArray = [];

        // Iterate through the data
        for (let i = 1; i < data.length; i++) {
            const row = data[i];
            console.log('row:', i)

            distinctCrimes.add({
                UniqueID: row[0],
                CaseNumber: row[1],
                IncidentDate: row[2],
                IUCR: row[4],
                ClassifiedAs: row[5],
                Descriptions: row[6],
                Arrest: row[8],
                Domestic: row[9],
                Beat: row[10],
                Ward: row[12],
                FBICode: row[14]

            });

            // Collect unique crime types
            distinctCrimeTypes.add(row[5]);

            // Collect unique locations
            uniqueLocations.add({
                Crime_ID: row[0],
                Latitude: row[19],
                Longitude: row[20],
                Location: row[21],
                LocationDescription: row[7],
                CommunityArea: row[13],
                Block: row[3],
                District: row[11]
            });

        }

        // Push data for bulk insertion into CrimeType and Location arrays
        for(let crime of distinctCrimes){
            incidentDataArray.push(crime);
        }

        for (let type of distinctCrimeTypes) {
            crimeTypeDataArray.push([type]);
        }
        for (let location of uniqueLocations) {
            locationDataArray.push(location);
        }



        // Bulk insertion into CrimeIncident table
        const incidentQuery = `INSERT INTO CrimeIncident (UNIQUE_ID, CASE_NUMBER, INCIDENT_DATE, IUCR, CLASSIFIED_AS, DESCRIPTIONS, ARREST, DOMESTIC, BEAT, WARD, FBI_CODE) VALUES (:UniqueID, :CaseNumber, TO_TIMESTAMP(:IncidentDate, 'MM/DD/YYYY HH:MI:SS AM'), :IUCR, :ClassifiedAs, :Descriptions, :Arrest, :Domestic, :Beat, :Ward, :FBICode)`;
        await session.executeMany(incidentQuery, incidentDataArray);
        await session.execute('commit');

        console.log('Chicago Crime Incident inserted successfully into Oracle database.');

        // Bulk insertion into Location table
        const locationQuery = `INSERT INTO Location (Crime_ID,Latitude, Longitude, Location, Location_Description, Community_Area, Block, District) VALUES (:Crime_Id,:Latitude, :Longitude, :Location, :LocationDescription, :CommunityArea, :Block, :District)`;
        await session.executeMany(locationQuery, locationDataArray);
        await session.execute('commit');
        console.log('Chicago Crime location inserted successfully into Oracle database.');

        // Bulk insertion into CrimeType table
        const crimeTypeQuery = `INSERT INTO CrimeType (PrimaryType) VALUES (:PrimaryType)`;
        await session.executeMany(crimeTypeQuery, crimeTypeDataArray);
        await session.execute('commit');

        console.log('Chicago Crime Type inserted successfully into Oracle database.');


        await session.close();
    } catch (error) {
        console.error('Error inserting Chicago Crime data into Oracle database:', error);
        // Rollback the transaction if an error occurs
        if (session) {
            await session.rollbackTransaction;
        }
    } finally {
        if (session) {
            try {
                // Close the database connection
                await session.close();
            } catch (error) {
                console.error('Error closing database connection:', error);
            }
        }
    }
}

function readCSVFile(filePath) {
    return new Promise((resolve, reject) => {
        const records = [];

        // Create a read stream for the CSV file
        const readStream = fs.createReadStream(filePath);

        // Initialize the parser with the desired options
        const parser = parse({
            delimiter: ','
        });

        // Handle errors during parsing
        parser.on('error', err => {
            reject(err);
        });

        // Parse each record in the CSV file
        parser.on('data', record => {
            records.push(record);
        });

        // When parsing is complete, resolve with the parsed records
        parser.on('end', () => {
            resolve(records);
        });

        // Pipe the read stream into the parser
        readStream.pipe(parser);
    });
}
// Path to your CSV file
const filePath = '.\\csv_files\\Crimes2016.csv';

// Read CSV file and extract data
readCSVFile(filePath)
    .then(records => {
       // console.log('Parsed records:', records);
        // Now you can call your insertDataIntoOracle function with the parsed records
        insertDataIntoOracle(records).then(r => console.log('completed inserting data into Oracle database') );
    })
    .catch(error => {
        console.error('Error reading CSV file:', error);
    });
