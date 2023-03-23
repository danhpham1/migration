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

    const productSkuCSV = fs.readFileSync("./fobiz_product_sku.csv");
    const productSku = Papa.parse(productSkuCSV.toString(), {header: true});
    const productSkuArr = productSku.data.map(row => {
        return {
            sku: row.sku,
            product: productMap.get(row.product_id),
            variant: row.attr,
            status:true,
            is_generated_sku:true
        }
    });

    const csv = productSkuArr.map(row => `${row.sku},${row.product},${row.variant},${row.status},${row.is_generated_sku},system,system`).join('\n');

    fs.writeFileSync('product_sku.csv', csv);
}

main();