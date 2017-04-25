function fearNotLetter(str) {
   var len = str.length;
    var start = str.charCodeAt(0);
    var end = str.charCodeAt(len - 1);
    var arr = [];
    for (var i = start, j = 0; i <= end; i++, j++) {
        if (str[j] != String.fromCharCode(i)) {
            arr.push(String.fromCharCode(i));
            j--;
        }
    }

    if (arr.length === 0){
        return undefined;
    }
    return arr.join('');
}
