var fs = require('fs'),
    util = require('util'),
    path = require('path');
var fsExistsSync = require('./fsExistsSync.js')
var nwconsole = {};

var mem = 30;
var fsMan = {
    // log: {
    //     file: false,
    //     ext: ''
    // },
    info: {
        file: false,
        ext: ''
    },
    // warn: {
    //     file: false,
    //     ext: ''
    // },
    // debug: {
    //     file: false,
    //     ext: ''
    // },
    error: {
        file: false,
        ext: ''
    }
};
var log_file = null;
var mornDate = '';
var _log = function(type, args) {
    fsMan[type].ext = fsMan[type].ext || '';
    var today = formatData(false);
    var filepath = log_file + '/' + type + '/' + today + fsMan[type].ext + '.txt';
    if (!fsExistsSync(filepath)) {
        fsMan[type].file = fs.createWriteStream(filepath, { flags: 'a' });
    }
    var level = ("      " + type).slice(-5);
    fsMan[type].file.write("[" + level + ' ' + formatData(true) + "] " + util.format.apply(null, args) + '\n');

    fs.stat(filepath, function(err, stats) {
        if (err) {
            return console.log('(fileLogger.js --> err)', err);
        }
        if (mornDate != today) {
            fsMan[type].ext = '';
            mornDate = today;
        }
        if (stats.size >= mem * 1024 * 1024) {
            if (!fsMan[type].ext) {
                fsMan[type].ext = '_1';
            } else {
                fsMan[type].ext = '_' + (Number(fsMan[type].ext.replace(/_/g, '')) + 1)
            }
        }

    });

};

for (var key in fsMan) {
    (function(key) {
        nwconsole[key] = function() {
            _log(key, [].slice.apply(arguments), null);
        };
    })(key);

}

nwconsole.trace = nwconsole.assert = Function.prototype;



nwconsole.setup = function(log_file_path, emes) {
    if (emes) { mem = emes; }

    log_file = log_file_path;

    if (!fsExistsSync(log_file_path)) {
        fs.mkdirSync(log_file_path);
    }
    for (var key in fsMan) {
        if (!fsExistsSync(log_file + '/' + key)) {
            fs.mkdirSync(log_file + '/' + key);
        }
        fsMan[key].file = fs.createWriteStream(log_file + '/' + key + '/' + formatData(false) + '.txt', { flags: 'a' });
        console[key] = nwconsole[key];
    }
    mornDate = formatData(false);
};


var formatData = function(type) {

    var date = new Date();
    var Y = date.getFullYear();
    var M = date.getMonth() + 1;
    var D = date.getDate();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();

    var time = Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s;
    var dateTime = Y + '-' + M + '-' + D;

    return type ? time : dateTime;
}



module.exports = nwconsole;
