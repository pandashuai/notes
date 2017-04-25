function permAlone(str) {
    var arr = str.split("");
    var perarr = [];
    //创建正则，如果字符串全重复，则直接return 0
    var reg = /(.)\1+/g;
    if (str.match(reg) !== null && str.match(reg)[0] === str) {
        return 0;
    }

    //用于交换的函数
    function swap(idx1, idx2) {
        var temp = arr[idx1];
        arr[idx1] = arr[idx2];
        arr[idx2] = temp;
    }
    //如果begin到了最后一个字符，可以将这个字符串加入到全排列数组中了
    function permall(arr, begin) {
        if (begin == arr.length - 1) {
            perarr[perarr.length] = arr.join("");
            return;
        }
        for (var i = 0;
            (i + begin) < arr.length; i++) {
            swap(begin, begin + i);
            permall(arr, begin + 1);
            swap(begin, begin + i);
        }
    }

    permall(arr, 0);

    //返回相邻不重复的数量
    return perarr.filter(function(val) {
        return !val.match(reg);
    }).length;
}
