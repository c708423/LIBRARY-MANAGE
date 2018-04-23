var orm = require('orm')
var opts = require('../config/database')


module.exports = function Query(tbname,construct,dowhat,options,callback)  {
	var ans;
	var getans = function(err,db) {
		if (err) return console.error('Connection error: ' + err);
		var dbb = db.define(tbname,construct);
		if (dowhat === "create"){
				dbb.create(options,function(err){
					if (err) throw err;
				});
		}
		if (dowhat === "search"){
				dbb.find(options,function(err, ret){
						if (err) throw err;
						callback(ret);
						//ans = ret[0].password;
				});
		}
		if (dowhat === "delete"){
			 	console.log('delete');
				dbb.delete(options,function(err,ret){
						if (err) throw err;
						callback(ret);
				})
		}
		// connected
		// ...
	};
	orm.connect(opts, getans);
}
