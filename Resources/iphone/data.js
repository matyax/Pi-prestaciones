function setData(key, value) {
    data.key = value;
}

function getData() {
    return data.key;
}

var data = {};

exports.set = setData;

exports.get = getData;