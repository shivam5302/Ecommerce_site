const db = require('../database/dbConfig');

exports.products = function(req,res){

	let sql = "SELECT productName FROM 'products'"
	db.query(sql,function(err,result){
		if(results.length){
			console.log(productName);
		}
		else{
			console.log('not work');
		}
	})
}