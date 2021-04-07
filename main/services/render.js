const AllProducts = require('./AllFunction/AllFunction');
exports.homeRoutes = (req,res)=>{
	console.log(AllProducts.products.productName);
	res.render('homePage',{products:AllProducts.products});

}