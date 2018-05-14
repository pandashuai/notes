// 设计一个收银程序 checkCashRegister() ,其把购买价格(price)作为第一个参数 , 付款金额 (cash)作为第二个参数, 和收银机中零钱 (cid) 作为第三个参数.
function checkCashRegister(price, cash, cid) {
    // 刚刚好
    if (price == cash) {
        return "No Need Back";
    }

    // 付款不足
    if (price > cash) {
        return "Need More Money";
    }

    var base = 100; //金额基数
    var change = (cash - price) * base; //找零

    //定义一个函数，用来求零钱和。
    var getTotalMoney = function(arr) {
        var totalMoney = 0;
        arr.reduce(function(preV, currV, currIndex, array) {
            totalMoney += base * (preV[1] + currV[1]);
            return currV;
        }); //叠代算法：求零钱之和。
        return totalMoney;
    };

    //余额不足，没法找了
    var remain = getTotalMoney(cid);

    if (remain == change) { //如果零钱数等于应找数额，返回closed
        return "Closed";
    } else if (remain < change) { //没钱找了
        return "Insufficient Funds";
    }


    // 对应：1角-5角-1元-5元-10元-20元-50元-100元(以元为单位的基础上乘以面值基数：base这里为100)
    var dollar = [1, 5, 10, 25, 100, 500, 1000, 2000, 10000];  
    var pay = {}; //保存的key：dollar中面值索引，value：要找的此面值的个数
    var currLast = 0; // 当前面值所剩余额
    var currMoney = 0; //当前金钱面额(dollar中对应的值)
    for (var i = dollar.length - 1; i >= 0; i--) { //由大到小循环
        //当前面值剩余金额
        currLast = cid[i][1] * base;
        if (currLast <= 0) {
            continue; //当前面值的金额剩余0，跳过
        }

        //当前金额面值
        currMoney = dollar[i];
        // 在当前面值下取钱必须同时满足两个条件：
        // 1. 找零必须大于当前面值，比如找零51元，才可以从50里面取钱。
        // 2. 剩余的当前面值的总额足够，比如找4元，但我只有3张1元，就不符合取钱条件
        if (change > currMoney) { //如果当前金额面值小于应找钱数
            if (change < currLast) {
                // 找零小于当前面值剩余金额：比如找钱51元，当前50面值总额余额还有150元。
                pay[i] = Math.floor(change / currMoney); //取最大张数
                change -= currMoney * pay[i]; //取完之后从应找余额中减去（张数x面值）
            } else {
                // 找零大于当前面值剩余金额，比如找零51元，我50元面额总值只有50元
                // 则将所有剩余金额找出
                pay[i] = Math.floor(currLast / currMoney);
                change -= currLast; //就直接减去当前面值剩余所有金额
            }
        }
    } //循环结束之后得到一个pay对象，里面包括了面值和对应应找的钱。


    var res = [];
    // 组织最后需要找零的钱，作为最终返回的数组。
    var keys = Object.keys(pay); //找到pay对象
    var idx = 0;
    var total = 0; //应找零钱（pay）的总额
    for (var j = 0; j < keys.length; j++) {
        // 需要找零的面值索引：比如100，50，20,10...等等
        idx = parseInt([keys[j]]);

        //计算该面值最后找出的零钱(公式：面值x需要找出数量 / 金钱面值基数)
        cid[idx][1] = dollar[idx] * pay[keys[j]] / base;

        res.unshift(cid[idx]); //把结果添加到数组的开头。符合由面值大到小的规律。

        total += dollar[idx] * pay[keys[j]];
        // 顺便计算下这里计算的结果应该和最开始需要找零的金额一致：
        // 面值x需要找出数量——返回到total结果中
    }

    // 找到最后，所有能找的面值加起来还不够
    // 这里与最开始不同，这里是过滤掉了所有找不开的面值
    // 比如：要找0.05元，但是目前剩余一张0.01和1元的面值，依旧判定为找不开
    // 而最开始的是所有余额加起来都不够找
    if (total < change) {
        return "Insufficient Funds";
    }
    return res;
}
