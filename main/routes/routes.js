const express = require('express');
const route = express.Router();
//const services = require('../services/render');
const db = require('../services/database/dbConfig');
//const cookieParser = require('cookie-parser');

//


route.get('/login',(req,res)=>{

	res.render('login');

});

route.post('/login',(req,res)=>{

	const {email,password} = req.body;
	console.log(email+" "+password);
	if(email && password){
	db.query("SELECT * FROM users WHERE email='"+email+"' AND password='"+password+"'",function(err,result,field){
		
		if(err){
			throw err;
		}
		else{

			console.log('your email is :',result[0].email)
			if(result[0].email===email && result[0].password===password){
			req.session.authenticated=true;
				req.session.user={
					email,password
				};

			db.query("SELECT * FROM products",function(err,result,field){

				if(err){
					throw err;
				}
				else{
					res.render('homePage',{products:result, session:req.session});
				}

			})

				console.log('your session :',req.session.user.email)
				
			}else{
				res.status(403).json({'msg':'Bad Credential!1'})
			}
		}
	});
}
else{
	console.log('Bad Credential!');
	res.status(403).json({'msg':'Bad Credential!1'})
}

})

route.get('/logout',function(req,res){

	if(req.session.authenticated){
		req.session.authenticated=false;
	}
	res.redirect('/');

})

route.get('/',function(req,res){
	let products;
	db.query("SELECT * FROM products",function(err,result,fields){
		if(err){
			throw err;
		}
		else{
			res.render('homePage',{products:result,session:''});
		}
	});
});


route.get('/product/:id',function(req,res){
	

	// console.log(req.params.id);
	db.query("SELECT * FROM products WHERE productID='"+req.params.id+"'",function(err,result,fields){
		if(err){
			throw err;
		}
		else{
			console.log(result);
			res.render('productView',{product:result,session:req.session});
		}
	})
	

});
var cartProduct=[];
var pdt = {
name : "shivam",
Age : "21"
}
// cartProduct.push(pdt);
route.get('/addToCart/:id',function(req,res){

	db.query("SELECT * FROM products WHERE productID='"+req.params.id+"'",function(err,result,fields){
		var flag=true;

		var pdID = result[0].productID;

		// console.log(pdID+" "+ req.cookies.productData[0].productID);
		console.log("in side",req.cookies.productData);
		if(req.cookies.productData!=undefined){
	// 		console.log("in side");
		flag = req.cookies.productData.forEach(val=>{

			console.log(val.productID);

			if(pdID===val.productID){
				
				console.log('yes');
				return false;
			}

		});
	}

		if(flag){
			cartProduct.push(result[0]);
			res.cookie("productData", cartProduct);
			res.send('product add in cart successfuly');
		}
		else{
			res.send('your product is already set in cart');
		}
		
		// res.redirect('/viewCart');

	});
	
});

route.get('/viewCart',(req,res)=>{
	console.log(req.cookies.productData);
	if(req.cookies.productData){
	res.send(req.cookies.productData);
	}else{
		res.send('cookies not set');
	}
	// res.render('viewCart')
});
//------------------headers router---

route.get('/Head&Hair',(req,res)=>{
	res.send('head and hair products');
});
route.get('/Neck',(req,res)=>{});
route.get('/Arms',(req,res)=>{});
route.get('/Hand',(req,res)=>{});
route.get('/body',(req,res)=>{});
route.get('/Feet',(req,res)=>{});

module.exports = route