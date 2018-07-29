var express = require('express');
var db = require('./db');
var app = express();
var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({extended: false});
app.use(express.static(__dirname + '/build'));
/**
 * 设置跨域访问
 */
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
/**
 * 返回打包后的bundle
 */
app.get('/',(req,res)=>{
    //res.sendFile(__dirname + '/build/index.html');
});
/**
 * 添加新博客到数据库
 */
app.post('/add_blog',urlencodeParser,(req,res)=>{
    let params = [
        req.body.title,
        req.body.content,
        req.body.label,
        req.body.type,
        req.body.classify,
        req.body.isPrivate,
        req.body.createTime,
        req.body.isPublish
    ];
    let sql = 'INSERT blogs(title,content,label,type,classify,isPrivate,createTime,isPublish) VALUES(?,?,?,?,?,?,?,?)';
    db.DBConnection.query(sql,params,(err,rows,fields)=>{
        if(err){
            console.log(err);
            return;
        }
        let success = {
            message: '新建博客成功！'
        };
        console.log('success');
        res.send(success);
    });
});
/**
 * 查询博客信息
 */
app.post('/query_blog',urlencodeParser,(req,res)=>{
    let sql = 'SELECT * FROM blogs';
    db.DBConnection.query(sql,(err,rows,fields)=>{
        if(err){
            console.log(err);
            return;
        }
        res.send(rows);
    });
});
/**
 * 删除博客，删除成功后立即查询数据库并返回最新的数据库信息
 */
app.post('/delete_blog',urlencodeParser,(req,res)=>{
    //单个博客删除
    let sql = 'DELETE  FROM blogs WHERE id=' + req.body.data;
    if(req.body.data.length > 1){
        //多个博客删除
        sql = 'DELETE  FROM blogs WHERE id in (' + req.body.data +  ')';
    }
    db.DBConnection.query(sql,(err,rows,fields)=>{
        if(err){
            console.log(err);
            return;
        }
        console.log('delete success');
        let str = 'SELECT * FROM blogs';
        db.DBConnection.query(str,(err,rows,fields)=>{
            if(err){
                console.log(err);
                return;
            }
            console.log('query success');
            res.send(rows);
    });
    });
    
});
/**
 * 监听9000端口
 */
app.listen(9000,()=>{
    console.log('正在监听port：9000');
});