const db = require('../db/session');
const { readCSV } = require('./csvReader.js');

// Function to insert school progress report data into Oracle database
async function insertSchoolProgressReports(data) {
    let session;
    try {
        session = await db;

        // Iterate through the data, skipping the header row
        for (let i = 1; i < data.length; i++) {
            const row = data[i];

            // Construct the data object for insertion
            const progressReportData = {
                SchoolID: row[0],
                LongName: row[1],
                PrimaryCategory: row[2],
                Address: row[3],
                City: row[4],
                State: row[5],
                Zip: row[6],
                Phone: row[7],
                ProgressReportYear: row[8],
                StudentAttendanceYear1Pct: row[9],
                StudentAttendanceYear2Pct: row[10],
                StudentAttendanceAvgPct: row[11],
                TeacherAttendanceYear1Pct: row[12],
                TeacherAttendanceYear2Pct: row[13],
                TeacherAttendanceAvgPct: row[14],
            };

            // Define the SQL query for insertion
            const progressReportQuery = `
                INSERT INTO School_Progress_Reports (
                    School_ID, Long_Name, Primary_Category, Address, City, State, Zip, Phone,
                    Progress_Report_Year, Student_Attendance_Year_1_Pct, Student_Attendance_Year_2_Pct,
                    Student_Attendance_Avg_Pct, Teacher_Attendance_Year_1_Pct, Teacher_Attendance_Year_2_Pct,
                    Teacher_Attendance_Avg_Pct
                ) VALUES (
                    :SchoolID, :LongName, :PrimaryCategory, :Address, :City, :State, :Zip, :Phone,
                    :ProgressReportYear, :StudentAttendanceYear1Pct, :StudentAttendanceYear2Pct,
                    :StudentAttendanceAvgPct, :TeacherAttendanceYear1Pct, :TeacherAttendanceYear2Pct,
                    :TeacherAttendanceAvgPct
                )`;

            try {
                // Attempt to insert the record
                await session.execute(progressReportQuery, progressReportData);
            } catch (error) {
                // If a unique constraint violation occurs, log and skip
                if (error.errorNum === 1) {
                    console.log(`Skipping duplicate record for School_ID ${progressReportData.SchoolID} and Progress_Report_Year ${progressReportData.ProgressReportYear}.`);
                } else {
                    // Rethrow if the error is not related to unique constraint violation
                    throw error;
                }
            }
        }

        // Commit changes if all insertions (or skips) are successful
        await session.commit();
        console.log('School progress report records insertion process completed.');
    } catch (error) {
        console.error('Error inserting school progress report records into Oracle database:', error);
        await session.rollback();
    } finally {
        if (session) {
            try {
                await session.close();
            } catch (error) {
                console.error('Error closing database connection:', error);
            }
        }
    }
}

// Path to the CSV file
const filePath = '.\\csv_files\\Chicago_Public_Schools_-_School_Progress_Reports_SY1523_20240415.csv';

// Read CSV file and extract data
readCSV(filePath)
    .then(records => {
        insertSchoolProgressReports(records).then(() => console.log('Completed inserting data into Oracle database'));
    })
    .catch(error => {
        console.error('Error reading CSV file:', error);
    });
