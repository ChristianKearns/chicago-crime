
const db = require('../db/session');
const { readCSV } = require('./csvReader.js');

// Function to insert data into Shotspotter table
async function insertEconomicsDataIntoOracle(data) {
    let session;
    try {
        session = await db;

        // Arrays to store data for bulk insertion
        const economicsDataArray = [];

        // Iterate through the data
        for (let i = 1; i < data.length; i++) {
            const row = data[i];
            console.log("row :", i);

            // Extract data for Economics table
            const economicsData = {
                Community_Area_Number: row[0],
                Community_Area_Name: row[1],
                Percent_of_Housing_Crowded: row[2],
                Percent_Households_Below_Poverty: row[3],
                Percent_Aged_16_Unemployed: row[4],
                Percent_Aged_25_Without_HS_Diploma: row[5],
                Percent_Aged_Under_18_Over_64: row[6],
                Per_Capita_Income: row[7],
                Hardship_Index: row[8]
            };

            // Push data for bulk insertion
            economicsDataArray.push(economicsData);
        }

        // Bulk insertion into Economics table
        const economicsQuery = `
            INSERT INTO Economics (
                Community_Area_Number, 
                Community_Area_Name, 
                Percent_of_Housing_Crowded, 
                Percent_Households_Below_Poverty, 
                Percent_Aged_16_Unemployed, 
                Percent_Aged_25_Without_HS_Diploma, 
                Percent_Aged_Under_18_Over_64, 
                Per_Capita_Income, 
                Hardship_Index
            ) VALUES (
                :Community_Area_Number, 
                :Community_Area_Name, 
                :Percent_of_Housing_Crowded, 
                :Percent_Households_Below_Poverty, 
                :Percent_Aged_16_Unemployed, 
                :Percent_Aged_25_Without_HS_Diploma, 
                :Percent_Aged_Under_18_Over_64, 
                :Per_Capita_Income, 
                :Hardship_Index
            )`;

        await session.executeMany(economicsQuery, economicsDataArray);
        await session.execute('commit');

        console.log('Economics data inserted successfully into Oracle database.');
        await session.close();
    } catch (error) {

        console.error('Error inserting Economics data into Oracle database:', error);
        if (session) {
            await session.rollbackTransaction;
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


const filePath = '.\\csv_files\\Per_Capita_Income.csv';

// Read CSV file and extract data
readCSV(filePath)
    .then(records => {
        console.log('Parsed records:', records);
        // Now you can call your insertDataIntoOracle function with the parsed records
        insertEconomicsDataIntoOracle(records).then(r => console.log('completed inserting data into Oracle database') );
    })
    .catch(error => {
        console.error('Error reading CSV file:', error);
    });
