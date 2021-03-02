import {init, addRound} from './lib';

const initEl = document.getElementById("initBtn");
initEl.addEventListener("click", renderInitRound, false);

const addRoundEl = document.getElementById("addRountBtn");
addRoundEl.addEventListener("click", renderAddRound, false);

function renderInitRound() {
    onLoad();
    const stockCount = document.getElementById("stockCount").value;
    const myStockCount = document.getElementById("myStockCount").value;
    init(stockCount, myStockCount);
    offLoad();
}

function addRountInputBox() {

}

function renderAddRound() {
    onLoad();
    const investorPercent = document.getElementById("investorPercent").value;
    const companyValue = document.getElementById("companyValue").value;
    addRound(investorPercent, companyValue);
    offLoad();
}

function onLoad() {
    const element = document.getElementById("loading");
    element.classList.add("spinner-grow");
    element.classList.add("spinner-grow-sm");
}

function offLoad() {
    const element = document.getElementById("loading");
    element.classList.remove("spinner-grow");
}