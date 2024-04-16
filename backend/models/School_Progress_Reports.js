const db = require("../db/session");

async function createSchoolProgressReportsTable(session) {
    try {
        await session.execute(`
            CREATE TABLE School_Progress_Reports (
                School_ID NUMBER NOT NULL,
                Long_Name VARCHAR2(255),
                Primary_Category VARCHAR2(50),
                Address VARCHAR2(255),
                City VARCHAR2(50),
                State VARCHAR2(10),
                Zip VARCHAR2(10),
                Phone VARCHAR2(15),
                Progress_Report_Year VARCHAR2(9),
                Student_Attendance_Year_1_Pct NUMBER,
                Student_Attendance_Year_2_Pct NUMBER,
                Student_Attendance_Avg_Pct NUMBER,
                Teacher_Attendance_Year_1_Pct NUMBER,
                Teacher_Attendance_Year_2_Pct NUMBER,
                Teacher_Attendance_Avg_Pct NUMBER,
                PRIMARY KEY (School_ID, Progress_Report_Year)
            )
        `);
        await session.execute('commit');
        console.log('School_Progress_Reports table created successfully');
    } catch (error) {
        console.error('Error creating School_Progress_Reports table:', error);
        await session.execute('rollback');
    }
}

async function initialize() {
    try {
        const session = await db;
        await createSchoolProgressReportsTable(session);
        await session.close();
    } catch (error) {
        console.error('Error initializing School_Progress_Reports table:', error);
    }
}

initialize().then(() => console.log('Initialization of School_Progress_Reports table completed'));
