const express = require('express');
//const  user = require('./routes/user');
const path = require('path');
//const session = require('expres');
//const mysql = require('mysql');
const bodyParser = require('body-parser');

const database = require('./services/database/dbConfig');
const cookieParser = require('cookie-parser');
var reload = require('reload');
let session = require('express-session');

const app = express();

 app.use(cookieParser());

app.use(session({
	secret: 'some secret',
	cookie:{maxAge: 100000},
	saveUninitialized:false,
}));


// parse request to body-parser
app.use(bodyParser.urlencoded({ extended : true}))


// set view engine
app.set("view engine", "ejs")

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/images', express.static(path.resolve(__dirname, "assets/images")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

//check database connected or not
database.connect(function(error){
   if(!!error){
     console.log(error);
   }else{
     console.log('server is Connected!:)');
   }
 });  

//load routers
app.use('/',require('./routes/routes'));

var server = app.listen(8080,()=>{console.log(`server started on port 8080`)});

reload(server, app);