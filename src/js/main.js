import {init, addRound} from './lib';

const el = document.getElementById("init");
el.addEventListener("click", init, false);

function init() {
    onLoad();
    const blogName = document.getElementById("blogName").value;
    const accessToken = document.getElementById("accessToken").value;
    $('#table').bootstrapTable({
        pagination: true,
        search: true,
        columns: [{
            field: 'date',
            title: '월'
        }, {
            field: 'count',
            title: '발행수'
        }],
        data: dateCounts.dates
    });
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