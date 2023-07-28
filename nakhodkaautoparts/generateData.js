const fs = require('fs');
const papa = require("papaparse");

const csvFilePath = "./src/data/car-data.csv";
const content = fs.readFileSync(csvFilePath, "utf8");

let parsedCarData = [];

papa.parse(content, {
    header: true,
    skipEmptyLines: true,
    complete: (result) => {
        parsedCarData = result.data;
    }
});

const models= [];
parsedCarData.forEach((row, index) => {
    console.log(row);
    const existingModel = models.find(model => model.label === row.Model.toUpperCase().trim());
    if (existingModel) {
        const existingMake = existingModel.makes.find(make => make.label === row.Make.toUpperCase().trim());
        if (existingMake) {
            // Assuming that year and engine is always passed
            const existingYear = existingMake.year?.find(year => year.label === row.Year);
            const existingEngine = existingMake.engine?.find(engine => engine.label === row.Engine.toUpperCase().trim());
            if (!existingYear) {
                const newYear = {
                    key: existingMake.year?.length ? existingMake.year.length + 1 : 1,
                    label: row.Year,
                }
                existingMake.year?.push(newYear);
            }

            if (!existingEngine) {
                const newEngine = {
                    key: existingMake.engine?.length ? existingMake.engine.length + 1 : 1,
                    label: row.Engine.toUpperCase().trim(),
                }
                existingMake.engine?.push(newEngine);
            }
        } else {
            const newMake = {
                key: existingModel.makes.length + 1,
                label: row.Make.toUpperCase().trim(),
                year: [{key: 1, label: row.Year}],
                engine: [{key: 1, label: row.Engine}],
            }
            existingModel.makes.push(newMake);
        }
    } else {
        const make = {
            key: 1,
            label: row.Make.toUpperCase().trim(),
            year: [{key: 1, label: row.Year}],
            engine: [{key: 1, label: row.Engine}],

        }
        const model = {
            key: index + 1,
            label: row.Model.toUpperCase().trim(),
            makes: [make]
        }

        models.push(model);
    }
})

fs.writeFile('./src/data/car-data.json', JSON.stringify(models), function(err) {
        if (err) throw err;
    }
);

const csvPartsFilePath = "./src/data/parts.csv";
const partsContent = fs.readFileSync(csvPartsFilePath, "utf8");

let parsedParts = [];

papa.parse(partsContent, {
    skipEmptyLines: true,
    complete: (result) => {
        parsedParts = result.data;
    }
});

fs.writeFile('./src/data/parts.json', JSON.stringify(parsedParts.flat()), function(err) {
        if (err) throw err;
    }
);

