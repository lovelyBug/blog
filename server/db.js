var mysql = require('mysql');
var DBConnection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "blog",
    multipleStatements: true
});
DBConnection.connect((err)=>{
    /**连接出错的处理 */
    if(err){
        console.err('error connecting: ' + err.stack);
    }
});
module.exports.DBConnection = DBConnection;