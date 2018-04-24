var mysql  = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123',
  database : 'librarymanage',
	port     : 3307
});

module.exports = {
		booksearch:function(type, content,callback){
      console.log('SELECT * FROM book WHERE ' + type + " LIKE '%"  +content + "%'");
			connection.query('SELECT * FROM book WHERE ' + type+ ' LIKE "%'+content+'%"',
			function (error, results, fields) {
			  if (error) throw error;
        callback(results);
			});
		}
};
