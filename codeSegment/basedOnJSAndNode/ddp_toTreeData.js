/**
 * 
 * @param [{
            "third_party_dept_id": "2",
            "dept_name": "全体教师",
            "parent_dept_id": "1"
        }, {
            "third_party_dept_id": "3",
            "dept_name": "学生成长",
            "parent_dept_id": "1"
        }, {
            "third_party_dept_id": "4",
            "dept_name": "初一年级",
            "parent_dept_id": "3"
        }, {
            "third_party_dept_id": "5",
            "dept_name": "初一（1）班",
            "parent_dept_id": "4"
        }] data 
 * @param {
            id: 'third_party_dept_id',
            parentId: 'parent_dept_id',
            name: 'dept_name',
            rootId: 1
        } attributes 
 */
// 数组转森林
function toTreeData(data, attributes) {
    var resData = data;
    var tree = [];
    for (var i = 0; i < resData.length; i++) {
        if (resData[i][attributes.parentId] == attributes.rootId) {
            var obj = {
                id: resData[i][attributes.id],
                title: resData[i][attributes.name],
                children: []
            };
            tree.push(obj);
            resData.splice(i, 1);
            i--;
        }
    }
    run(tree);

    function run(chiArr) {
        if (resData.length !== 0) {
            for (var i = 0; i < chiArr.length; i++) {
                for (var j = 0; j < resData.length; j++) {
                    if (chiArr[i].id == resData[j][attributes.parentId]) {
                        var obj = {
                            id: resData[j][attributes.id],
                            title: resData[j][attributes.name],
                            children: []
                        };
                        chiArr[i].children.push(obj);
                        resData.splice(j, 1);
                        j--;
                    }
                }
                run(chiArr[i].children);
            }
        }
    }
    return tree;
}
