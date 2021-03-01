const {Stock} = require('./Stock');

let stock;

beforeEach(() => {
    stock = new Stock(10_000, 100);
});

describe('toFixed 반올림 테스트', function () {
    it('0.909는 0.91로 반올림된다', function () {
        expect(0.909.toFixed(2)).toBe("0.91");
    });
    it('0.901은 0.90으로 반올림된다', function () {
        expect(0.901.toFixed(2)).toBe("0.90");
    });
});

test("초기 단계 가치는 1%다", () => {
    expect(stock.myStockPercent).toBe(1);
})

test("시드로 20억, 10%가 희석된다", () => {
    stock.dilution(10, 20);

    expect(stock.companyStockCount).toBe(11_000);
    expect(stock.myStockPercent).toBe(0.91);
    expect(stock.myStockValue).toBe(0.18);
})

test("시드로 20억, 10% / 시리즈A로 100억, 20%가 희석된다", () => {
    stock.dilution(10, 20);
    stock.dilution(20, 100);

    expect(stock.companyStockCount).toBe(13_200);
    expect(stock.myStockPercent).toBe(0.76);
    expect(stock.myStockValue).toBe(0.76);
})