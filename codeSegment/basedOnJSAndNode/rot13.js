function rot13(str) { // LBH QVQ VG!
    str = str.toLocaleUpperCase().split('');
    var key = 13;
    var valArr = str.map(function(val) {
        if (!/[A-Z]/.test(val)) {
            return val;
        }
        val = val.charCodeAt(0) + key;

        if(val > 90 ){
            val = val - 26;
        }

        return String.fromCharCode(val);

    });

    return valArr.join('');
}
