
 var mongoose=require("mongoose");
 
 var dburl="mongodb://localhost/andoop";
 var schema=mongoose.Schema;
//用户表
 var users=new schema({
     name:String,
     password:String

 });
 var UsersModel=mongoose.model("user",users);
 //评论表
 var comments=new schema({
     article_id:String,
     commener_id:String,
     comment_content:String,
     comment_date:{
         type:Date,
         default:Date.now
     }
 });
 var CommentsModel=mongoose.model("comment",comments);
 //文章表
 var articles=new schema({
     user_id:String,
     content:String,
     article_date:{
         type:Date,
         default:Date.now
     }
 });
var ArticlesModel=mongoose.model("article",articles);
 

 //链接数据库
 exports.connect_db=function (callback) {
     mongoose.connect(dburl,function (error) {
         if(error){
             callback(error);
         }else {
             callback(null);
         }
     });
 };
 //断开连接
 exports.disconnect_db=function (callback) {
     mongoose.disconnect(function (error) {
         if(error){
             callback(error);
         }else {
             callback(null);
         }
     });
 };
 //添加文章
 exports.addArticle=function (content,user_id,callback) {
     var article=new ArticlesModel();
     article.content=content;
     article.user_id=user_id;
     article.save(function (error) {
        callback(error,article._id);
     });
 };
 //添加评论
 exports.addComment=function (comment_content,commener_id,article_id,callback) {

     var comment=new CommentsModel();
     comment.article_id=article_id;
     comment.comment_content=comment_content;
     comment.commener_id=commener_id;
     comment.save(function (error) {
         callback(error,comment._id);
     });
     
 };
 //添加用户
 exports.addUser=function (user_name,password,callback) {
     var user=new UsersModel();
     user.name=user_name;
     user.password=password;
     user.save(function (error) {
         callback(error,user._id);
     });
 };
 //通过名字获取一个用户
 exports.findOndByName=function (user_name,callback) {
     UsersModel.findOne({name:user_name},function (err,data) {
         callback(err,data);
     })
 };

exports.delete=function(module,mid,callback){
     switch (module){
         case "user"://删除用户
             break;
         case "comment"://删除评论
             CommentsModel.findOne({_id:mid},function (err,data) {
                 callback(err);
                 if(data){
                     data.remove();
                 }
             });
             break;
         case "article"://删除文章
             ArticlesModel.findOne({_id:mid},function (err,data) {
                 callback(err);
                 if(data){
                     data.remove();
                 }
             });
             break;
     }
 };