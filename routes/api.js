var express = require('express');
var router = express.Router();
var vaild = require('../core/vaild');
var dbcon = require('../core/dbconnect');
var mysqlcon = require('../core/mysqlcon');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require('fs');
var csv = require('csv');
var book_define = {
		id     : Number,
		bo_type   : String,
		bo_name   : String,
		bo_press  : String,
		bo_year   : String,
		bo_author : String,
		bo_price  : Number,
		bo_sum    : Number,
		bo_store  : Number
};
var card_define = {
		id    : Number,
		name  : String,
		com   : String,
		type  : String,
		active : Number
};

function ConvertToTable(data, callBack) {
    data = data.toString();
    var table = [];
    var rows = [];
    rows = data.split("\n");
    for (var i = 0; i < rows.length; i++) {
        table.push(rows[i].split(","));
    }
    callBack(table);
}

router.post('/Login', function(req, res) {
		vaild(req.body.name,req.body.password,function(result){
				res.json(result);
		});
});
router.post('/searchbook',function(req,res){
		mysqlcon.booksearch(req.body.type,req.body.content,function(ret){
				res.json(ret);
		});
});
router.post('/muladd', multipartMiddleware ,function(req, res) {
		res.json({path:req.files.file.path});
});
router.post('/muladdvaild',function(req, res) {
	vaild(req.body.name,req.body.password,function(result){
					if (result.ret_code == 0 ){
							console.log(req.body.path);
							fs.readFile(req.body.path,function(err,data){
									ConvertToTable(data, function (table) {
							        for (var i = 1; i < table.length; i++){
													if (table[i][0] != '' ) {
														dbcon('book',book_define,'search',{id : req.body.bo_id},function(result){
																console.log(result);
																if (result.length ==0){ //该书不存在所以要新建记录
																		res.json({ret_code:0,ret_msg:"新增图书"});
																		dbcon('book',book_define,'create',{
																			id        : table[i][0],
																			bo_type   : req.body.bo_type,
																			bo_name   : req.body.bo_name,
																			bo_press  : req.body.bo_press,
																			bo_year   : req.body.bo_year,
																			bo_author : req.body.bo_author,
																			bo_price  : req.body.bo_price,
																			bo_sum    : req.body.bo_num,
																			bo_store  : req.body.bo_num
																		});
																} else { //该书存在所以 bo_store ++ bo_sum ++
																		console.log('add store');
																		res.json({ret_code:0,ret_msg:"图书入库"});
																		result[0].bo_store = result[0].bo_store + req.body.bo_num;
																		result[0].bo_sum = result[0].bo_sum + req.body.bo_num;
																		result[0].save();
																}
														});
													}
											}
							    });
							});

					}else{

					}
			});
});
router.post('/deletecard',function(req,res){
		vaild(req.body.name,req.body.password,function(result){
				if (result.ret_code == 0 ){
						dbcon('card',card_define,'search',{id : req.body.cardid},function(result){
								console.log(result[0].id);
								if (result.length != 0) {  //找到该读书卡
										if (result[0].active == 1) {
												result[0].active = 0;
												result[0].save();
												res.json({ret_code:0,ret_msg:"成功删除"});
										} else {
												res.json({ret_code:1,ret_msg:"书卡不存在"});
										}
								} else {   //该借书卡存在所以返回错误信息
										res.json({ret_code:1,ret_msg:"书卡不存在"});
								}
						});
				} else {
						res.json({ret_code:1,ret_msg:"身份验证失败"});
				}
		});
});
router.post('/addcard',function(req,res){
		vaild(req.body.name,req.body.password,function(result){
				if (result.ret_code == 0 ){
						dbcon('card',card_define,'search',{id : req.body.cardid},function(result){
								if (result.length == 0) {  //该借书卡不存在所以新建记录
									dbcon('card',card_define,'create',{
										id     : req.body.cardid,
										name   : req.body.cardname,
										type   : req.body.type,
										com    : req.body.com,
										active : 1
									});
										res.json({ret_code:0,ret_msg:"书卡新建成功"});
								} else {   //该借书卡存在所以返回错误信息
										if (result[0].active == 0) {
												result[0].active =1;
												result[0].save();
												res.json({ret_code:0,ret_msg:"书卡新建成功"});
										} else {
											res.json({ret_code:1,ret_msg:"此卡已存在"});
										}
								}
						});
				} else {
						res.json({ret_code:1,ret_msg:"身份验证失败"});
				}
		});
});
router.post('/addbook', function(req, res) {
		vaild(req.body.name,req.body.password,function(result){
				if (result.ret_code == 0){  //验证通过
						console.log("验证通过");
						dbcon('book',book_define,'search',{id : req.body.bo_id},function(result){
								console.log(result);
								if (result.length ==0){ //该书不存在所以要新建记录
										console.log('create new');
										res.json({ret_code:0,ret_msg:"新增图书"});
										dbcon('book',book_define,'create',{
											id     : req.body.bo_id,
											bo_type   : req.body.bo_type,
											bo_name   : req.body.bo_name,
											bo_press  : req.body.bo_press,
											bo_year   : req.body.bo_year,
											bo_author : req.body.bo_author,
											bo_price  : req.body.bo_price,
											bo_sum    : req.body.bo_num,
											bo_store  : req.body.bo_num
										});
								} else { //该书存在所以 bo_store ++ bo_sum ++
										console.log('add store');
										res.json({ret_code:0,ret_msg:"图书入库"});
										result[0].bo_store = result[0].bo_store + req.body.bo_num;
										result[0].bo_sum = result[0].bo_sum + req.body.bo_num;
										result[0].save();
								}
						});
				} else {
						res.json({ret_code:1,ret_msg:"身份验证失败"});
				}
		});
});

module.exports = router;
