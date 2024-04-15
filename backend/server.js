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

/* Trend 3 Stuff */
app.get('/complex-trend3', async (req, res) => {
    try {
        const area = req.query.area.toString();
        const type = req.query.type.toString();
        const year = req.query.year.toString();

        console.log(area, type, year);

        const result = await session.execute(`
        WITH Crime_Trends AS (
            SELECT 
                EXTRACT(MONTH FROM ci.Incident_Date) AS Month,
                l.Community_Area,
                COUNT(*) AS Incident_Count
            FROM 
                CHUERTA.CrimeIncident ci
            JOIN 
                CHUERTA.Location l ON ci.Unique_ID = l.Crime_ID
            WHERE 
                EXTRACT(YEAR FROM ci.Incident_Date) = :year AND
                ci.CLASSIFIED_AS = :type
            GROUP BY 
                EXTRACT(MONTH FROM ci.Incident_Date),
                l.Community_Area
        ),
        Community_Area_Stats AS (
            SELECT 
                ct.Month,
                ct.Community_Area,
                pd.name,
                ct.Incident_Count,
                e.Per_Capita_Income,
                e.Percent_Households_Below_Poverty,
                pd.Population
            FROM 
                Crime_Trends ct
            LEFT JOIN 
                "CHRISTIAN.KEARNS".Economics e ON ct.Community_Area = e.Community_Area_Number
            LEFT JOIN 
                "CHRISTIAN.KEARNS".PopulationData pd ON ct.Community_Area = pd.Community_Area
            WHERE e.Community_Area_Name=:area
        )
        SELECT 
            Month,
            (Incident_Count / (Population/1000)) AS Normalized_Incident_Rate
        FROM 
            Community_Area_Stats
        ORDER BY 
            Month ASC`
        ,
        { 
            area: area,
            type: type,
            year: year
        });

        console.log('Database query successful');
        console.log(result.rows);

        res.json(result.rows);
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
});

app.get('/area-income-info', async(req, res) => {
    try {
        const result = await session.execute(`
            SELECT e.community_area_name, e.per_capita_income, e.percent_households_below_poverty
            FROM "CHRISTIAN.KEARNS".Economics e , "CHRISTIAN.KEARNS".PopulationData pd
            WHERE e.community_area_number = pd.community_area
        `
        );
        console.log('Database query successful');
        console.log(result.rows);
        res.json(result.rows);
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
});

app.get('/community-areas', async(req, res) => {
    try {
        const result = await session.execute(`
            SELECT UNIQUE e.COMMUNITY_AREA_NAME 
            FROM "CHRISTIAN.KEARNS".Economics e 
            WHERE e.COMMUNITY_AREA_NAME != 'CHICAGO'
            ORDER BY e.COMMUNITY_AREA_NAME ASC
        `
        );
        console.log('Database query successful');
        console.log(result.rows);
        res.json(result.rows);
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
});

app.get('/crime-types', async(req, res) => {
    try {
        const result = await session.execute(`
            SELECT UNIQUE ci.CLASSIFIED_AS 
            FROM CHUERTA.CrimeIncident ci 
            ORDER BY ci.CLASSIFIED_AS ASC
        `
        );
        console.log('Database query successful');
        console.log(result.rows);
        res.json(result.rows);
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
});

/* End Trend 3 Stuff */

app.get('/tuple-count', async (req, res) => {
    try {
        // Execute database query
        const query = `
            SELECT 'CrimeType' AS crimetype, COUNT(*) AS count FROM CrimeType 
            UNION ALL 
            SELECT 'CrimeIncident' AS crimeincident, COUNT(*) AS count FROM CrimeIncident 
            UNION ALL 
            SELECT 'Location' AS location, COUNT(*) AS count FROM Location 
            UNION ALL 
            SELECT 'EventPermit' AS eventpermit, COUNT(*) AS count FROM EventPermit 
            UNION ALL 
            SELECT 'Streetlight' AS streetlight, COUNT(*) AS count FROM Streetlight 
            UNION ALL 
            SELECT 'Shotspotter' AS shotspotter, COUNT(*) AS count FROM Shotspotter 
            UNION ALL 
            SELECT 'Total' AS table_name, SUM(total_count) AS count 
            FROM (
                SELECT COUNT(*) AS total_count FROM CrimeType 
                UNION ALL 
                SELECT COUNT(*) FROM CrimeIncident 
                UNION ALL 
                SELECT COUNT(*) FROM Location 
                UNION ALL 
                SELECT COUNT(*) FROM EventPermit 
                UNION ALL 
                SELECT COUNT(*) FROM Streetlight 
                UNION ALL 
                SELECT COUNT(*) FROM Shotspotter
            )`;
        const result = await session.execute(query);
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
