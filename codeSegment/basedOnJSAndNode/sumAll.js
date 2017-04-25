function sumAll(arr) {
  var num = 0; //挑选出arr数组中较小的值，作为循环的起点  
    var i = Math.min(arr[0], arr[1]); //挑选出arr数组中较大的值，作为循环的终点  
    while (i <= Math.max(arr[0], arr[1])) {
        num += i;
        i++;
    }
    return num;
}
