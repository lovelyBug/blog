var express = require('express');
var app = express();
app.use(express.static(__dirname + '/build'));
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/build/index.html');
});
app.listen(3000);