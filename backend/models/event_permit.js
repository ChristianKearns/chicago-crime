const db = require("../db/session");

async function createEventPermitTable(session) {
    try {
        await session.execute(
            `CREATE TABLE EventPermit (
                Requestor VARCHAR2(60),
                Organization VARCHAR2(51),
                Park_Number SMALLINT,
                Park_Name VARCHAR2(41),
                Reservation_Start_Date DATE,
                Reservation_End_Date DATE,
                Event_Type VARCHAR2(51),
                Event_Description VARCHAR2(128),
                Permit_Status VARCHAR2(17)
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
        await createEventPermitTable(session);
        await session.close();

    } catch (error) {
        console.error('Error initializing:', error);
    }
}

initialize().then(() => console.log('completed CrimeIncident Table creation'));