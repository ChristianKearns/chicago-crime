const express = require('express');
const cors = require('cors');
const db = require('./db/session');


const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS
app.use(cors());

// Connect to the database
let session;
(async () => {
    session = await db;
    console.log('Database connection established');
})();


app.get('/primary-types', async (req, res) => {
    try {
        // Execute database query
        const result = await session.execute('SELECT PRIMARYTYPE FROM CRIMETYPE');
        console.log('Database query successful');

        // Send response with query result
        res.json(result.rows);
    } catch (error) {
        console.error('Error querying database:', error);

    }
});

app.get('/location-types', async (req, res) => {
    try {
        // Execute database query
        const result = await session.execute('SELECT Distinct LOCATION_DESCRIPTION FROM LOCATION');
        console.log('Database query successful');

        // Send response with query result
        res.json(result.rows);
    } catch (error) {
        console.error('Error querying database:', error);

    }
});

app.get('/map-query', async (req, res) => {
    try {

        const primaryType = req.query.primaryType.toString();
        const LOCDescription = req.query.LOCDescription.toString();const startDate = req.query.startDate.toString();
        const endDate = req.query.endDate.toString();
        const arrest = req.query.arrest.toString();
        const domestic = req.query.domestic.toString();
        console.log(primaryType, LOCDescription, startDate, endDate, arrest, domestic);

        const result = await session.execute(`
            SELECT COUNT(*)
            FROM CHUERTA.CRIMEINCIDENT c
            JOIN CHUERTA.LOCATION L on c.UNIQUE_ID = L.CRIME_ID
            WHERE c.CLASSIFIED_AS = :primaryType
                AND L.LOCATION_DESCRIPTION = :LOCDescription
                AND c.INCIDENT_DATE BETWEEN TO_DATE(:startDate, 'MM/DD/YYYY') AND TO_DATE(:endDate, 'MM/DD/YYYY')
                AND c.ARREST = :arrest
                AND c.DOMESTIC = :domestic`,
            {
                primaryType: primaryType,
                LOCDescription: LOCDescription,
                startDate: startDate,
                endDate: endDate,
                arrest: arrest,
                domestic: domestic
            }
        );

        console.log('Database query successful');
        console.log(result.rows);

        res.json(result.rows);
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
});

app.get('/map-markers', async (req, res) => {
    try {

        const primaryType = req.query.primaryType.toString();
        const LOCDescription = req.query.LOCDescription.toString();
        const startDate = req.query.startDate.toString();
        const endDate = req.query.endDate.toString();
        const arrest = req.query.arrest.toString();
        const domestic = req.query.domestic.toString();
        console.log(primaryType, LOCDescription, startDate, endDate, arrest, domestic);

        const result = await session.execute(`
            SELECT DISTINCT L.LATITUDE, L.LONGITUDE
            FROM CHUERTA.CRIMEINCIDENT c
            JOIN CHUERTA.LOCATION L on c.UNIQUE_ID = L.CRIME_ID
            WHERE c.CLASSIFIED_AS = :primaryType
                AND L.LOCATION_DESCRIPTION = :LOCDescription
                AND c.INCIDENT_DATE BETWEEN TO_DATE(:startDate, 'MM/DD/YYYY') AND TO_DATE(:endDate, 'MM/DD/YYYY')
                AND c.ARREST = :arrest
                AND c.DOMESTIC = :domestic`,
            {
                primaryType: primaryType,
                LOCDescription: LOCDescription,
                startDate: startDate,
                endDate: endDate,
                arrest: arrest,
                domestic: domestic
            }
        );

        console.log('Database query successful');
        console.log(result.rows);

        res.json(result.rows);
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
});

app.get('/tuple-count', async (req, res) => {
    try {
        // Execute database query
        const result = await session.execute('SELECT \'CrimeType\' AS crimetype, COUNT(*) AS count FROM CrimeType\n' +
            'UNION ALL\n' +
            'SELECT \'CrimeIncident\' AS crimeincident, COUNT(*) AS count FROM CrimeIncident\n' +
            'UNION ALL\n' +
            'SELECT \'Location\' AS location, COUNT(*) AS count FROM Location\n' +
            'UNION ALL\n' +
            'SELECT \'EVENTPERMIT\' AS eventpermit, COUNT(*) AS count FROM EVENTPERMIT\n' +
            'UNION ALL\n' +
            'SELECT \'STREETLIGHT\' AS streetlight, COUNT(*) AS count FROM STREETLIGHT\n' +
            'UNION ALL\n' +
            'SELECT \'SHOTSPOTTER\' AS shotspotter, COUNT(*) AS count FROM SHOTSPOTTER\n' +
            'UNION ALL\n' +
            'SELECT\n' +
            '    \'Total\' AS table_name,\n' +
            '    SUM(total_count) AS count\n' +
            'FROM\n' +
            '    (SELECT COUNT(*) AS total_count FROM CrimeType\n' +
            '     UNION ALL\n' +
            '     SELECT COUNT(*) FROM CrimeIncident\n' +
            '     UNION ALL\n' +
            '     SELECT COUNT(*) FROM Location\n' +
            '     UNION ALL\n' +
            '     SELECT COUNT(*) FROM EVENTPERMIT\n' +
            '     UNION ALL\n' +
            '     SELECT COUNT(*) FROM STREETLIGHT\n' +
            '     UNION ALL\n' +
            '     SELECT COUNT(*) FROM SHOTSPOTTER);');
        console.log('Database query successful');

        // Send response with query result
        res.json(result.rows);
    } catch (error) {
        console.error('Error querying database:', error);

    }
});

app.get('/complex-trend1', async (req, res) => {
    try {
        const arrest = req.query.arrest.toString();
        const year = req.query.year.toString();

        console.log(arrest, year);

        const result = await session.execute(
            `SELECT
                TO_CHAR(S.ALERT_DATE, 'MM') AS month,
                COUNT(C.UNIQUE_ID) AS num_crimes
            FROM
                CHUERTA.CRIMEINCIDENT C
                    INNER JOIN CHUERTA.LOCATION L ON C.UNIQUE_ID = L.CRIME_ID
                    INNER JOIN CHUERTA.SHOTSPOTTER S ON L.DISTRICT = S.DISTRICT
            WHERE
                EXTRACT(YEAR FROM C.INCIDENT_DATE) = EXTRACT(YEAR FROM S.ALERT_DATE)
                AND EXTRACT(MONTH FROM C.INCIDENT_DATE) = EXTRACT(MONTH FROM S.ALERT_DATE)
                AND EXTRACT(DAY FROM C.INCIDENT_DATE) = EXTRACT(DAY FROM S.ALERT_DATE)
                AND EXTRACT(HOUR FROM C.INCIDENT_DATE) = EXTRACT(HOUR FROM S.ALERT_DATE)
                AND C.CLASSIFIED_AS = 'WEAPONS VIOLATION'
                AND C.ARREST = :arrest
                AND S.ROUNDS > 1
                AND S.ALERT_DATE BETWEEN TO_DATE('01/01/' || :year, 'MM/DD/YYYY') AND TO_DATE('12/31/' || :year, 'MM/DD/YYYY')
            GROUP BY
                TO_CHAR(S.ALERT_DATE, 'MM')
            ORDER BY
                TO_CHAR(S.ALERT_DATE, 'MM')`,
            { arrest: arrest,
                year: year
            }
        );

        console.log('Database query successful');
        console.log(result.rows);
        res.json(result.rows);
    } catch (error) {
        console.error('Error querying database:', error);
    }
});

app.get('/complex-trend2', async (req, res) => {
    try {
        const year = req.query.year;
        const arrest = req.query.arrest; // Capture arrest, which can be undefined

        const startDate = `${year}-01-01`;
        const endDate = `${year}-12-31`;

        console.log(`Querying data for Year: ${year}, Arrest: ${arrest}`);

        // Build dynamic query conditions based on the presence of 'arrest'
        let additionalConditions = '';
        if (arrest !== undefined && arrest !== '') {
            additionalConditions = ` AND CI.Arrest = :arrest`;
        }

        const query = `
            SELECT
                CPS.Police_District,
                TO_CHAR(CI.Incident_Date, 'YYYY-MM') AS Year_Month,
                AVG(TO_NUMBER(CPS.Average_Student_Attendance, '99.9')) AS Avg_Student_Attendance,
                COUNT(CI.UNIQUE_ID) AS Crime_Count
            FROM
                CHUERTA.CrimeIncident CI
            JOIN
                CHUERTA.Location L ON CI.UNIQUE_ID = L.CRIME_ID
            JOIN
                HongjieShi.Chicago_Public_Schools CPS ON L.District = CPS.Police_District
            WHERE
                CI.Incident_Date BETWEEN TO_DATE(:startDate, 'YYYY-MM-DD') AND TO_DATE(:endDate, 'YYYY-MM-DD')
                ${additionalConditions}
            GROUP BY
                CPS.Police_District, TO_CHAR(CI.Incident_Date, 'YYYY-MM')
            ORDER BY
                CPS.Police_District, Year_Month`;

        const result = await session.execute(query, {
            startDate,
            endDate,
            arrest: (arrest ? arrest : undefined) // Only pass arrest if not empty
        });

        console.log('Database query successful', result.rows);
        res.json(result.rows);
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
});


app.get('/', (req, res) => {
    res.send('Hello from our server!')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//close db when server closes
process.on('SIGINT', async () => {
    console.log('Closing database connection');
    await session.close();
    process.exit();
});







/*SELECT 'CrimeType' AS crimetype, COUNT(*) AS count FROM CrimeType
UNION ALL
SELECT 'CrimeIncident' AS crimeincident, COUNT(*) AS count FROM CrimeIncident
UNION ALL
SELECT 'Location' AS location, COUNT(*) AS count FROM Location
UNION ALL
SELECT 'EVENTPERMIT' AS eventpermit, COUNT(*) AS count FROM EVENTPERMIT
UNION ALL
SELECT 'STREETLIGHT' AS streetlight, COUNT(*) AS count FROM STREETLIGHT
UNION ALL
SELECT 'SHOTSPOTTER' AS shotspotter, COUNT(*) AS count FROM SHOTSPOTTER
UNION ALL
SELECT
    'Total' AS table_name,
    SUM(total_count) AS count
FROM
    (SELECT COUNT(*) AS total_count FROM CrimeType
     UNION ALL
     SELECT COUNT(*) FROM CrimeIncident
     UNION ALL
     SELECT COUNT(*) FROM Location
     UNION ALL
     SELECT COUNT(*) FROM EVENTPERMIT
     UNION ALL
     SELECT COUNT(*) FROM STREETLIGHT
     UNION ALL
     SELECT COUNT(*) FROM SHOTSPOTTER);*/
