var data = {};

function setData (key, value){
    data[key] = value;
}
function getData (key) {  
    return data[key];
}

exports.set = setData;
exports.get = getData;