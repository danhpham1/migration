const csvFilePath = "./fobiz_public_vendor.csv";
const Papa = require('papaparse');
const fs = require("fs");

async function main() {
    const dataCSV = fs.readFileSync("./fobiz_vendor.csv");
    // const vendors = csv dataCSV.toString();
    const results = Papa.parse(dataCSV.toString(), { header: true });

    const vendors = results.data;

    const vendorsArr = [];
    
    for(let i = 0; i < vendors.length; i++) {
        if(vendors[i].code){
            vendorsArr.push({
                code: vendors[i].code,
                name: vendors[i].name
            })
        }
    }

    const csv = vendorsArr.map(row => `${row.code},${row.name},system,system`).join(`\n`);

    fs.writeFileSync('vendor.csv', csv);
}

main();