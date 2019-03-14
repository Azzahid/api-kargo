function compare(el1, el2, attrname) {
    // console.log(el1[attrname]+" "+el2[attrname]);
    if (el1[attrname] > el2[attrname]) {
        return 1;
    } else if (el1[attrname] < el2[attrname]) {
        return -1
    } else {
        return 0;
    }
}

module.exports = {compare}