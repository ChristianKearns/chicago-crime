const fs = require('fs');

// Read the CSV file
const csvData = fs.readFileSync('csv_files/chicago-community-areas.csv', 'utf8');

// Split the CSV data into lines
const lines = csvData.split('\n');

// Remove trailing newline characters
const cleanedLines = lines.map(line => line.trim());

const data = cleanedLines.map(line => line.split(','));
for (let i = 0; i < data.length; i++) {
    data[i].shift();
}

// Extract headers and data
const headers = [];
const dataa = [];
for (let j = 1; j < data[0].length + 1; j++) {
    const dataaa = [];
    for(let i = 0; i < cleanedLines.length; i++) {
        const row = cleanedLines[i].split(',');
        dataaa.push(row[j])   
    }
    dataa.push(dataaa);
}

for(let i = 0; i < cleanedLines.length; i++) {
    const row = cleanedLines[i].split(',');
    headers.push(row[0]);  
}
console.log(headers);


// Generate SQL insert commands
const sqlCommands = dataa.map(row => {
    return `INSERT INTO PopulationData (${headers.join(', ')}) VALUES (${row});`;
});

// Write SQL commands to a file
fs.writeFileSync('insert_commands.sql', sqlCommands.join('\n'));
