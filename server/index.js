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
        req.body.isPublish,
        req.body.isDelete
    ];
    let sql = 'INSERT blogs(title,content,label,type,classify,isPrivate,createTime,isPublish,isDelete) VALUES(?,?,?,?,?,?,?,?,?)';
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
 * 查询已经发布的博客信息
 */
app.post('/query_blog',urlencodeParser,(req,res)=>{
    let sql = 'SELECT * FROM blogs WHERE isPublish=1 AND isDelete=0';
    //根据传来的req，判断是否为多重查询
    if(req.body.data !== 'all'){
        sql = 'SELECT * FROM blogs WHERE isDelete=0 AND isPublish=1 AND id=' + req.body.data;
    }
    
    db.DBConnection.query(sql,(err,rows,fields)=>{
        if(err){
            console.log(err);
            return;
        }
        res.send(rows);
    });
});
/**
 * 查询未发布的博客信息
 */
app.post('/query_unpublish_blog',urlencodeParser,(req,res)=>{
    let sql = 'SELECT * FROM blogs WHERE isPublish=0 AND isDelete=0';
    
    db.DBConnection.query(sql,(err,rows,fields)=>{
        if(err){
            console.log(err);
            return;
        }
        res.send(rows);
    });
});
/**
 * 查询已经放入回收站里的博客
 */
app.post('/query_delete_blog',urlencodeParser,(req,res)=>{
    let sql = 'SELECT * FROM blogs WHERE isDelete=1';
    
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
    let sql = 'UPDATE blogs SET isDelete=1 WHERE id=' + req.body.data;
    if(req.body.data.length > 1){
        sql = 'UPDATE blogs SET isDelete=1 WHERE id in (' + req.body.data +  ')';
    }
    db.DBConnection.query(sql,(err,rows,fields)=>{
        if(err){
            console.log(err);
            return;
        }
        console.log('delete success');
        let str = 'SELECT * FROM blogs WHERE isDelete=0 AND isPublish=' + req.body.isPublish;
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
 * 彻底删除博客
 */
app.post('/delete_blog_clearly',urlencodeParser,(req,res)=>{
    let sql = 'DELETE  FROM blogs WHERE id=' + req.body.data;
    if(req.body.data.length > 1){
        sql = 'DELETE  FROM blogs WHERE id in (' + req.body.data +  ')';
    }
    db.DBConnection.query(sql,(err,rows,fields)=>{
        if(err){
            console.log(err);
            return;
        }
        console.log('delete success');
        let str = 'SELECT * FROM blogs WHERE isDelete=1';
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
 * 修改博客信息
 */
app.post('/modify_blog',urlencodeParser,(req,res)=>{
    let sql = `UPDATE blogs SET title='${req.body.title}',content='${req.body.content}',label='${req.body.label}',type='${req.body.type}',classify='${req.body.classify}',isPrivate='${req.body.isPrivate}' WHERE id=${req.body.id}`;
    db.DBConnection.query(sql,(err,rows,fields)=>{
        if(err){
            console.log(err);
            return;
        }
        let success = {
            message: '修改博客成功！'
        };
        console.log('success');
        res.send(success);
    });
});
/**
 * 还原博客，删除成功后立即查询数据库并返回最新的数据库信息
 */
app.post('/restore_blog',urlencodeParser,(req,res)=>{
    let sql = 'UPDATE blogs SET isDelete=0 WHERE id=' + req.body.data;
    if(req.body.data.length > 1){
        sql = 'UPDATE blogs SET isDelete=0 WHERE id in (' + req.body.data +  ')';
    }
    db.DBConnection.query(sql,(err,rows,fields)=>{
        if(err){
            console.log(err);
            return;
        }
        console.log('delete success');
        let str = 'SELECT * FROM blogs WHERE isDelete=1';
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
 * 添加新评论到数据库
 */
app.post('/add_comment',urlencodeParser,(req,res)=>{
    let params = [
        req.body.userName,
        req.body.commentText,
        req.body.email,
        req.body.createTime,
        req.body.blogID
    ];
    let sql = 'INSERT comments(userName,commentText,email,createTime,blogID) VALUES(?,?,?,?,?)';
    db.DBConnection.query(sql,params,(err,rows,fields)=>{
        if(err){
            console.log(err);
            return;
        }
        let str = 'SELECT * FROM comments WHERE blogID=' + req.body.blogID;
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
 * 查询所有评论
 */
app.post('/query_comment',urlencodeParser,(req,res)=>{
    let sql = 'SELECT * FROM comments WHERE blogID=' + req.body.blogId;
    db.DBConnection.query(sql,(err,rows,fields)=>{
        if(err){
            console.log(err);
            return;
        }
        res.send(rows);
    });
});
/**
 * 监听9000端口
 */
app.listen(9000,()=>{
    console.log('正在监听port：9000');
});