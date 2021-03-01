import {
    transform,
    groupBy,
    getPageParameters,
    getTotalCount,
    getPosts
} from "./lib";

const axios = require("axios")

describe('페이지 수가 배열에 담긴다.', () => {
    it('전체 글이 38개면 [1,2,3,4]가 반환된다', () => {
        const result = getPageParameters(38);

        expect(result).toStrictEqual([1,2,3,4]);
    });

    it('전체 글이 40개면 [1,2,3,4]가 반환된다', () => {
        const result = getPageParameters(40);

        expect(result).toStrictEqual([1,2,3,4]);
    });

    it('전체 글이 41개면 [1,2,3,4,5]가 반환된다', () => {
        const result = getPageParameters(41);

        expect(result).toStrictEqual([1,2,3,4,5]);
    });
});

test('tistory의 전체 글 수를 가져온다', async () => {
    const totalCount = 181;
    axios.get = jest.fn().mockResolvedValue({
        data: {
            "tistory": {
                "status": "200",
                "item": {
                    "totalCount": totalCount
                }
            }
        }
    })

    const result = await getTotalCount("testToken", "jojoldu", 1);

    expect(result).toBe(totalCount);
});

test('tistory의 첫번째 페이지 목록을 가져온다', async () => {
    axios.get = jest.fn().mockResolvedValue({
        data: {
            "tistory": {
                "status": "200",
                "item": {
                    "posts": [
                        {
                            "date": "2018-06-01 17:54:28"
                        }
                    ]
                }
            }
        }
    })

    const result = await getPosts("testToken", "jojoldu", 1);

    expect(result.length).toBe(1);
});

test('일시를 yyyy-MM으로 변환한다.',  () => {
    const result = transform("2021-01-01 19:02:10");

    expect(result).toBe("2021-01");
});

test("월별 count가 반환된다",  () => {
    const result = groupBy(["2021-02", "2021-01", "2021-01"]);

    expect(result[0].date).toBe("2021-02");
    expect(result[0].count).toBe(1);

    expect(result[1].date).toBe("2021-01");
    expect(result[1].count).toBe(2);
});

test("월별 역순 정렬된다",  () => {
    const result = groupBy(["2021-01", "2021-01", "2021-02"]);

    expect(result[0].date).toBe("2021-02");
    expect(result[1].date).toBe("2021-01");
});