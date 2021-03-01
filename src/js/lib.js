const axios = require('axios').default;
const {TistoryError} = require('./TistoryError');

export async function feed(accessToken, blogName) {
    const totalCount = await getTotalCount(accessToken, blogName);
    if(totalCount === 0){
        return [];
    }
    const pages = getPageParameters(totalCount);
    const dates = await Promise.all(pages.map(page => getPosts(accessToken, blogName, page)));

    return dates.flat(1);
}

export async function getTotalCount(accessToken, blogName) {
    try {
        const response = await axios.get(`https://www.tistory.com/apis/post/list?access_token=${accessToken}&output=json&blogName=${blogName}&page=1`);
        return Number.parseInt(response.data.tistory.item.totalCount);
    } catch (e) {
        const status = e.response.status;
        const message = e.response.data.tistory ? e.response.data.tistory.error_message : e.response.statusText;

        console.log(`status:${status}, message=${message}`);
        throw new TistoryError(status, message);
    }
}

export function getPageParameters(totalCount) {
    const pageCount = Math.ceil(totalCount/10);
    const pages = [];
    for (let i = 1; i <=pageCount; i++) {
        pages.push(i);
    }

    return pages;
}

export async function getPosts(accessToken, blogName, page) {
    try {
        const response = await axios.get(`https://www.tistory.com/apis/post/list?access_token=${accessToken}&output=json&blogName=${blogName}&page=${page}`);
        return response.data.tistory.item.posts.map(item => item.date)
    } catch (e) {
        const status = e.response.status;
        const message = e.response.data.tistory ? e.response.data.tistory.error_message : e.response.statusText;

        console.log(`status:${status}, message=${message}`);
        throw new TistoryError(status, message);
    }
}

export function transform(dateTime) {
    return dateTime.substr(0, 7);
}

export function groupBy(dates) {
    let result = [];
    result = dates.reduce((res, value) => {
        if (!res[value]) {
            res[value] = {
                date: value,
                count: 0,

            }
            result.push(res[value])
        }
        res[value].count++;
        return res;
    }, {});

    return (Object.values(result) || []).sort((a, b) => {
        return b.date.replace("-", "") - a.date.replace("-", "");
    });
}

export async function analyze(accessToken, blogName) {
    const dates = await feed(accessToken, blogName);
    const countedDates = groupBy(dates.map(date => transform(date)));
    const totalCount = countedDates
        .map(x => x.count)
        .reduce((prev, next) => {
            return prev + next;
        }, 0);

    return {
        totalCount: totalCount,
        dates: countedDates
    };
}



