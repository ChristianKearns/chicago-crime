const fs = require('fs');
const {parse} =  require('csv-parse');

function readCSV(filePath) {

        return new Promise((resolve, reject) => {
            const records = [];

            // Create a read stream for the CSV file
            const readStream = fs.createReadStream(filePath);

            // Initialize the parser with the desired options
            const parser = parse({
                delimiter: ','
            });

            // Handle errors during parsing
            parser.on('error', err => {
                reject(err);
            });

            // Parse each record in the CSV file
            parser.on('data', record => {
                records.push(record);
            });

            // When parsing is complete, resolve with the parsed records
            parser.on('end', () => {
                resolve(records);
            });

            // Pipe the read stream into the parser
            readStream.pipe(parser);
        });
}

module.exports = { readCSV };