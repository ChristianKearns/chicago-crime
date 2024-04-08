const db = require('../db/session');

async function createLocationTable(session) {
    try {
        console.log('session:', session)
        await session.execute(
            `CREATE TABLE Location (
                Latitude NUMBER(12, 9),
                Longitude NUMBER(12, 9),
                Location VARCHAR2(30),
                Location_Description VARCHAR2(60),
                Community_Area NUMBER(5),
                Block VARCHAR2(39),
                District NUMBER(5)
             )
            `
        );

        await session.execute('commit');
        console.log('Location table created successfully');
    } catch (error) {
        console.error('Error creating Location table :', error);
    }
}

async function initialize() {
    const session = await db;
    await createLocationTable(session);
    await session.close();
}

initialize().then(r => console.log('completed Location Table creation'));