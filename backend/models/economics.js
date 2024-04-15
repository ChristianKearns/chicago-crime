const db = require('../db/session');

/*

Connection will be open, must close the connection after the script is run.
 */
async function createEconomicsTable(session) {
    try {
        await session.execute(
            `CREATE TABLE Economics (
                Community_Area_Number NUMBER PRIMARY KEY,
                Community_Area_Name VARCHAR2(100),
                Percent_of_Housing_Crowded NUMBER,
                Percent_Households_Below_Poverty NUMBER,
                Percent_Aged_16_Unemployed NUMBER,
                Percent_Aged_25_Without_HS_Diploma NUMBER,
                Percent_Aged_Under_18_Over_64 NUMBER,
                Per_Capita_Income NUMBER,
                Hardship_Index NUMBER
             )
            `
        );
        await session.execute('commit')
        console.log('Economics table created successfully');
    } catch (error) {
        console.error('Error creating Economics table:', error);
    }
}

async function initialize() {
    try {
        // Call the db function to obtain the session
        const session = await db;
        await createEconomicsTable(session);
        await session.close();

    } catch (error) {
        console.error('Error initializing:', error);
    }
}

initialize().then(() => console.log('completed Economics Table creation'));
