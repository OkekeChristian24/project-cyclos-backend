const { getFeesByCompany } = require("../api/fees/fee.service");
const  calculate = require("./calculate");

const checkTotalPrice = (totalPricePaid, products, company) => {
    return new Promise((resolve, reject) => {
        getFeesByCompany(company, (error, results) => {
            if (error) {
                console.log(error);
                reject(false);
            }
            if (!results) {
                reject(false);
            }
            if(results.length === 0){
                reject(false);
            }
    
            let priceSum = 0;
            const chargePercent = results[0].charge_percent;
            const taxPercent = results[0].tax_percent;
    
            for(let i=0; i<products.length; i++){
                priceSum += products[i].price;
            }
            if(totalPricePaid >= calculate(chargePercent, taxPercent, priceSum)){
                resolve(true);
            }
            reject(false);
        });
    });
};

module.exports = checkTotalPrice;