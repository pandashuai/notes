"use strict";
/*
    与远程服务器(php)的api接口进行对接(With the remote server (php) api interface docking)
 */
 // 需npm install request --save (Need npm install request --save)
var request = require('request');

var api = "远程服务器(php)的api接口地址(Remote server (php) api interface address)";



// api接口(Api interface)
const getApi = (url, data, callback, session) => {
    if (typeof(data) == 'function') {
        session = callback;
        callback = data;
        data = {};
    } else {
        data = data || {};
    }

    // 为了get带有token录而定义的(In order to get with token set and defined)
    if (session) {
        data.access_token = session.access_token;
        // console.log(data.access_token);
    }



    // 为了post数据为定义的(For the post data for the definition)
    data = jsonpReturn(data);



    const options = {
        url: api + '?interface=' + url + '&params=' + JSON.stringify(data)
    };

    // console.log(options);
    // 
    // 请求接口，返回数据(Request interface, return data)
    request(options, (error, response, data) => {
        let tmpdata = null;

        if (!error && response.statusCode == 200) {
            // console.log(data);
            try {
                tmpdata = eval(data);
            } catch (e) {
                tmpdata = {
                    errCode: 502,
                    errMsg: '没有jsonpReturn方法返回！(No jsonpReturn method to return!)'
                }
            }
        } else {
            tmpdata = {
                errCode: 404,
                errMsg: '服务器没有数据返回！(The server has no data to return!)'
            }
        }
        callback(tmpdata);
    });
}

const jsonpReturn = (data) => {
    data = typeof(data) == 'string' ? JSON.parse(data) : data;

    // 远程服务器出现错误！(Remote server error!)
    if (data == null) {
        return {
            errCode: 500,
            errMsg: '网络错误！(Network Error!)'
        }
    }
    return data;
}




module.exports.getApi = getApi;
