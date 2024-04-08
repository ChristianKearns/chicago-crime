const db = require('../db/session');

/*

Connection will be open, must close the connection after the script is run.
 */
async function createCrimeIncidentTable(session) {
    try {
        await session.execute(
            `CREATE TABLE CrimeIncident (
                Unique_ID SMALLINT PRIMARY KEY,
                Case_Number VARCHAR(9) ,
                Incident_Date TIMESTAMP,
                IUCR VARCHAR2(5),
                Classified_As VARCHAR2(33),
                Descriptions VARCHAR2(65),
                Arrest VARCHAR(5),
                Domestic VARCHAR(5),
                Beat SMALLINT,
                Ward SMALLINT,
                FBI_Code VARCHAR2(5)
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
        await createCrimeIncidentTable(session);
        await session.close();

    } catch (error) {
        console.error('Error initializing:', error);
    }
}

initialize().then(() => console.log('completed CrimeIncident Table creation'));
