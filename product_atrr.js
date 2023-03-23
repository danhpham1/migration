const csvFilePath = "./fobiz_public_product.csv";
const Papa = require('papaparse');
const fs = require("fs");

async function main() {
    const dataProductCSV = fs.readFileSync("./fobiz_product.csv");
    // const vendors = csv dataCSV.toString();
    const products = Papa.parse(dataProductCSV.toString(), { header: true });

    const productAtrrCSV = fs.readFileSync("./fobiz_product_attrs.csv");
    const productAtrr = Papa.parse(productAtrrCSV.toString(), {header: true});

    const productMap = new Map();
    const productAttrMap = new Map();
    
    products.data.map(row => {
        if(row.code){
            productMap.set(row.id,row.code);
        }
    });

    productAtrr.data.map(row => {
        productAttrMap.set(row.id, row.name);
    })

    const productPropertyCSA = fs.readFileSync("./fobiz_product_property.csv");
    const productProperties = Papa.parse(productPropertyCSA.toString(), { header: true });

    const productPropertyArr = productProperties.data.map(row => {
        const value = {
            attribute: productAttrMap.get(row.property_id),
            product: productMap.get(row.product_id),
            value: row.property_value,
            active: true
        };
        return {
            ...value
        } 
    });

    const csv = productPropertyArr.map(row => `${row.attribute},${row.value},${row.product},system,system,true`).join('\n');

    fs.writeFileSync('product_attrs.csv', csv);
}

main();