const db = require('../db/session');

async function createShotspotterTable(session) {
    try {
        console.log('session:', session)
        await session.execute(
            `CREATE TABLE Shotspotter (
                Alert_Date TIMESTAMP,
                Block VARCHAR(36),
                Zip_Code SMALLINT,
                Ward SMALLINT,
                Community_Area VARCHAR(23),
                Area SMALLINT,
                District SMALLINT,
                Beat SMALLINT,
                Street_Outreach_Organization VARCHAR(92),
                UNIQUE_ID varchar(16) PRIMARY KEY,
                Month SMALLINT,
                Day_of_Week SMALLINT,
                Hour SMALLINT,
                Incident_Type_Description VARCHAR(26),
                Rounds SMALLINT,
                Illinois_House_District SMALLINT,
                Illinois_Senate_District SMALLINT,
                Latitude NUMBER(12, 9),
                Longitude NUMBER(12, 9),
                Location VARCHAR(40)
             )
            `
        );


        await session.execute('commit');

        console.log('Spotter table created successfully');

    } catch (error) {
        console.error('Error creating Spotter table :', error);
    }
}

async function initialize() {
    const session = await db;
    await createShotspotterTable(session);
    await session.close();


}

initialize().then(r => console.log('completed Spotter Table creation'));