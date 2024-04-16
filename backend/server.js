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

        console.log(area, type);

        const result = await session.execute(`
        WITH Crime_Trends AS (
            SELECT 
                EXTRACT(MONTH FROM ci.Incident_Date) AS Month,
                EXTRACT(YEAR FROM ci.Incident_Date) AS Year,
                l.Community_Area,
                COUNT(*) AS Incident_Count
            FROM 
                CHUERTA.CrimeIncident ci
            JOIN 
                CHUERTA.Location l ON ci.Unique_ID = l.Crime_ID
            WHERE 
                ci.CLASSIFIED_AS=:type
            GROUP BY 
                EXTRACT(MONTH FROM ci.Incident_Date),
                EXTRACT(YEAR FROM ci.Incident_Date),
                l.Community_Area
        ),
        Community_Area_Stats AS (
            SELECT 
                ct.Month,
                ct.Year,
                ct.Incident_Count,
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
            Year,
            (Incident_Count / (Population/1000)) AS Normalized_Incident_Rate
        FROM 
            Community_Area_Stats
        ORDER BY 
            Year ASC, Month ASC`
        ,
        {
            area: area,
            type: type
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

/* End Complex Trend 3 Stuff */


/*Trend 4*/
app.get('/complex-trend4', async (req, res) => {
    try {


        const Classified_As = req.query.Classified_As.toString();
        console.log(Classified_As);

        const result = await session.execute(`
                    WITH Streetlights AS (
                        SELECT TO_CHAR(stl.CREATION_DATE, 'MM') AS Month,
                        TO_CHAR(stl.CREATION_DATE, 'YYYY') AS Year,
                        COUNT(*) AS StreetLampsOut
                    FROM CHUERTA.STREETLIGHT stl
                    WHERE stl.CREATION_DATE > DATE '2016-01-01'
                    GROUP BY TO_CHAR(stl.CREATION_DATE, 'MM'), TO_CHAR(stl.CREATION_DATE, 'YYYY')
                        ),
                        Crimes AS (
                    SELECT TO_CHAR(ci.INCIDENT_DATE, 'MM') AS Month,
                        TO_CHAR(ci.INCIDENT_DATE, 'YYYY') AS Year,
                        ci.CLASSIFIED_AS,
                        COUNT(*) AS Crime_Count
                    FROM PVENU.CRIMEINCIDENT ci
                        JOIN PVENU.LOCATION loc ON ci.UNIQUE_ID = loc.CRIME_ID
                    WHERE ci.INCIDENT_DATE >= DATE '2016-01-01'
                      AND ci.CLASSIFIED_AS =: Classified_As -- Filter by the input crime type
                    GROUP BY TO_CHAR(ci.INCIDENT_DATE, 'MM'), TO_CHAR(ci.INCIDENT_DATE, 'YYYY'), ci.CLASSIFIED_AS
                        )
                    SELECT COALESCE(s.Month, c.Month) AS Month,
                    COALESCE(s.Year, c.Year) AS Year,
                    s.StreetLampsOut,
                    c.CLASSIFIED_AS,
                    SUM(c.Crime_Count) AS Total_Crimes
                    FROM Streetlights s
                        LEFT JOIN Crimes c ON s.Month = c.Month AND s.Year = c.Year
                    GROUP BY COALESCE(s.Month, c.Month), COALESCE(s.Year, c.Year), s.StreetLampsOut, c.CLASSIFIED_AS
                    ORDER BY COALESCE(s.Year, c.Year) ASC, COALESCE(s.Month, c.Month) ASC`,
            {
                Classified_As: Classified_As
            });
        console.log('Here ---------- :' + Classified_As);
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
        const gunshot = req.query.gunshots.toString();

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
                AND C.CLASSIFIED_AS = 'HOMICIDE'
                AND C.ARREST = :arrest
                AND S.INCIDENT_TYPE_DESCRIPTION = :gunshot
                AND S.ALERT_DATE BETWEEN TO_DATE('01/01/' || :year, 'MM/DD/YYYY') AND TO_DATE('12/31/' || :year, 'MM/DD/YYYY')
            GROUP BY
                TO_CHAR(S.ALERT_DATE, 'MM')
            ORDER BY
                TO_CHAR(S.ALERT_DATE, 'MM')`,
            { arrest: arrest,
                year: year,
                gunshot:gunshot
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

/* Trend 5 */
app.get('/complex-trend5', async (req, res) => {
    try {
        const district = req.query.district.toString();
        const year = req.query.year.toString();
        console.log("LOGGING DISTRICT");
        console.log(district);
        console.log("LOGGING YEAR");
        console.log(year);

        const result = await session.execute(
            `WITH monthly_crime_counts AS (
                SELECT
                    ci.Classified_As AS crime_category,
                    TO_CHAR(ci.Incident_Date, 'MM') AS month,
                    l.District,
                    TO_CHAR(ci.Incident_Date, 'YYYY') AS year
                FROM
                    CHUERTA.CRIMEINCIDENT ci
                JOIN
                    CHUERTA.LOCATION l ON ci.Unique_ID = l.Crime_ID
                JOIN
                    CHUERTA.CRIMETYPE c ON ci.Classified_As = c.PrimaryType
                WHERE
                    TO_CHAR(ci.Incident_Date, 'YYYY') = :year
                    AND District = :district
            )
            SELECT
                crime_category,
                month,
                district,
                year,
                COUNT(*) AS crime_count
            FROM
                monthly_crime_counts
            GROUP BY
                crime_category,
                month,
                district,
                year
            ORDER BY
                crime_category,
                month,
                district`,
            { district: district,
              year: year,
            }
        );

        console.log('Complex5 query successful');
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


