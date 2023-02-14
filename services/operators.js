function reset () {
    count = 0;
    return count;
}

function add (count, valor) {
    return parseFloat(count)+parseFloat(valor);
}

function sub (count, valor) {
    return parseFloat(count)-parseFloat(valor);
}

module.exports = { reset, add, sub }