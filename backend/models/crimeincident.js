const db = require('../db/session');

async function createCrimeIncidentTable(session) {
    try {
        await session.execute(
            `CREATE TABLE CrimeIncident (
                Unique_ID SMALLINT PRIMARY KEY,
                Case_Number SMALLINT,
                Incident_Date TIMESTAMP,
                IUCR VARCHAR2(4),
                Classified_As VARCHAR2(33),
                Descriptions VARCHAR2(59),
                Arrest CHAR(1) CHECK(Arrest IN('T', 'F')),
                Domestic CHAR(1) CHECK(Domestic IN('T','F')),
                Beat SMALLINT,
                Ward SMALLINT,
                FBI_Code VARCHAR2(4)
             )
            `
        );
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
    } catch (error) {
        console.error('Error initializing:', error);
    }
}

initialize().then(() => console.log('completed CrimeIncident Table creation'));
