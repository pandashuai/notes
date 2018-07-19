// url: 网址
// 将url的参数转成json格式

function getUrlParamToJson(url) {
    var opt = {};
    (url || '').replace(/[?&]([^=]+)\=([^&#]*)/g, function(_, key, val) {
        if (opt[key]) {
            opt[key] = [].concat(opt[key], val)
        } else {
            opt[key] = val;
        }
    });
    return opt;
}
