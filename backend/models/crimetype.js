
const db = require('../db/session');
async function createCrimeTypeTable(session) {
    try {
        await session.execute(
            `CREATE TABLE CrimeType (
                PrimaryType VARCHAR2(33) PRIMARY KEY
             )
            `
        );
        console.log('CrimeType table created successfully');
    } catch (error) {
        console.error('Error creating CrimeType table :', error);
    }
}

async function initialize() {
    const session = await db;
    await createCrimeTypeTable(session);
}

initialize().then(r => console.log('completed Crime Type Table creation'));