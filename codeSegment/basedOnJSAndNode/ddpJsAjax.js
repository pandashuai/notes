function ddpJsAjax(options) {
    var xhr;
    function ddpJsAjax(opt) {
        opt = Object.assign({
            url: "",
            type: 'GET',
            data: '',
            async: true,
            dataType: false,
            success: function(data) {

            },
            error: function(err) {

            },
            //进度条(progress)
            progress: function(err, number, evt) {

            }
        }, opt);

        if (!opt.url) {
            return console.error('not url param');
        }

        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function() {
            if (xhr.status == 200 && xhr.readyState == 4) {
                opt.success(xhr.responseText);
            } else if (xhr.status != 200 && xhr.readyState == 4) {
                opt.error(xhr.responseText, xhr);
            }
        }

        xhr.upload.addEventListener("progress", function(evt) {
            if (evt.lengthComputable) {
                var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                opt.progress(false, percentComplete, evt);
            } else {
                opt.progress(true, null, null);
            }
        }, false);

        try {
            xhr.open(opt.type, opt.url, opt.async);
        } catch (e) {
            return console.log(e);
        }
        if (opt.dataType) {
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
        }
        // xhr.setRequestHeader("Content-type","application/json; charset=utf-8");
        if (opt.type.toLocaleLowerCase() == 'get') {
            xhr.send();
        } else {
            xhr.send(typeof(opt.data) == 'object' ? JSON.stringify(opt.data) : opt.data);
        }
    };

    ddpJsAjax.prototype.done = function(doneCallback) {
        xhr.onreadystatechange = function() {
            if (xhr.status == 200 && xhr.readyState == 4) {
                doneCallback(xhr.responseText);
            }
        }
        return this;
    };
    ddpJsAjax.prototype.progress = function(progressCallback) {
        xhr.upload.addEventListener("progress", function(evt) {
            if (evt.lengthComputable) {
                var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                progressCallback(false, percentComplete, evt);
            } else {
                progressCallback(true, null, null);
            }
        }, false);
        return this;
    };
    ddpJsAjax.prototype.error = function(errorCallback) {
        xhr.onreadystatechange = function() {
            if (xhr.status != 200 && xhr.readyState == 4) {
                errorCallback(xhr.statusText, xhr);
            }
        }
        return this;
    };
    return new ddpJsAjax(options);
}
