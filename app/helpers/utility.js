exports.randomNumber = function (length) {
    var text = "";
    var possible = "123456789";
    for (var i = 0; i < length; i++) {
        var sup = Math.floor(Math.random() * possible.length);
        text += i > 0 && sup == i ? "0" : possible.charAt(sup);
    }
    return Number(text);
};

exports.paginateResults = function (page, results) {
    const page_count = Math.ceil(results.length / 10);
    const total_count = results.length;

    let page_num = parseInt(page);

    if (!page_num) {
        page_num = 1;
    }

    if (page_num > page_count) {
        page_num = page_count
    }

    let resultsSliced = results.slice(page_num * 10 - 10, page_num * 10)

    var pagination = {
        page: page_num,
        page_count: page_count,
        total_count: total_count,
    }

    return { paginatedData: resultsSliced, paginationInfo: pagination };
}
