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

function ConvertToTable(data) {
    data = data.toString();
    var table = [];
    var rows = [];
    rows = data.split("\r\n");
    for (var i = 0; i < rows.length; i++) {
        table.push(rows[i].split(","));
    }
    return table;
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
							fs.readFile(req.body.path,async function(err,data){
									var data = ConvertToTable(data);
									for (i = 1; i<= data.length; i++){
											if (data[i][0] != ''){
												var dataobj = {
													id     : data[i][0],
													bo_type   : data[i][1],
													bo_name   : data[i][2],
													bo_press  : data[i][3],
													bo_year   : data[i][4],
													bo_author : data[i][5],
													bo_price  : data[i][6],
													bo_sum    : data[i][7]
												}
												var ret = await mysqlcon.add_book(dataobj);
												console.log(ret);
											}
									}
							});
							res.json({ret_code:0,ret_msg:"入库成功"});
					}else{
							res.json({ret_code:1,ret_msg:"身份验证失败"});
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
router.post('/returnbook',function(req,res){
	vaild(req.body.name, req.body.password,async function(result){
			if (result.ret_code == 0){
				var p =  await mysqlcon.return_book(req.body.cardid,req.body.bookid,result.admin_id);
				res.json(p);
			} else {
				res.json({ret_code:1,ret_msg:"身份验证失败"});
			}
	})
})
router.post('/borrowbook',function(req,res){
	vaild(req.body.name, req.body.password,async function(result){
			if (result.ret_code == 0){
					var p =  await mysqlcon.borrow_book(req.body.cardid,req.body.bookid,result.admin_id);
					console.log(p);
					res.json(p);
			} else {
					res.json({ret_code:1,ret_msg:"身份验证失败"});
			}
	});
});

router.post('/searchcard', function(req,res){
		var ret_data = [];
		vaild(req.body.name, req.body.password,function(result){
				if (result.ret_code == 0){
						console.log(req.body.id);
						dbcon('card',card_define,'search',{id : req.body.id},async function(result){
								if (result.length == 0){
										res.json({ret_code:1,ret_msg:"书卡未找到"});
								}	else {
										formdata = await mysqlcon.getborrowed(req.body.id);
										if (formdata.get == 0 ){
												ret_data = [];
										} else {
												ret_data = formdata.data;
										}
										res.json({
											ret_code : 0,
											name     : result[0].name,
											type     : result[0].type,
											com      : result[0].com,
											ret_msg  : "查询成功",
											data     : ret_data
										});
								}
						});
				}	else {
						res.json({ret_code:1,ret_msg:"身份验证失败"});
				}
		});
});
router.post('/addbook', function(req, res) {
		vaild(req.body.name,req.body.password,async function(result){
				if (result.ret_code == 0){  //验证通过
						console.log("验证通过");
						var sqlres = await mysqlcon.add_book({
							id        : req.body.bo_id,
							bo_type   : req.body.bo_type,
							bo_name   : req.body.bo_name,
							bo_press  : req.body.bo_press,
							bo_year   : req.body.bo_year,
							bo_author : req.body.bo_author,
							bo_price  : req.body.bo_price,
							bo_sum    : req.body.bo_num,
							bo_store  : req.body.bo_num
						});
						if (sqlres == 0) res.json({ret_code:0,ret_msg:"入库成功"});
						else res.json({ret_code:2,ret_msg:"入库失败"})
				} else {
						res.json({ret_code:1,ret_msg:"身份验证失败"});
				}
		});
});

module.exports = router;
