/**
 * Created by 黄洞洞 on 2016/6/10.
 */
var app=require("../app");
var http=require("http");
var server=http.createServer(app);
server.listen(3000);
