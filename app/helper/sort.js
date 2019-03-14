let func = require('./compare');

async function sort(arr, attrname) {
    if (arr.length < 2) {
        return arr;
    } else  if (arr.length == 2) {
        let comparison = func.compare(arr[0], arr[1], attrname);
        // console.log(comparison);
        if (comparison > 0) {
            let a = arr[0];
            arr[0] = arr[1];
            arr[1] = a;
        }
        return arr;
    } else {
        let left = [], right = [], equal = [];
        let pivot = arr[0];
        for(let i=0; i<arr.length; i++) {
            let comparison = func.compare(pivot, arr[i], attrname);
            // console.log(comparison);
            if(comparison < 0) {
                right.push(arr[i]);
            } else if (comparison > 0) {
                left.push(arr[i]);
            } else {
                equal.push(arr[i]);
            }
        }

        let result = await sort(left, attrname);
        result = result.concat(equal);
        result = result.concat(await sort(right, attrname));

        return result;
    }
}


module.exports = {
    sort
};
