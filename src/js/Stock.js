
class Stock {
    _companyStockCount;
    _companyValue=0;
    _myStockCount;
    _myStockValue;
    constructor(initCount, myStockCount) {
        this._companyStockCount = initCount;
        this._myStockCount = myStockCount;
        this.exercise();
    }

    /**
     *
     * @param investorPercent {Number} %
     * @param companyValue {Number} 억단위
     */
    dilution(investorPercent, companyValue) {
        this._companyStockCount += this._companyStockCount * (investorPercent/100);
        this._companyValue = companyValue;
        this.exercise();
    }

    exercise() {
        const stockValue = this._companyValue * (this._myStockCount / this._companyStockCount);
        this._myStockValue = Number.parseFloat(stockValue.toFixed(2));
    }

    get myStockValue() {
        return this._myStockValue;
    }

    /**
     * @returns {Number} % 단위
     */
    get myStockPercent() {
        const percent = (this._myStockCount / this._companyStockCount) * 100;
        return Number.parseFloat(percent.toFixed(2));
    }

    get companyStockCount() {
        return this._companyStockCount;
    }
}

module.exports = {
    Stock,
};