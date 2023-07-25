const fs = require('fs');
const papa = require("papaparse");

const csvFilePath = "./src/data/car-test.csv";
const content = fs.readFileSync(csvFilePath, "utf8");

let parsedData = [];

papa.parse(content, {
    header: true,
    skipEmptyLines: true,
    complete: (result) => {
        parsedData = result.data;
    }
});

const models= [];
parsedData.forEach((row, index) => {
    const existingModel = models.find(model => model.label === row.Model);
    if (existingModel) {
        const existingMake = existingModel.makes.find(make => make.label === row.Make);
        if (existingMake) {
            // Assuming that year and engine is always passed
            const existingYear = existingMake.year?.find(year => year.label === row.Year);
            const existingEngine = existingMake.engine?.find(engine => engine.label === row.Engine);
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
                    label: row.Engine,
                }
                existingMake.engine?.push(newEngine);
            }
        } else {
            const newMake = {
                key: existingModel.makes.length + 1,
                label: row.Make,
                year: [{key: 1, label: row.Year}],
                engine: [{key: 1, label: row.Engine}],
            }
            existingModel.makes.push(newMake);
        }
    } else {
        const make = {
            key: 1,
            label: row.Make,
            year: [{key: 1, label: row.Year}],
            engine: [{key: 1, label: row.Engine}],

        }
        const model = {
            key: index + 1,
            label: row.Model,
            makes: [make]
        }
        models.push(model);
    }
})

fs.writeFile('./src/data/car-test.json', JSON.stringify(models), function(err) {
        if (err) throw err;
    }
);

