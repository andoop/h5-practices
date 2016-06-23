/**
 * Created by hyh_1 on 2016/6/10.
 */
var express=require("express");
var router=express.Router();
var logic=require("../logic/andoop_logic");

router.get("/login",logic.login);
router.post("/",logic.index);
router.get('/register',logic.register);
router.post('/register',logic.register_post);

module.exports=router;