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
        } param 
 */
// 数组转树型结构
function toTreeData(dataArr, param) {
    var treeArr = [];
    for (var i = 0; i < dataArr.length; i++) {
        if (dataArr[i][param.parentId] == param.rootId) {
            var obj = {};
            obj[param.id] = dataArr[i][param.id];
            obj[param.name] = dataArr[i][param.name];
            obj.children = [];
            treeArr.push(obj);
            dataArr.splice(i, 1);
            i--;
        }
    }

    function createChildren(childArr) {
        if (dataArr.length !== 0) {
            for (var i = 0; i < childArr.length; i++) {
                for (var j = 0; j < dataArr.length; j++) {
                    if (childArr[i][param.id] == dataArr[j][param.parentId]) {
                        var obj = {};
                        obj[param.id] = dataArr[j][param.id];
                        obj[param.name] = dataArr[j][param.name];
                        obj.children = [];
                        childArr[i].children.push(obj);
                        dataArr.splice(j, 1);
                        j--;
                    }
                }
                createChildren(childArr[i].children);
            }
        }
    }
    createChildren(treeArr);
    return treeArr;
}
