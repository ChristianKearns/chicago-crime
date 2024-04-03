const db = require('../db/session');


//I dont think any of you guys have to run this script, only Cristian Huerta. since i created the group in the uf database and i have to grant access to the tables to the group members

async function grantAccess(session) {
    try {
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON CrimeIncident TO "HONGJIESHI"`
        );
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON CrimeIncident TO "CHRISTIAN.KEARNS"`
        );
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON CrimeIncident TO "PVENU"`
        );

        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON CrimeType TO "HONGJIESHI"`
        );
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON CrimeType TO "CHRISTIAN.KEARNS"`
        );
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON CrimeType TO "PVENU"`
        );

        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON Location TO "HONGJIESHI"`
        );
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON Location TO "CHRISTIAN.KEARNS"`
        );
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON Location TO "PVENU"`
        );

        console.log('Granting access to all tables successfully');
    } catch (error) {
        console.error('Error granting access:', error);
    }
}



async function initialize() {
    try {
        // Call the db function to obtain the session
        const session = await db;
        await grantAccess(session);

    } catch (error) {
        console.error('Error initializing:', error);
    }
}

initialize().then(() => console.log('Access granted to ALL tables'));