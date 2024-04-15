require('dotenv').config({ path: `${__dirname}/../../.env` });


/*
Insert UF_DB_USERNAME and UF_DB_PASSWORD in the .env file. The one u used for oracle.
I also had to create matching environment variable in my system to make it work.
Also, gator vpn has to be connected to access the database.
 */
const oracledb = require('oracledb');
async function db () {
    try {
        // Establish connection with credentials
        const session = await oracledb.getConnection({
            user: process.env.REACT_APP_UF_DB_USERNAME, // Use environment variable for username
            password: process.env.REACT_APP_UF_DB_PASSWORD, // Use environment variable for password
            connectString: 'oracle.cise.ufl.edu:1521/orcl' // Example connectString; adjust according to your Oracle database configuration
        });
        console.log('Connected to Oracle database');

        return session;

        // Use the connection for database operations

    } catch (error) {
        console.error('Error connecting to Oracle database:', error);
    }
}


module.exports = db();
