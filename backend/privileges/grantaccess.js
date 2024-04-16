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

        // CHUERTA
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON CrimeIncident TO "HONGJIESHI"`
        );
        await session.commit();
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON CrimeIncident TO "CHRISTIAN.KEARNS"`
        );
        await session.commit();
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON CrimeIncident TO "PVENU"`
        );
        await session.commit();

        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON CrimeIncident TO "CHUERTA"`
        );
        await session.commit();
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON CrimeIncident TO "NIKOLAS.PRASCHMA"`
        );
        await session.commit();

        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON CrimeType TO "HONGJIESHI"`
        );
        await session.commit();
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON CrimeType TO "CHRISTIAN.KEARNS"`
        );
        await session.commit();
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON CrimeType TO "PVENU"`
        );
        await session.commit();
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON CrimeType TO "CHUERTA"`
        );
        await session.commit();
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON CrimeType TO "NIKOLAS.PRASCHMA"`
        );
        await session.commit();
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON Location TO "HONGJIESHI"`
        );
        await session.commit();
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON Location TO "CHRISTIAN.KEARNS"`
        );
        await session.commit();
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON Location TO "PVENU"`
        );
        await session.commit();
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON CrimeType TO "CHUERTA"`
        );
        await session.commit();
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON CrimeType TO "NIKOLAS.PRASCHMA"`
        );
        await session.commit();

        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON EventPermit TO "HONGJIESHI"`
        );
        await session.commit();
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON EventPermit TO "CHRISTIAN.KEARNS"`
        );
        await session.commit();
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON EventPermit TO "PVENU"`
        );
        await session.commit();
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON EventPermit TO "CHUERTA"`
        );
        await session.commit();
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON EventPermit TO "NIKOLAS.PRASCHMA"`
        );
        await session.commit();
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON StreetLight TO "HONGJIESHI"`
        );
        await session.commit();
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON StreetLight TO "CHRISTIAN.KEARNS"`
        );
        await session.commit();
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON StreetLight TO "PVENU"`
        );
        await session.commit();
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON StreetLight TO "CHUERTA"`
        );
        await session.commit();
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON StreetLight TO "NIKOLAS.PRASCHMA"`
        );
        await session.commit();

        // CHRISTIAN.KEARNS
/*
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON PopulationData TO "HONGJIESHI"`
        );
        await session.commit();
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON PopulationData TO "CHRISTIAN.KEARNS"`
        );
        await session.commit();
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON PopulationData TO "PVENU"`
        );
        await session.commit();

        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON PopulationData TO "CHUERTA"`
        );
        await session.commit();
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON PopulationData TO "NIKOLAS.PRASCHMA"`
        );
        await session.commit();

        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON Economics TO "HONGJIESHI"`
        );
        await session.commit();
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON Economics TO "CHRISTIAN.KEARNS"`
        );
        await session.commit();
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON Economics TO "PVENU"`
        );
        await session.commit();

        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON Economics TO "CHUERTA"`
        );
        await session.commit();
        await session.execute(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON Economics TO "NIKOLAS.PRASCHMA"`
        );
        await session.commit();

*/
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