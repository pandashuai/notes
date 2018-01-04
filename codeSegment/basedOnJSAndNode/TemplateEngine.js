var TemplateEngine = function(tpl, data) {
    var re = /<%([^%>]+)?%>/g, reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,code = 'var r=[];\n',cursor = 0;
    var add = function(line, js) {
        js ? code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n' :
            code += 'r.push("' + line.replace(/"/g, '\\"') + '");\n';
        return add;
    }
    while (match = re.exec(tpl)) {
        add(tpl.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
    }
    add(tpl.substr(cursor, tpl.length - cursor));
    code += 'return r.join("");'; // <-- return the result
    return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
}

// 例子
// var template =
//     'My skills:' +
//     '<%if(this.showSkills) {%>' +
//     '<%for(var index in this.skills) {%>' +
//     '<a href="#"><%this.skills[index]%></a>' +
//     '<%}%>' +
//     '<%} else {%>' +
//     '<p>none</p>' +
//     '<%}%>';
// console.log(TemplateEngine(template, {
//     skills: ["js", "html", "css"],
//     showSkills: true
// }));
