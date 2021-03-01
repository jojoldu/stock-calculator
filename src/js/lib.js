import {Stock} from "./Stock";

let stock;

export function init(stockCount, myStockCount) {
    stock = new Stock(stockCount, myStockCount);
}

export function addRound(investorPercent, companyValue) {
    stock.dilution(investorPercent, companyValue);

    return stock.myStockValue;
}




