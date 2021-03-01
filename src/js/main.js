import {analyze} from './lib';

const el = document.getElementById("analyze");
el.addEventListener("click", render, false);

async function render() {
    onLoad();
    const blogName = document.getElementById("blogName").value;
    const accessToken = document.getElementById("accessToken").value;
    const dateCounts = await analyze(accessToken, blogName);
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