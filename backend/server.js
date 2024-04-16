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

app.get('/complex-trend1/bar', async (req, res) => {

        try {
            const year = req.query.year.toString();
            const gunshots = req.query.gunshots.toString();

            const result = await session.execute(
                `
            SELECT
                TO_CHAR(S.ALERT_DATE, 'MM') AS month,
                COUNT(C.UNIQUE_ID) AS num_crimes
             
            FROM
                CHUERTA.CRIMEINCIDENT C
                    JOIN CHUERTA.LOCATION L ON C.UNIQUE_ID = L.CRIME_ID
                    JOIN CHUERTA.SHOTSPOTTER S ON L.DISTRICT = S.DISTRICT
            WHERE
                EXTRACT(YEAR FROM C.INCIDENT_DATE) = EXTRACT(YEAR FROM S.ALERT_DATE)
                AND EXTRACT(MONTH FROM C.INCIDENT_DATE) = EXTRACT(MONTH FROM S.ALERT_DATE)
                AND EXTRACT(DAY FROM C.INCIDENT_DATE) = EXTRACT(DAY FROM S.ALERT_DATE)
                AND EXTRACT(HOUR FROM C.INCIDENT_DATE) = EXTRACT(HOUR FROM S.ALERT_DATE)
                AND (C.CLASSIFIED_AS = 'WEAPONS VIOLATION' OR C.CLASSIFIED_AS = 'HOMICIDE')
                AND S.INCIDENT_TYPE_DESCRIPTION =: gunshots
                AND C.DESCRIPTIONS LIKE '%MURDER%'
                AND S.ALERT_DATE BETWEEN TO_DATE('01/01/' || :year, 'MM/DD/YYYY') AND TO_DATE('12/31/' || :year, 'MM/DD/YYYY')
            GROUP BY
                TO_CHAR(S.ALERT_DATE, 'MM')
            ORDER BY
                TO_CHAR(S.ALERT_DATE, 'MM')`,
                {
                    year: year,
                    gunshots: gunshots
                }
            );

            console.log('Database query successful');
            console.log(result.rows);
            res.json(result.rows);
        } catch (error) {
            console.error('Error querying database:', error);
        }
});


app.get('/complex-trend1', async (req, res) => {
    try {
        const arrest = req.query.arrest.toString();
        const year = req.query.year.toString();
        const gunshots = req.query.gunshots.toString();

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
                AND (C.CLASSIFIED_AS = 'HOMICIDE')
                AND C.ARREST = :arrest
                AND S.INCIDENT_TYPE_DESCRIPTION =: gunshots
                AND S.ALERT_DATE BETWEEN TO_DATE('01/01/' || :year, 'MM/DD/YYYY') AND TO_DATE('12/31/' || :year, 'MM/DD/YYYY')
            GROUP BY
                TO_CHAR(S.ALERT_DATE, 'MM')
            ORDER BY
                TO_CHAR(S.ALERT_DATE, 'MM')`,
            { arrest: arrest,
                year: year,
                gunshots: gunshots
            }
        );

        console.log('Database query successful');
        console.log(result.rows);
        res.json(result.rows);
    } catch (error) {
        console.error('Error querying database:', error);
    }
});
//start of complex 2
// Endpoint to fetch all available years
app.get('/available-years', async (req, res) => {
    try {
        const result = await session.execute(`
            SELECT DISTINCT Progress_Report_Year FROM HongjieShi.School_Progress_Reports ORDER BY Progress_Report_Year
        `);

        const years = result.rows.map(row => row[0]);
        res.json(years);
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

// Modified /complex-trend2 endpoint to filter by district
app.get('/complex-trend2', async (req, res) => {
    const { district } = req.query;
    try {
        const query = `
            SELECT District, Progress_Report_Year AS Year, AVG(Student_Attendance_Avg_Pct) AS Avg_Student_Attendance, COUNT(Crime_ID) AS Crime_Count
            FROM (
                SELECT 
                    SPR.District, 
                    SPR.Progress_Report_Year, 
                    SPR.Student_Attendance_Avg_Pct,
                    CI.UNIQUE_ID AS Crime_ID
                FROM HongjieShi.School_Progress_Reports SPR
                LEFT JOIN CHUERTA.Location L ON SPR.District = L.District
                LEFT JOIN CHUERTA.CrimeIncident CI ON L.CRIME_ID = CI.UNIQUE_ID AND EXTRACT(YEAR FROM CI.Incident_Date) = TO_NUMBER(SPR.Progress_Report_Year)
                
                UNION ALL
                
                SELECT 
                    SPR.District, 
                    SPR.Progress_Report_Year, 
                    SPR.Student_Attendance_Avg_Pct,
                    CI.UNIQUE_ID AS Crime_ID
                FROM HongjieShi.School_Progress_Reports SPR
                LEFT JOIN PVENU.Location L ON SPR.District = L.District
                LEFT JOIN PVENU.CrimeIncident CI ON L.CRIME_ID = CI.UNIQUE_ID AND EXTRACT(YEAR FROM CI.Incident_Date) = TO_NUMBER(SPR.Progress_Report_Year)
            ) Combined
            ${district ? 'WHERE District = :district' : ''}
            GROUP BY District, Progress_Report_Year
            ORDER BY District, Progress_Report_Year
        `;

        const result = await session.execute(query, district ? { district } : {});

        const formattedData = result.rows.map(row => ({
            district: row[0],
            year: row[1],
            avgStudentAttendance: row[2],
            crimeCount: row[3]
        }));

        res.json(formattedData);
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

//end of complex 2


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


