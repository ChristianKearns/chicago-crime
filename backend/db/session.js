

require('dotenv').config({path: 'C:\\Users\\chuer\\IdeaProjects\\chicago-crime\\.env'});
const oracledb = require('oracledb');
async function db() {
    try {
        // Establish connection with credentials
        const session = await oracledb.getConnection({
            user: process.env.UF_DB_USERNAME, // Use environment variable for username
            password: process.env.UF_DB_PASSWORD, // Use environment variable for password
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
