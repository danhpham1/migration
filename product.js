const csvFilePath = "./fobiz_public_product.csv";
const Papa = require('papaparse');
const fs = require("fs");

async function main() {
    const dataCSV = fs.readFileSync("./fobiz_product.csv");
    // const vendors = csv dataCSV.toString();
    const results = Papa.parse(dataCSV.toString(), { header: true });

    const products = results.data;

    const productsArr = [];
    
    for(let i = 0; i < products.length; i++) {
        productsArr.push({
            code: products[i].code,
            name: products[i].name,
            created_at: 'system',
            updated_at: 'system'
        })
    }

    const csv = productsArr.map(row => `${row.code},${row.name},system,system`).join('\n');

    fs.writeFileSync('products.csv', csv);
}

main();