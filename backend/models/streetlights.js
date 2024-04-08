const db = require("../db/session");

async function createStreetLightTable(session) {
    try {
        await session.execute(
            `CREATE TABLE StreetLight (
                Creation_Date DATE,
                Status VARCHAR2(10),
                Completion_Date DATE,
                Service_Request_Number VARCHAR2(23),
                Type_of_Service_Request VARCHAR2(24),
                Street_Address VARCHAR2(37),
                Zip_Code SMALLINT,
                X_Coordinate NUMBER(17, 9),
                Y_Coordinate NUMBER(17,9),
                Ward SMALLINT,
                Police_District SMALLINT,
                Community_Area SMALLINT,
                Latitude NUMBER(12, 9),
                Longitude NUMBER(12, 9),
                Location VARCHAR2(40)
             )
            `
        );
        await session.execute('commit')
        console.log('CrimeIncident table created successfully');
    } catch (error) {
        console.error('Error creating CrimeIncident table:', error);
    }
}

async function initialize() {
    try {
        // Call the db function to obtain the session
        const session = await db;
        await createStreetLightTable(session);
        await session.close();

    } catch (error) {
        console.error('Error initializing:', error);
    }
}

initialize().then(() => console.log('completed CrimeIncident Table creation'));