function gcd(val1, val2) {
    if (val1 % val2 === 0) {
        return val2;
    } else {
        return gcd(val2, val1 % val2);
    }
}
