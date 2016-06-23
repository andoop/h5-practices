/**
 * Created by hyh_1 on 2016/6/10.
 */
var db=require("../db/dbDao");
exports.login=function (req,res,next) {
    res.render("login.ejs",{result:0});
};

exports.index=function (req,res,next) {
    var username=req.body.username;
    var password=req.body.password;
    if(username){
        db.findOndByName(username,function (err,data) {
           if(data){
               //判断密码
               if(data.password==password){
                   //密码相等，进入首页
                   res.render("index.ejs",{});
               }else {
                   //密码不同，返回并提示
                   res.render("login.ejs",{result:1});
               }
           }else {
               if(err)
                 console.log(err);
               else{
                   res.render("login.ejs",{result:2});
                   console.log("用户不存在");
               }
           }
        });
    }else {
        res.render("login.ejs",{result:3});
    }
};
exports.register=function (req,res,next) {
    res.render('register.ejs',{result:4});
};
exports.register_post=function (req,res,next) {
    
    var username= req.body.username;
    var pass=req.body.password;
    var repass=req.body.repassword;
    if(username){
         db.findOndByName(username,function (err,data) {
             if(data){
                 //用户存在了
                 res.render('register.ejs',{result:1});
             }else {
                 //比较两次密码
                 if(pass==repass){
                     db.addUser(username,pass, function (err,use_id) {
                         if(err){
                             console.error(err);
                         }else {
                             res.render('register.ejs',{result:0});
                         }
                     });
                    
                     
                 }else {
                     //两次输入不一样了
                     res.render('register.ejs',{result:2});
                 }
             }
         })
    }else {
        //用户名为空了
        res.render('register.ejs',{result:3});
    }
};