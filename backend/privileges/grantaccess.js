const db = require('../db/session');


/*
Everyone has to create each table,so there is not an issue when running this script.
As without creating the table, the script will not run as the table does not exist
in the db.
Also note if your role does not including inserting tuples into a specific table,
you table that matches that specific table will be empty. The other group member table
specific to the table, will have the tuples inserted.
 */

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
            `GRANT SELECT, INSERT, UPDATE, DELETE ON CrimeIncident TO "CHUERTA"`
        );
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON CrimeIncident TO "NIKOLAS.PRASCHMA"`
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
            `GRANT SELECT, INSERT, UPDATE, DELETE ON CrimeType TO "CHUERTA"`
        );
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON CrimeType TO "NIKOLAS.PRASCHMA"`
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
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON CrimeType TO "CHUERTA"`
        );
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON CrimeType TO "NIKOLAS.PRASCHMA"`
        );

        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON EventPermit TO "HONGJIESHI"`
        );
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON EventPermit TO "CHRISTIAN.KEARNS"`
        );
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON EventPermit TO "PVENU"`
        );
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON EventPermit TO "CHUERTA"`
        );
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON EventPermit TO "NIKOLAS.PRASCHMA"`
        );

        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON StreetLight TO "HONGJIESHI"`
        );
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON StreetLight TO "CHRISTIAN.KEARNS"`
        );
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON StreetLight TO "PVENU"`
        );
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON StreetLight TO "CHUERTA"`
        );
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON StreetLight TO "NIKOLAS.PRASCHMA"`
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
        await session.close();

    } catch (error) {
        console.error('Error initializing:', error);
    }
}

initialize().then(() => console.log('Access granted to ALL tables'));