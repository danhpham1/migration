const csvFilePath = "./fobiz_public_product.csv";
const Papa = require('papaparse');
const fs = require("fs");

async function main() {
    const dataProductCSV = fs.readFileSync("./fobiz_product.csv");
    const dataVendorCSV = fs.readFileSync("./fobiz_vendor.csv");
    // const vendors = csv dataCSV.toString();
    const products = Papa.parse(dataProductCSV.toString(), { header: true });
    const vendors = Papa.parse(dataVendorCSV.toString(), { header: true });

    const productMap = new Map();
    const vendorMap = new Map();
    
    products.data.map(row => {
        if(row.code){
            productMap.set(row.id,row.code);
        }
    });

    vendors.data.map(row => {
        if(row.code) {
            vendorMap.set(row.id, row.code)
        }
    })

    const productVendorCSV = fs.readFileSync("./fobiz_product_vendor.csv");
    const productVendor = Papa.parse(productVendorCSV.toString(), {header: true});

    const productVendorArr = productVendor.data.map(row => {
        return {
            vendor: vendorMap.get(row.vendor_id),
            product: productMap.get(row.product_id)
        }
    });

    const csv = productVendorArr.map(row => `${row.vendor},${row.product},system,system`).join('\n');

    fs.writeFileSync('product_vendor.csv', csv);
}

main();