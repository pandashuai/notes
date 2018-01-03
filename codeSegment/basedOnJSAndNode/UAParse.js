// ua解析
var UAParse = function(e) {
	var r = new Array;
	var outputer = '';
	if (r = e.match(/MSIE\s([^\s|]+)/gi)) {
		outputer = "Internet Explorer | "+r[0].replace('MSIE', '').split('.')[0];

	} else if (r = e.match(/FireFox\/([^\s]+)/ig)) {
		var r1 = r[0].split("/");
		outputer = "IMozilla FireFox | "+ r1[1];
	} else if (r = e.match(/Maxthon([\d]*)\/([^\s]+)/ig)) {
		var r1 = r[0].split("/");
		outputer = 'Maxthon';
	} else if (r = e.match(/UBrowser([\d]*)\/([^\s]+)/ig)) {
		var r1 = r[0].split("/");
		outputer = "UCBrowser | " +r1[1];
	} else if (r = e.match(/MetaSr/ig)) {
		outputer = '搜狗浏览器'
	} else if (r = e.match(/2345Explorer/ig)) {
		outputer = '2345王牌浏览器'
	} else if (r = e.match(/2345chrome/ig)) {
		outputer = '2345加速浏览器'
	} else if (r = e.match(/LBBROWSER/ig)) {
		outputer = '猎豹安全浏览器'
	} else if (r = e.match(/MicroMessenger\/([^\s]+)/ig)) {
		var r1 = r[0].split("/");
		outputer = "微信 | "+ r1[1].split('/')[0];
	} else if (r = e.match(/QQBrowser\/([^\s]+)/ig)) {
		var r1 = r[0].split("/");
		outputer = "QQ浏览器 | "+ r1[1].split('/')[0];
	} else if (r = e.match(/QQ\/([^\s]+)/ig)) {
		var r1 = r[0].split("/");
		outputer = "QQ浏览器 | "+r1[1].split('/')[0];
	} else if (r = e.match(/MiuiBrowser\/([^\s]+)/ig)) {
		var r1 = r[0].split("/");
		outputer = "Miui浏览器 | "+r1[1].split('/')[0];
	} else if (r = e.match(/Chrome([\d]*)\/([^\s]+)/ig)) {
		var r1 = r[0].split("/");
		outputer = "Chrome | "+r1[1].split('.')[0];
	} else if (r = e.match(/safari\/([^\s]+)/ig)) {
		var r1 = r[0].split("/");
		outputer = "Apple Safari | "+ r1[1];
	} else if (r = e.match(/Opera[\s|\/]([^\s]+)/ig)) {
		var r1 = r[0].split("/");
		outputer = "Opera | "+r[1];
	} else if (r = e.match(/Trident\/7.0/gi)) {
		outputer = "Internet Explorer 11";
	} else {
		outputer = '其它浏览器'
	}
	return outputer
}

// os解析
var OSParse = function(e) {
	var os = ''
	if (e.match(/win/ig)) {
		if (e.match(/nt 5.1/ig)) {
			os = 'Windows XP';
		} else if (e.match(/nt 6.1/ig)) {
			os = 'Windows 7';
		} else if (e.match(/nt 6.2/ig)) {
			os = 'Windows 8';
		} else if (e.match(/nt 6.3/ig)) {
			os = 'Windows 8.1';
		} else if (e.match(/nt 10.0/ig)) {
			os = 'Windows 10';
		} else if (e.match(/nt 6.0/ig)) {
			os = 'Windows Vista';
		} else if (e.match(/nt 5/ig)) {
			os = 'Windows 2000'
		} else {
			os = 'Windows';
		}
	} else if (e.match(/android/ig)) {
		os = 'Android';
	} else if (e.match(/ubuntu/ig)) {
		os = 'Ubuntu';
	} else if (e.match(/linux/ig)) {
		os = 'Linux';
	} else if (e.match(/iphone/ig)) {
		os = 'iPhone OS';
	} else if (e.match(/mac/ig)) {
		os = 'Mac OS X';
	} else if (e.match(/unix/ig)) {
		os = 'Unix';
	} else {
		os = 'Other';
	}
	return os
}

alert('当前系统为：'+OSParse(navigator.userAgent)+'  浏览器为：'+UAParse(navigator.userAgent))
