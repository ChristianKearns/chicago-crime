const db = require('../db/session');
const { readCSV } = require('./csvReader.js');

// Function to insert data into Oracle database
async function insertSchoolRecordsIntoOracle(data) {
    let session;
    try {
        session = await db;

        // Arrays to store data for bulk insertion
        const schoolRecordDataArray = [];

        // Iterate through the data, skipping the header row
        for (let i = 1; i < data.length; i++) {
            const row = data[i];
            console.log("row:", i);

            // Extract data for Chicago_Public_Schools table
            const schoolRecordData = {
                SchoolID: row[0],
                SchoolName: row[1],
                SchoolLevel: row[2],
                StreetAddress: row[3],
                PhoneNumber: row[4],
                AverageStudentAttendance: row[5],
                RateOfMisconductsPer100Students: row[6],
                AverageTeacherAttendance: row[7],
                CollegeEligibilityPercent: row[8],
                GraduationRatePercent: row[9],
                CollegeEnrollmentRatePercent: row[10],
                CollegeEnrollmentNumberOfStudents: row[11],
                FreshmanOnTrackRatePercent: row[12],
                XCoordinate: row[13],
                YCoordinate: row[14],
                Latitude: row[15],
                Longitude: row[16],
                CommunityAreaNumber: row[17],
                CommunityAreaName: row[18],
                Ward: row[19],
                PoliceDistrict: row[20],
                Location: row[21]
            };

            // Push data for bulk insertion
            schoolRecordDataArray.push(schoolRecordData);
        }

        // Bulk insertion into Chicago_Public_Schools table
        const schoolRecordQuery = `
            INSERT INTO Chicago_Public_Schools (
                School_ID, School_Name, School_Level, Street_Address, Phone_Number,
                Average_Student_Attendance, Rate_of_Misconducts_per_100_students, Average_Teacher_Attendance,
                College_Eligibility_Percent, Graduation_Rate_Percent, College_Enrollment_Rate_Percent,
                College_Enrollment_number_of_students, Freshman_on_Track_Rate_Percent, X_COORDINATE,
                Y_COORDINATE, Latitude, Longitude, Community_Area_Number, Community_Area_Name,
                Ward, Police_District, Location
            ) VALUES (
                :SchoolID, :SchoolName, :SchoolLevel, :StreetAddress, :PhoneNumber,
                :AverageStudentAttendance, :RateOfMisconductsPer100Students, :AverageTeacherAttendance,
                :CollegeEligibilityPercent, :GraduationRatePercent, :CollegeEnrollmentRatePercent,
                :CollegeEnrollmentNumberOfStudents, :FreshmanOnTrackRatePercent, :XCoordinate,
                :YCoordinate, :Latitude, :Longitude, :CommunityAreaNumber, :CommunityAreaName,
                :Ward, :PoliceDistrict, :Location
            )`;

        await session.executeMany(schoolRecordQuery, schoolRecordDataArray);
        await session.execute('commit');

        console.log('School records inserted successfully into Oracle database.');
        await session.close();
    } catch (error) {
        console.error('Error inserting school records into Oracle database:', error);
        if (session) {
            await session.rollbackTransaction();
        }
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


const filePath = '.\\csv_files\\School_report.csv';

// Read CSV file and extract data
readCSV(filePath)
    .then(records => {
        insertSchoolRecordsIntoOracle(records).then(() => console.log('Completed inserting data into Oracle database'));
    })
    .catch(error => {
        console.error('Error reading CSV file:', error);
    });