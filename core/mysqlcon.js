var mysql  = require('mysql');
const mysql_query_success = "OkPacket";
var pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '123',
  database : 'librarymanage',
	port     : 3307
});
var connection = {
  query:function(){
    if (arguments.length == 2){
        var sql = arguments[0];
        var options = [];
        var callback = arguments[1];
    } else if (arguments.length == 3){
        var sql = arguments[0];
        var options = arguments[1];
        var callback = arguments[2];
    }
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(sql,options,(err,results,fields) => {
                //释放连接
                conn.release();
                //事件驱动回调
                callback(err,results,fields);
            });
        }
    });
  },
  transaction_begin:async function(){
    pool.getConnection(function(err,conn){
        if (err){
          callback(err,null,null);
        }else{
          resolve(conn);
        }
    })
  }
}
function _errorthrow (error){
    return error;
}
module.exports = {
		booksearch:function(type, content,callback){
        if (content == ''){
          var _sql = "SELECT * FROM book WHERE ? like '%%'"
          var _param =  [type]
        } else {
          var _sql = "SELECT * FROM book WHERE ? like '%?%'";
          var _param = [type,content];
        }
  			connection.query(_sql,_param,
  			function (error, results, fields) {
  			  if (error) throw error;
          callback(results);

  			});
		},
    record_book:function(name_id,callback){
      var _sql = 'SELECT book_id FROM record WHERE name_id = ?';
      var _param = [name_id];
      connection.query(_sql,_param,
      function(error,results,fields){
          if (error) throw error;

      });
    },
    getborrowed:async function(id){

        var res,str=[],query_str,ret_resquest={},_sql,_param;
        res = await new Promise((resolve) => {
            _sql =  'SELECT DISTINCT book_id FROM record WHERE card_id = ?'
            _param = [id];
            connection.query(_sql,_param,function(err,result,feilds){
                if (err) {
                    console.log(err);
                    resolve(err);
                }
                resolve(result);
            })
        });
        let i = 0;
        if (res.length==0) {
            ret_resquest.get = 0;
            return ret_resquest;
        };
        for (var value of res) {
            str[i] = value.book_id;
            i = i + 1;
        }
        query_str = str.join(',');
        res = await new Promise((resolve) => {
            _sql = `SELECT * FROM book WHERE id IN (${query_str})`
            _param = []
            console.log(_param);
            connection.query(_sql,_param,function(err,result,feilds){
                if (err) {
                    console.log(err);
                    resolve(err);
                }
                resolve(result);
            })
        });

        console.log('getborrowed',res);
        ret_resquest.data = res;
        ret_resquest.get = 1;
        return ret_resquest;
    },
    borrow_book:async function(card_id,book_id,admin_id){
          var res1,res;

          res1 = await new Promise((resolve) => {
              connection.query(`SELECT bo_store FROM book WHERE id = ${book_id}`,function(error,result,feilds){
                  if (error) {
                      console.log(error);
                      resolve(error);
                  }
                  resolve(result);
              });
          })
          if (res1.length == 0){
                        return {ret_code : "5",ret_msg : "图书不存在"};
          }
          // 看库存是否大于 0
          if (res1[0].bo_store > 0) {
            // 若大于0 库存 -- re = UPDATE的结果
            res = await new Promise((resolve) => {
                connection.query(`UPDATE book SET bo_store = ${res1[0].bo_store - 1} WHERE id = ?`,[book_id],
                  function(error,result){
                    if (error) {
                      console.log(error);
                      resolve(error);
                    }
                    resolve(result);
                  })
            });
            console.log(res);
            // 如果UPDATE 失败则返回error
            if (res.constructor.name != mysql_query_success) {
              return {ret_code : '1',ret_msg : "库存减少失败"};
            }
            // 如果UPDATE 成功则插入借阅记录
            res = await new Promise((resolve) => {
                connection.query(`INSERT INTO record(card_id,book_id,admin_id) VALUES (${card_id},${book_id},${admin_id})`,
                function(error,result){
                    if (error) {
                      console.log(error);
                      resolve(error);
                    }
                    resolve(result);
                })
            })

            console.log(res.constructor.name);

            if (res.constructor.name != mysql_query_success) {
              return {ret_code : '1',ret_msg : "借阅记录插入失败"};
            }
            return {ret_code : "0",ret_msg : "借阅成功"};
          } else {
            res = await new Promise((resolve) => {connection.query(`SELECT creatAt  FROM record WHERE book_id = ? ORDER BY creatAt DESC`,[book_id],function(err,result,f){
              if (err) console.log(err);
              var resss = String(result[0].creatAt);
              resolve({ret_code : "2",ret_msg : "库存不足，最近借阅时间: " + resss })
            })
          });
          return res;
          }
    },
    add_book:async function(b_info){
        var res;

        res = await new Promise((resolve) => {
          connection.query(`SELECT * FROM book WHERE id = ?`,[b_info.id],function(err,result,fields){
              if (err) resolve(err)
              else {
                resolve(result);
              }
          })
        });
        if (res.length == 0){ // 新的图书记录
           res = await new Promise((resolve) => {
             var _sql = `INSERT INTO book VALUES (?,?,?,?,?,?,?,?,?)`;
             console.log(b_info);
             var _param = [ Number(b_info.id),
                            b_info.bo_type,
                            b_info.bo_name,
                            b_info.bo_press,
                            b_info.bo_year,
                            b_info.bo_author,
                            b_info.bo_price,
                            Number(b_info.bo_sum),
                            Number(b_info.bo_sum)
                         ];
             connection.query(_sql,_param,function(err,result,fields){
                if (err) {
                  console.log(err);
                  resolve({ret_code:1});
                }
                else {
                    resolve({ret_code:0});
                }
             })
           });
           return res.ret_code;
        } else {  //UPDATE +1
          res = await new Promise((resolve) => {
            var _sql =`UPDATE book SET bo_sum = bo_sum + 1 , bo_store = bo_store + 1 WHERE id = ?`
            var _param = b_info.id;
            connection.query(_sql,_param,function(err,result,fields){
                if (err) resolve({ret_code:1})
                else {
                    resolve({ret_code:0})
                }
            })
          });
          return res.ret_code;
        }
    },
    return_book:async function(card_id,book_id,admin_id){

      var res1,res;
      res1 = await new Promise((resolve) => {
          connection.query(`SELECT id,book_id FROM record WHERE card_id = ? and book_id = ? order by creatAt ASC`,[Number(card_id),Number(book_id)],function(error,result,feilds){
              if (error) {
                  console.log(error);
                  resolve(error);
              }
              resolve(result);
          });
      });
      if (res1.length == 0 ){
          return {ret_code:1,ret_msg:"未找到借阅记录"};
      }
      console.log(res1[0]);
      delid = res1[0].id;
      boid = res1[0].book_id;
      res = await new Promise((resolve) => {
          connection.query(`DELETE FROM record WHERE id = ?`,[Number(delid)],
          (err,result) => {
              if (err) {
                  console.log(err);
                  resolve(err);
              }
              resolve(result);
          })
      });
      if (res.constructor.name != mysql_query_success) {
          return {ret_code:2,ret_msg:"归还失败"};
      }
      console.log('delete',res);
      res = await new Promise((resolve) => {
          connection.query(`UPDATE book SET bo_store = bo_store + 1 WHERE id = ${boid}`,
          function(error,result){
              if (error) {
                console.log(error);
                resolve(error);
              }
              resolve(result);
          })
      })

      if (res.constructor.name != mysql_query_success) {
          return {ret_code:2,ret_msg:"归还失败"};
      }
      console.log('update',res);
      return {ret_code:0,ret_msg:"归还成功"};
    }
};
