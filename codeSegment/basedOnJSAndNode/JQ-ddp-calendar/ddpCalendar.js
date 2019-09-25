/*
 * @Author: 邓登攀 
 * @Date: 2019-09-25 09:11:11 
 * @Plugin: 基于jq的日历展现
 * @Last Modified by: 邓登攀
 * @Last Modified time: 2019-09-25 17:08:48
 */


(function ($) {
    function DdpCalendar(opt) {
        if (!opt) opt = {};
        if (opt.date) {
            var _dateRep = /^[0-9]{4}(\/|-)[0-9]?[0-9](\/|-)[0-9]?[0-9]$/;
            if (!_dateRep.test(opt.date)) {
                throw new Error('日期格式错误,格式为：YYYY-MM-DD/YYYY-M-D')
            }
            opt.date = this.formatArr(opt.date)
        } else {
            opt.date = this.formatArr(new Date())
        }
        if (!opt.el) throw new Error('元素ID未填！');
        if (!opt.changeDate) opt.changeDate = function (cudate) { };
        this.el = $(opt.el);
        this._date = opt.date;
        this.changeDate = opt.changeDate;
        this.setPrevAndCuAndNextDate(opt.date);
        // 默认星期一开始
        this.weekIndex = Number(opt.weekIndex) || 1;
        if (this.weekIndex <= 0 || this.weekIndex > 7) {
            this.weekIndex = 7
        }
        // 生成元素
        this.createEl('one');
        // 监听元素事件
        this.listenEl();
    }
    DdpCalendar.prototype.formatArr = function (dateOrdateStr) {
        var _formatDate = false;
        dateOrdateStr = dateOrdateStr || new Date();
        if (typeof (dateOrdateStr) === 'string') {
            dateOrdateStr = dateOrdateStr.replace(/-/g, '/');
            _formatDate = new Date(dateOrdateStr);
        } else {
            _formatDate = dateOrdateStr
        };
        var _formatYYYY = _formatDate.getFullYear();
        var _formatMM = _formatDate.getMonth() + 1;
        _formatMM = _formatMM > 9 ? _formatMM : ('0' + _formatMM);
        var _formatDD = _formatDate.getDate();
        _formatDD = _formatDD > 9 ? _formatDD : ('0' + _formatDD);
        return [_formatYYYY, _formatMM, _formatDD];
    }
    DdpCalendar.prototype.getMonthDay = function (dateArr) {
        var _mdDate = new Date(dateArr[0], dateArr[1], 0);
        return _mdDate.getDate();
    }
    DdpCalendar.prototype.getWeekDay = function (dateArr) {
        var _weekDayDate = new Date(dateArr.join('/'));
        return _weekDayDate.getDay() || 7;
    }
    DdpCalendar.prototype.setPrevAndCuAndNextDate = function (dateArr) {
        this.cuDate = dateArr;
        this.prevDate = this.getPrevMonth(dateArr);
        this.nextDate = this.getNextMonth(dateArr);
    }
    DdpCalendar.prototype.getPrevMonth = function (dateArr) {
        var _prevDate = new Date(dateArr.join('/'));
        console.log('_prevDate.getMonth(): ', _prevDate.getMonth());
        _prevDate.setDate(1);
        _prevDate.setMonth(_prevDate.getMonth() - 1);
        _prevDate = this.formatArr(_prevDate);
        var _maxDay = this.getMonthDay(_prevDate);
        _prevDate[2] = _maxDay;
        console.log('_prevDate: ', _prevDate);
        return _prevDate;
    }
    DdpCalendar.prototype.getNextMonth = function (dateArr) {
        dateArr = dateArr || this.cuDate;
        var _nextrevDate = new Date(dateArr.join('/'));
        _nextrevDate.setDate(1);
        _nextrevDate.setMonth(_nextrevDate.getMonth() + 1);
        _nextrevDate = this.formatArr(_nextrevDate);
        _nextrevDate[2] = 1;
        return _nextrevDate;
    }
    DdpCalendar.prototype.getFullDateArr = function () {
        var _fullDate = [];
        var _cuDateDay = this.getMonthDay(this.cuDate);
        var _weekDay = this.getWeekDay([this.cuDate[0], this.cuDate[1], 1]);
        var _dateTotal = 42;
        var _pNum = _weekDay - this.weekIndex;
        // 补全选中月的前面部分
        var _tmpDateArr = []
        for (var pdate = this.prevDate[2]; pdate > (this.prevDate[2] - _pNum); pdate--) {
            var _pdate1 = pdate > 9 ? pdate : ('0' + pdate);
            _tmpDateArr.push([this.prevDate[0], this.prevDate[1], _pdate1])
        }
        _fullDate = _tmpDateArr.reverse();
        // 选中月
        for (var cdate = 1; cdate <= _cuDateDay; cdate++) {
            var _cdate1 = cdate > 9 ? cdate : ('0' + cdate);
            _fullDate.push([this.cuDate[0], this.cuDate[1], _cdate1])
        }
        // 补全选中月的后面部分
        var _nNum = _dateTotal - _cuDateDay - _pNum;
        for (var ndate = 1; ndate <= _nNum; ndate++) {
            var _ndate1 = ndate > 9 ? ndate : ('0' + ndate);
            _fullDate.push([this.nextDate[0], this.nextDate[1], _ndate1])
        }
        return _fullDate;

    }
    DdpCalendar.prototype.getCuOneLineDateArr = function () {
        var _oneLineDate = [];
        var _weekDay = this.getWeekDay(this.cuDate);
        var _dateTotal = 7;
        var _pNum = _weekDay - this.weekIndex;
        var _index = 0;
        var _tmpDateArr = [];
        var _tmpDateTxt = this.cuDate.join('/');
        // 补全选中月的前面部分
        while (_pNum !== _index) {
            var _date = new Date(_tmpDateTxt)
            _date.setDate(_date.getDate() - 1);
            _date = this.formatArr(_date);
            _tmpDateArr.push(_date);
            _tmpDateTxt = _date.join('/');
            _index++;
        }
        _oneLineDate = _tmpDateArr.reverse();
        _oneLineDate.push(this.cuDate);
        var _nNum = _dateTotal - _pNum - 1;
        _index = 0;
        _tmpDateTxt = this.cuDate.join('/');
        while (_nNum !== _index) {
            var _date = new Date(_tmpDateTxt)
            _date.setDate(_date.getDate() + 1);
            _date = this.formatArr(_date);
            _oneLineDate.push(_date);
            _tmpDateTxt = _date.join('/');
            _index++;
        }
        return _oneLineDate;
    }
    DdpCalendar.prototype.createEl = function (type) {
        var _this = this;
        var _weekArr = ['一', '二', '三', '四', '五', '六', '日'];
        var _total = 7;
        var _str = '<div class="ddpcalendar-box">';
        _str += '<div class="m-box">';
        _str += '<div class="m"><span>' + this.cuDate[0] + '年' + this.cuDate[1] + '月</span></div>';
        _str += '<div class="toggle">';
        _str += '<div class="ico prveM"><span class="iconfont">&#xe606;</span></div>';
        _str += '<div class="ico nextM"><span class="iconfont">&#xe606;</span></div>';
        _str += '</div>';
        _str += '</div>';
        _str += '<div class="week-box crow">';
        for (var index = (this.weekIndex - 1); index < _total; index++) {
            _str += '<div class="col">' + _weekArr[index] + '</div>';
        }
        for (var index = 0; index < (this.weekIndex - 1); index++) {
            _str += '<div class="col">' + _weekArr[index] + '</div>';
        }
        _str += '</div>';
        _str += '<div class="date-box">';


        var _dataArr = [];
        if (type === 'one') {
            _dataArr = this.getCuOneLineDateArr();
        } else if (type === 'ALL') {
            _dataArr = this.getFullDateArr();
        }

        // 分行
        var _forLineNum = _dataArr.length / _total;
        for (var cindex = 0; cindex < _forLineNum; cindex++) {
            _str += '<div class="crow">';
            // 分列
            for (var jindex = cindex * _total; jindex < (cindex * _total) + _total; jindex++) {
                var item = _dataArr[jindex];
                var _tmpIsCuDate = '';
                var _tmpIsOn = '';
                var _tmpIsNo = '';
                var _tmpcuDay = _this.formatArr();
                if (_tmpcuDay[0] === item[0] && _tmpcuDay[1] === item[1] && _tmpcuDay[2] === item[2]) {
                    _tmpIsCuDate = 'today'
                }
                if (_this._date[0] === item[0] && _this._date[1] === item[1] && _this._date[2] === item[2]) {
                    _tmpIsOn = 'on'
                }
                if (_this.cuDate[1] !== item[1]) {
                    _tmpIsNo = 'no'
                }
                _str += '<div class="col ' + _tmpIsCuDate + ' ' + _tmpIsOn + ' ' + _tmpIsNo + '" data-y="' + item[0] + '" data-m="' + item[1] + '" data-d="' + item[2] + '" data-type="' + type + '">';
                _str += '<div class="date">' + item[2] + '</div>';
                if (_tmpIsCuDate === 'today') {
                    _str += '<span>今天</span>';
                }
                _str += '</div>';
            }
            _str += '</div>';
        }
        _str += '</div>';
        _str += '<div class="note-box">';
        var _tmpIsOn = type === 'ALL' ? 'on' : '';
        _str += '<div class="ico toogleOpen ' + _tmpIsOn + '"> <span class="iconfont">&#xe606;</span></div>';
        _str += '</div>';
        _str += '</div>';
        this.el.html(_str);
    }
    DdpCalendar.prototype.listenEl = function () {
        var _this = this;
        _this.el.on('click', '.toogleOpen', function () { // 打开/收缩
            var _on = $(this).is('.on');
            if (_on === false) {
                _this.createEl('ALL');
            } else {
                _this.setPrevAndCuAndNextDate(_this._date);
                _this.createEl('one');
            }
        }).on('click', '.prveM', function () { // 上一月
            _this.setPrevAndCuAndNextDate(_this.prevDate);
            _this.createEl("ALL");
        }).on('click', '.nextM', function () { // 下一月
            _this.setPrevAndCuAndNextDate(_this.nextDate);
            _this.createEl("ALL");
        }).on('click', '.date-box .col', function () { // 选中当月
            var _y = $(this).data('y');
            var _m = $(this).data('m');
            var _d = $(this).data('d');
            var _type = $(this).data('type');
            _this._date = [_y, _m, _d];
            _this.setPrevAndCuAndNextDate(_this._date);
            _this.createEl(_type);
            _this.changeDate(_this._date)
        });
    }
    window.DdpCalendar = DdpCalendar;
})(jQuery);

