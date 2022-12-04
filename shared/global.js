'use strict';

const  _ = require('lodash');


function getLimit() {
    return 10;
}

function getCustomLabels() {
    return {
        totalDocs: 'itemCount',
        docs: 'data',
        limit: 'perPage',
        page: 'currentPage',
        nextPage: 'next',
        prevPage: 'prev',
        totalPages: 'pageCount',
        pagingCounter: 'slNo',
        meta: 'paginator',
    }
}

function cloneObject(object) {
    return _.clone(object);
}

module.exports = {
    getLimit,
    getCustomLabels,
    cloneObject
}