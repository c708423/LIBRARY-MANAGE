var dbcon = require('./dbconnect');
var queryres = function api_vaild(username, userpwd, callback){
		dbcon('administrator',{
			id       : Number,
			name     : String,
			phone    : String,
			password : String
		},"search",{name : username},function(queryres){
			var ans;
			if (queryres.length != 0 ){
						if(queryres[0].password == userpwd){
								//console.log(req.session.loginUser);
								ans = {ret_code: 0, ret_msg: '登录成功'};
						}else{
								ans = {ret_code: 1, ret_msg: '账号或密码错误'};
						}
			}else{
					ans = {ret_code: 1,ret_msg: '账号不存在'};
			}
			callback(ans);
		});
};
module.exports = queryres;
