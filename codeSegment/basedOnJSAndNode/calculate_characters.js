/**
  msg: 计算字符
  param:<string>
  return:<number>
  例子：
  getCode('?+1=2') // 1
  getCode('2*?=6') // 3
  getCode('8/4=?') // 2
*/

var getCode = function(str){
    try{
        var one, two, three, fuhao, result;
        // 去除空格
        str = str.replace(/\s/g, '');

        if(str.indexOf('=') == '-1'){
            return false;
        }
        if(str.indexOf('?') == '-1'){
            return false;
        }
        // 将运算号取出来
        fuhao = str.indexOf('+') != '-1' ? '+' : ( str.indexOf('-') != '-1'?  '-' : ( str.indexOf('*') != '-1' ? '*' :  (str.indexOf('/') != '-1' ? '/' : false ) ) )
        if(fuhao === false){
            return fuhao;
        }
        one = str.split(fuhao)[0];
        two = str.split(fuhao)[1].split('=')[0];
        three = str.split('=')[1];
        if(one === '?'){
            fuhao = fuhao == '+' ? '-' : ( fuhao == '-' ? '+' : ( fuhao == '*' ? '/' : '*') );
            result = eval('('+ Number(three) +  fuhao + Number(two) +')');
        }else if(two === '?'){
            if(fuhao == '-' || fuhao == '/'){
                three = Number(one) + Number(three);
                one = Number(three) - Number(one);
                three = Number(three) - Number(one);
            }
            fuhao = fuhao == '+' || fuhao == '-' ? '-' : '/';
            result = eval('('+ Number(three) +  fuhao + Number(one) +')');
        }else if(three === '?'){
            result = eval('('+ Number(one) + fuhao + Number(two) +')');
        }
        return result != 'Infinity' ? result: false;
    }catch(e){
        return false;
    }
    return false;
}
