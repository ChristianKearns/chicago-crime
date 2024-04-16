const db = require("../db/session");

async function createChicagoPublicSchoolsTable(session) {
    try {
        await session.execute(
            `CREATE TABLE Chicago_Public_Schools (
                School_ID NUMBER PRIMARY KEY,
                School_Name VARCHAR2(255),
                School_Level VARCHAR2(50),
                Street_Address VARCHAR2(255),
                Phone_Number VARCHAR2(50),
                Average_Student_Attendance VARCHAR2(50),
                Rate_of_Misconducts_per_100_students NUMBER,
                Average_Teacher_Attendance VARCHAR2(50),
                College_Eligibility_Percent NUMBER,
                Graduation_Rate_Percent NUMBER,
                College_Enrollment_Rate_Percent NUMBER,
                College_Enrollment_number_of_students NUMBER,
                Freshman_on_Track_Rate_Percent NUMBER,
                X_COORDINATE NUMBER,
                Y_COORDINATE NUMBER,
                Latitude NUMBER(10, 7),
                Longitude NUMBER(10, 7),
                Community_Area_Number NUMBER,
                Community_Area_Name VARCHAR2(255),
                Ward NUMBER,
                Police_District NUMBER,
                Location VARCHAR2(255)
             )
            `
        );
        await session.execute('commit');
        console.log('Chicago_Public_Schools table created successfully');
    } catch (error) {
        console.error('Error creating Chicago_Public_Schools table:', error);
    }
}

async function initialize() {
    try {
        // Call the db function to obtain the session
        const session = await db;
        await createChicagoPublicSchoolsTable(session);
        await session.close();
    } catch (error) {
        console.error('Error initializing:', error);
    }
}

initialize().then(() => console.log('Chicago_Public_Schools Table creation completed'));
