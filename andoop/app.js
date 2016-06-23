/**
 * Created by hyh_1 on 2016/6/10.
 */
var express=require("express");
var path = require('path');
var app=express();
var db=require("./db/dbDao");
var router=require("./router/andoop_router");
var bodyParser = require('body-parser');

db.connect_db(function (error) {
    
    if(error){
        console.log(error);
    }
});

//添加body中间件要在添加router之前
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//关联路由
app.use(router);

module.exports=app;