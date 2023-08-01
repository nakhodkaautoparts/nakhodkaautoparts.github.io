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
    const existingMake = models.find(model => model.label === row.Make.toUpperCase().trim());
    if (existingMake) {
        const existingModel = existingMake.models.find(make => make.label === row.Model.toUpperCase().trim());
        if (existingModel) {
            // Assuming that year and engine is always passed
            const existingYear = existingModel.year?.find(year => year.label === row.Year);
            const existingEngine = existingModel.engine?.find(engine => engine.label === row.Engine.toUpperCase().trim());
            if (!existingYear) {
                const newYear = {
                    key: existingModel.year?.length ? existingModel.year.length + 1 : 1,
                    label: row.Year,
                }
                existingModel.year?.push(newYear);
            }

            if (!existingEngine) {
                const newEngine = {
                    key: existingModel.engine?.length ? existingModel.engine.length + 1 : 1,
                    label: row.Engine.toUpperCase().trim(),
                }
                existingModel.engine?.push(newEngine);
            }
        } else {
            const newModel = {
                key: existingMake.models.length + 1,
                label: row.Model.toUpperCase().trim(),
                year: [{key: 1, label: row.Year}],
                engine: [{key: 1, label: row.Engine}],
                vin: [{key: 1, label: row.Vin}],
            }
            existingMake.models.push(newModel);
        }
    } else {
        const make = {
            key: 1,
            label: row.Model.toUpperCase().trim(),
            year: [{key: 1, label: row.Year}],
            engine: [{key: 1, label: row.Engine}],
            vin: [{key: 1, label: row.Vin }],
        }
        const model = {
            key: index + 1,
            label: row.Make.toUpperCase().trim(),
            models: [make]
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

