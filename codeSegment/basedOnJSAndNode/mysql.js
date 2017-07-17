const mysql = require('mysql');

const mysql_config = {
    host: 'xxx',
    user: 'xxx',
    password: 'xxx',
    database: 'xxx',
    port: 3306,
};

const query = (sql, params) => {
    return new Promise((resolve, reject) => {
        let connection = mysql.createConnection(mysql_config);
        connection.connect(function(err) {
            if (err) {
                return reject({ code: 1, message: '数据库连接失败，请检查网络！' });
            }
            connection.query(sql, params, function(err, rows, filter) {
                connection.end();
                if (err) {
                    return reject({ code: 1, message: '数据库查询失败，请检查网络！' });
                }
                resolve(rows);
            });
        });
    });
}
