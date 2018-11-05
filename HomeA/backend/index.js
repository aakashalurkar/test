//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
const math = require('mathjs');
var mysql =require("mysql");
var multer = require("multer");
const path = require("path");

var {Login} = require('./models/login');
var {TLogin} = require('./models/traveller_signup');
var {mongoose} = require('./db/mongoose');
var autoIncrement = require("mongodb-autoincrement");
var kafka = require('./kafka/client');
var ObjectId = require('mongodb').ObjectID;

var con =mysql.createConnection({
    host : "localhost",
    user: "root",
    database : "lab1homeaway"
});

app.set('view engine', 'ejs');


app.use(cors({ origin: 'http://localhost:3000', credentials: true }));


app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));


app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  var Users = [{
      username : "admin",
      password : "admin"
  }]

  con.connect(function(err){
    if(err) throw err;
    console.log("connected");
})

//Route to handle Post Request Call
// app.post('/login',function(req,res){
    
    
//     console.log("Inside Login Post Request");
//     console.log("Req Body : ",req.body);
//     // Users.filter(function(user){
//     //     if(user.username === req.body.username && user.password === req.body.password){
//     //         res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
//     //         req.session.user = user;
//     //         res.writeHead(200,{
//     //             'Content-Type' : 'text/plain'
//     //         })
//     //         res.end("Successful Login");
//     //     }
//     // })
//    // SELECT * FROM `owner_login` WHERE username ="rajas" and password ="rajas" 
//     //var sql ="INSERT INTO owner_login VALUES ("+mysql.escape(req.body.username) +","+mysql.escape(req.body.password) + ")";



//     // var sql ="SELECT * FROM traveller_login WHERE username = "+mysql.escape(req.body.username) + "AND password = " +mysql.escape(req.body.password);
//     // con.query(sql,function(err,result){
//     //     console.log(result);
//     //     if(err || result.length ===0)
//     //     {
//     //         //console.log("in if");
//     //         res.writeHead(400, {'content-type': 'text/html'});

//     //         res.end("error");
//     //     }
//     //     else{
//     //         //console.log("in else");
//     //         console.log(result)
//     //         res.cookie('cookie',result,{maxAge: 900000, httpOnly: false, path : '/'});
//     //         req.session.user = result;
//     //         res.writeHead(200, {'content-type': 'text/html'});
//     //         res.end(JSON.stringify(result));
//     //     }
//     // })

//     Login.find({
//         username:req.body.username
//     }, function(err,user){
//         console.log(user)
//         if (err) {
//             res.code = "400";
//             res.value = "The email and password you entered did not match our records. Please double-check and try again.";
//             console.log(res.value);
//             res.sendStatus(400).end(); 
//         } else if(user && user.password == req.body.password){
//             console.log("inside else "+user)
//             res.code = "200";
//             res.value = user;
//             res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
//             // res.sendStatus(200).end();
//             res.writeHead(200,{
//                 'Content-Type' : 'text/plain'
//             })
//             res.end(JSON.stringify(user));
//         }
//         // console.log("inside else "+user)
//         // res.code = "200";
//         // res.value = user;
//         // res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
//         // // res.sendStatus(200).end();
//         // res.writeHead(200,{
//         //     'Content-Type' : 'text/plain'
//         // })
//         // res.end(JSON.stringify(user));
//     })
   

    
// });
app.post('/login', function(req, res){

    kafka.make_request('post_traveller',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
                res.json({
                    updatedList:results
                });

                res.end();
            }
        
    });
});

app.post('/ownerlogin', function(req, res){

    kafka.make_request('post_owner',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
                res.json({
                    updatedList:results
                });
                //res.send(JSON.stringify(results))

                res.end();
            }
        
    });
});

app.post('/ownersignup', function(req, res){

    kafka.make_request('owner_signup',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
                res.json({
                    updatedList:results
                });

                res.end();
            }
        
    });
});
// app.post('/ownersignup',function(req,res){
    
//      console.log("in post ownersignup");
//      console.log("Req Body : ",req.body);
// //      var sql ="INSERT INTO `owner_login` ( `username`, `password`, `phonenumber`, `city`, `age` ) VALUES  ("+mysql.escape(req.body.name) +","+mysql.escape(req.body.password) +","+mysql.escape(req.body.phoneno) +","+mysql.escape(req.body.city) + ","+mysql.escape(req.body.age) + ")";
// //      con.query(sql,function(err,result){

// //         if(err)
// //         {
// //             res.writeHead(400, {'content-type': 'text/html'});
// //             console.log(err);
// // //res.redirect('home');

// //         }
// //         else{
// //            // console.log("in else");
// //           //  res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
// //             res.writeHead(200,{
// //                 'Content-Type' : 'text/plain'
// //             })
// //     res.end("Successful Login");
// // }
// // })

// // MongoClient.connect(url, function(err, db) {
// //     if (err) throw err;
// //     var dbo = db.db("login_details");
// //     var myobj = { username: req.body.name, password: req.body.password,phonenumber:req.body.phoneno,city:req.body.city,age:req.body.age };
// //     dbo.collection("login_details").insertOne(myobj, function(err, res) {
// //       if (err) throw err;
// //       console.log("1 document inserted");
// //     // var query = { username: username };
// //     // dbo.collection("login_details").find(query).toArray(function(err, result) {
// //     //     if (err) throw err;
// //     //     console.log(result[1].username);
// //       db.close();
// //     });
// //   }); 

// function getNextSequence(db, name, callback) {
//     console.log("ttt",name);
//     var dbo = db.db("login_details");
//     dbo.collection("counters").findAndModify( { _id: name }, null, { $inc: { seq: 1 } }, function(err, result){
//         if(err) callback(err, result);
//         console.log(result);
//         callback(err, result.value.seq);
//     } );
   
// }
// MongoClient.connect(url, function(err, db) {
// getNextSequence(db, "login_details", function(err, result){


// var login_data = new Login({
//     username: req.body.name, 
//     password: req.body.password,
//     phonenumber:req.body.phoneno,
//     city:req.body.city,
//     age:req.body.age,
//    id:result,
      
// });

// login_data.save().then((login_data)=>{
//     console.log("Book created : ",login_data);
//     res.sendStatus(200).end();
// },(err)=>{
//     console.log("Error Creating Book");
//     res.sendStatus(400).end();
// });

//  });
//  });
    

   

// // MongoClient.connect(url, function(err, db) {
   
// //         if (err) throw err;
// //         var dbo = db.db("login_details");
// //         autoIncrement.getNextSequence(db, dbo, function (err, autoIndex) {
// //         var myobj = { username: req.body.name, password: req.body.password,phonenumber:req.body.phoneno,city:req.body.city,age:req.body.age,id:autoIndex };
// //         dbo.collection("login_details").insertOne(myobj, function(err, res) {
// //           if (err) throw err;
// //           console.log("1 document inserted");
        
// //           db.close();
// //         });
// //       }); 
// //     });

// });

app.post('/travellersignup', function(req, res){

    kafka.make_request('traveller_signup',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
                res.json({
                    updatedList:results
                });

                res.end();
            }
        
    });
});

// app.post('/travellersignup',function(req,res){
    
//     console.log("in post travellersignup");
//     console.log("Req Body : ",req.body);
// //     var sql ="INSERT INTO `traveller_login` ( `username`, `password`, `phonenumber`, `aboutme`, `city`, `gender`, `school`, `hometown`, `company` , `age`) VALUES  ("+mysql.escape(req.body.name) +","+mysql.escape(req.body.password) +","+mysql.escape(req.body.phoneno) +","+mysql.escape(req.body.multiline) +","+mysql.escape(req.body.city) +","+mysql.escape(req.body.gender) +","+mysql.escape(req.body.school) + ","+mysql.escape(req.body.hometown) +","+mysql.escape(req.body.company) +","+mysql.escape(req.body.age) + ")";
// //     con.query(sql,function(err,result){

// //        if(err)
// //        {
// //            res.writeHead(400, {'content-type': 'text/html'});
// //            console.log(err);
// // //res.redirect('home');

// //        }
// //        else{
// //           // console.log("in else");
// //          //  res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
// //            res.writeHead(200,{
// //                'Content-Type' : 'text/plain'
// //            })
// //    res.end("Successful Login");
// // }
// // })

// function getNextSequence(db, name, callback) {
//     console.log("ttt",name);
//     var dbo = db.db("login_details");
//     dbo.collection("counters").findAndModify( { _id: name }, null, { $inc: { seq: 1 } }, function(err, result){
//         if(err) callback(err, result);
//         console.log(result);
//         callback(err, result.value.seq);
//     } );
   
// }
// MongoClient.connect(url, function(err, db) {
// getNextSequence(db, "traveler_counter", function(err, result){
   
// var traveller_data = new TLogin({
//     username: req.body.name, 
//     password: req.body.password,
//     phonenumber:req.body.phoneno,
//     aboutme:req.body.aboutme,
//     city:req.body.city,
//     gender:req.body.gender,
//     school:req.body.school,
//     hometown:req.body.hometown,
//     company:req.body.company,
//     age:req.body.age,
//     id:result,
// });
// console.log("traveller : ",traveller_data);

// traveller_data.save().then((traveller_data)=>{
//     console.log("Book created : ",traveller_data);
//     res.sendStatus(200).end();
// },(err)=>{
//     console.log("Error Creating Book");
//     res.sendStatus(400).end();
// })
   
// });
// });   
// });

//try



app.post('/',function(req,res){
    
    console.log("in / ");
    console.log("Req Body : ",req.body.textArea);
    var evaluation = req.body.textArea;
    var ans =math.eval(evaluation);
    console.log("Answer : " , ans); 
    var ans_char =String(ans);
//     var index = books.map(function(book){
//         return book.BookID;
//      }).indexOf(req.body.BookID); 
//      books.splice(index, 1);
//     console.log("Index is :" + index);
//     console.log("Books : ",JSON.stringify(books));
//     res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
//    // req.session.user = user;
    res.writeHead(200,{
        'Content-Type' : 'text/plain'
    })
   
    res.end(ans_char);
    //res.send({ hello: 'world' });
   
    
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./img");
    },
    filename: (req, file, cb) => {
      const newFilename =
        file.fieldname + "-" + Date.now() + `${path.extname(file.originalname)}`;
      cb(null, newFilename);
    }
  });
  
  const upload = multer({ storage });
  
  app.post("/photoupload", upload.single("selectedFile"), (req, res) => {
    //console.log("Req : ",req);
    console.log("Res : ", res.file);
    res.send();
  });

app.post('/bookproperty',function(req,res){
    
    console.log("in /photo ");
    console.log("Req Body : ",req.body);
//    var traveerleid =1;
//     var sql ="INSERT INTO `booking_table` ( `ownerkey`, `propertykey`, `travellerkey`) VALUES  ("+mysql.escape(req.body.ownerkey) +","+mysql.escape(req.body.propertykey)+"," +mysql.escape(req.body.traverllerkey)+")" ;
//     con.query(sql,function(err,result){

//         if(err)
//         {
//             res.writeHead(400, {'content-type': 'text/html'});
//             console.log(err);
//  //res.redirect('home');
 
//         }
//         else{
//            // console.log("in else");
//           //  res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
//             res.writeHead(200,{
//                 'Content-Type' : 'text/plain'
//             })
    // res.end("Successful Login");
   
// }
// })
  //res.send({ hello: 'world' });
  //mongo

//    MongoClient.connect(url, function(err, db) {
//             if (err) throw err;
//             var dbo = db.db("login_details");
//             var myobj = { propertykey: req.body.propertykey,
//             ownerkey: req.body.ownerkey,
//             traverllerkey: req.body.traverllerkey,  };
//             dbo.collection("booking_table").insertOne(myobj, function(err, res) {
//               if (err) throw err;
//               console.log("1 document inserted");
//             // var query = { username: username };
//             // dbo.collection("login_details").find(query).toArray(function(err, result) {
//             //     if (err) throw err;
//             //     console.log(result[1].username);
//               db.close();
//             });
//           }); 
kafka.make_request('booking_property',req.body, function(err,results){
    console.log('in result');
    console.log(results);
    if (err){
        console.log("Inside err");
        res.json({
            status:"error",
            msg:"System Error, Try Again."
        })
    }else{
        console.log("Inside else");
            res.json({
                updatedList:results
            });

            res.end();
        }
    
});
    
});

app.post('/message',function(req,res){
    
    console.log("in /message ");
    console.log("Req Body : ",req.body);

kafka.make_request('message',req.body, function(err,results){
    console.log('in result');
    console.log(results);
    if (err){
        console.log("Inside err");
        res.json({
            status:"error",
            msg:"System Error, Try Again."
        })
    }else{
        console.log("Inside else");
            res.json({
                updatedList:results
            });

            res.end();
        }
    
});
    
});
app.get('/message',function(req,res){
    
    console.log("in /message ");
    console.log("Req Body : ",req.query.data);
    const data1 =JSON.parse(req.query.data)
    var ownerkey=String(data1.ownerkey)
    console.log(ownerkey)
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("login_details");
        var query = { ownerkey:ownerkey };
        dbo.collection("message").find(query).toArray(function(err, result) {
          if (err) throw err;
          console.log( result);
          res.send(result)
          
        });
 
    })
 
});

// app.post('/ownerlogin',function(req,res){
    
//     console.log("in /owner ");
//     console.log("Req Body : ",req.body);
//     // var sql ="SELECT * FROM owner_login WHERE username ="+mysql.escape(req.body.username)+"AND password ="+mysql.escape(req.body.password)
    
//     //     con.query(sql,function(err,result){
//     //     if(err){
//     //         res.writeHead(400,{
//     //             'Content-Type' : 'text/plain'
//     //         })
//     //         res.end("Invalid Credentials");
//     //     }else if(result.length ===1 && result[0].username === req.body.username && result[0].password ===req.body.password)
//     //         {
//     //             console.log(result.length);
//     //         res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
//     //         req.session.user = result;
            
//     //          res.writeHead(200,{
//     //              'Content-Type' : 'text/plain'
//     //          })
//     //          res.end(JSON.stringify(result));
//     //     }
//     //     else{
//     //         res.writeHead(400,{
//     //             'Content-Type' : 'text/plain'
//     //         })
//     //        // alert("wrong username or password");
//     //         res.end("Invalid Credentials");
//     //     }

//     // });
    
//     Login.find({
//         username:req.body.username
//     }, function(err,user){
//         console.log(user)
//         if (err) {
//             res.code = "400";
//             res.value = "The email and password you entered did not match our records. Please double-check and try again.";
//             console.log(res.value);
//             res.sendStatus(400).end(); 
//         } else if(user && user.password == req.body.password){
//             console.log("inside else "+user)
//             res.code = "200";
//             res.value = user;
//             res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
//             // res.sendStatus(200).end();
//             res.writeHead(200,{
//                 'Content-Type' : 'text/plain'
//             })
//             res.end(JSON.stringify(user));
//         }
//         console.log("inside else "+user)
//         res.code = "200";
//         res.value = user;
//         res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
//         // res.sendStatus(200).end();
//         res.writeHead(200,{
//             'Content-Type' : 'text/plain'
//         })
//         res.end(JSON.stringify(user));
//     })
  
    
// });

app.get('/getproperty', function(req,res){
    console.log("Inside Home Login");    
    const data =req.query.data
    console.log(data)
    const data1 =JSON.parse(data)
    var city=String(data1.search)
    console.log(city)
   
   // console.log(req.query.data)
//    var sql= "SELECT * FROM property_details WHERE city = '"+city+"'"
//     var query = con.query(sql,function(err,rows){
//         if(err)
//         {
//           {console.log("Error Selecting : %s ",err );}
//         }

//        // console.log(rows)
//        res.send(JSON.stringify(rows))
//        // res.render('home.ejs',{studentlist: "Test Table",studentlist:rows});
      
    
// });

//mongo code
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("login_details");
    var query = { city:city };
    dbo.collection("property_details").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log( result);
      res.send(result)
      
    });
   
        
    
    
  });
})


app.get('/getbookedproperty', function(req,res){
    console.log("Inside owner property Login");    
    const data =req.query.data
    console.log(data)
    const data1 =JSON.parse(data)
    // var username=String(data1.username)
    // var password=String(data1.password)
    var travellerkey=String(data1.travellerkey)
    console.log(travellerkey)
  


MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("login_details");
    var query = {traverllerkey:travellerkey   };
    dbo.collection("booking_table").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log( result.length);
      var tofind = new Array();
      var tofind = [];
      for(i=0;i<result.length;i++)
      {
        tofind[i]=String(result[i].propertykey)
      }
      var result_property_array =new Array();
      var result_property_array =[];
      for(i=0;i<result.length;i++)
      {   
       //console.log(tofind)
       var query_tofind=tofind[i]
       var query = { _id: ObjectId(query_tofind) };
       dbo.collection("property_details").find(query).toArray(function(err, result_property) {
        if (err) throw err;
        console.log("result_property");
       // res.send(result_property_array)
        result_property_array[i]=result_property
        console.log(result_property_array[i])
       
     }); 
    
    } 
    res.send(result_property_array)
    });
   
  
  }); 
      
})

app.get('/getownerproperty', function(req,res){
    console.log("Inside owner property Login");    
    const data =req.query.data
    //console.log(data)
    const data1 =JSON.parse(data)
    var username=String(data1.username)
    var password=String(data1.password)
    console.log(password)
  
  // console.log(req.query.data)

  
//    var sql1= "SELECT * FROM owner_login WHERE username = '"+username+"' AND password = '"+password+"'"
//   // var sql= "SELECT ownerid FROM owner_login WHERE username = "+mysql.escape(req.body.username)+"' AND password = "+mysql.escape(req.body.password)
//   var queryout=  con.query(sql1,function(err,rows){
     
//     if(rows.length===0){
//         console.log("in error1")
        
//         res.send("400");
//     }else{
//         var sql= "SELECT ownerid FROM owner_login WHERE username = '"+username+"' AND password = '"+password+"'"
//         //console.log("in ")
//     var query = con.query(sql,function(err,rows){
//         if(err)
//         {
//            // console.log("in error")
//             // res.writeHead(400,{
//             //     'Content-Type' : 'text/plain'
//             // })
//             res.send("400");
//         //   {console.log("Error Selecting : %s ",err );}
//         //   res.send("error")
//         }

//        // console.log(rows[0].ownerid)

//       // res.send(JSON.stringify(rows))
//        // res.render('home.ejs',{studentlist: "Test Table",studentlist:rows});
//        var sql1= "SELECT * FROM property_details WHERE ownerkey = "+rows[0].ownerid
//        var query = con.query(sql1,function(err,rows){
//            if(err)
//            {
//             res.writeHead(400,{
//                 'Content-Type' : 'text/plain'
//             })
//             res.end("Invalid Credentials");
//             //  {console.log("Error Selecting : %s ",err );}
//             //  res.send("error")
//            }
          
//            //console.log(rows)
//             res.send(JSON.stringify(rows))
           
   
//           // console.log(rows)
   
       
//           // res.render('home.ejs',{studentlist: "Test Table",studentlist:rows});
         
       
//            });
    
//         });
//     }
// });

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("login_details");
    var query = { username: username,password: password };
    dbo.collection("login_details").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log( result[0]._id);
      var tofind=String(result[0]._id)
      var query = { ownerkey: tofind };
    dbo.collection("property_details").find(query).toArray(function(err, result_property) {
      if (err) throw err;
      console.log(result_property);
      res.send(result_property)
      
    });  
      
    });
   
        
    
    
  }); 
      
})

// app.get('/checkowner', function(req,res){
//     console.log("Inside owner property Login");    
//     const data =req.query.data
//    // console.log(data)
//     const data1 =JSON.parse(data)
//     var username=String(data1.username)
//     var password=String(data1.password)
//    // console.log(password)
//     var check =400
//   // console.log(req.query.data)

  
//    var sql1= "SELECT * FROM owner_login WHERE username = '"+username+"' AND password = '"+password+"'"
//   // var sql= "SELECT ownerid FROM owner_login WHERE username = "+mysql.escape(req.body.username)+"' AND password = "+mysql.escape(req.body.password)
//   var queryout=  con.query(sql1,function(err,rows){
     
//     if(rows.length===0){
//         console.log("in error1")
        
//         res.send("400");
//     }else{
//         var sql= "SELECT ownerid FROM owner_login WHERE username = '"+username+"' AND password = '"+password+"'"
//         console.log("in ")
//     var query = con.query(sql,function(err,rows){
//         if(err)
//         {
//             console.log("in error")
//             // res.writeHead(400,{
//             //     'Content-Type' : 'text/plain'
//             // })
//             res.send("400");
//         //   {console.log("Error Selecting : %s ",err );}
//         //   res.send("error")
//         }

//         console.log(rows[0].ownerid)

//        res.send(JSON.stringify(rows[0].ownerid))
//        // res.render('home.ejs',{studentlist: "Test Table",studentlist:rows});
       
    
        
//     });
// }
// });        
// })

app.post("/addproperty", function(req, res) {
    console.log("Inside checkout Post Request");
    console.log("Req Body : ", req.body);
    // var property = {
    //   ownerkey: 3,
    //   country: req.body.country,
    //   streetaddress: req.body.street_address,
    //   unit: req.body.unit,
    //   city: req.body.city,
    //   state: req.body.statelive,
    //   zipcode: req.body.zipcode,
    //   headline: req.body.headline,
    //   property_description: req.body.property_description,
    //   type: req.body.type_house,
    //   bedroom: req.body.bedrooms,
    //   accomodates: req.body.accomodates,
    //   bathroom: req.body.bathrooms,
    //   opendate_from: req.body.startdate,
    //   opendate_to: req.body.enddate,
    //   nightly_rate: req.body.nightrate,
    //   min_stay: req.body.minimumstay
    // };
  
    // var sql = "INSERT INTO property_details SET ?";
  
    
    //     con.query(sql, property, function(err, result) {
    //       if (err) {
    //         console.log(err);
    //         res.writeHead(400, {
    //           "Content-Type": "text/plain"
    //         });
    //         res.end("Invalid Property Information");
    //       } else {
    //         res.writeHead(200, {
    //           "Content-Type": "text/plain"
    //         });
    //         res.end("Property Successfully Created");
    //       }
    //     });
    
    //mMongo for postproperty 

    // MongoClient.connect(url, function(err, db) {
    //         if (err) throw err;
    //         var dbo = db.db("login_details");
    //         var myobj = {  ownerkey: 3,
    //             country: req.body.country,
    //             streetaddress: req.body.street_address,
    //             unit: req.body.unit,
    //             city: req.body.city,
    //             state: req.body.statelive,
    //             zipcode: req.body.zipcode,
    //             headline: req.body.headline,
    //             property_description: req.body.property_description,
    //             type: req.body.type_house,
    //             bedroom: req.body.bedrooms,
    //             accomodates: req.body.accomodates,
    //             bathroom: req.body.bathrooms,
    //             opendate_from: req.body.startdate,
    //             opendate_to: req.body.enddate,
    //             nightly_rate: req.body.nightrate,
    //             min_stay: req.body.minimumstay };
    //         dbo.collection("property_details").insertOne(myobj, function(err, res) {
    //           if (err) throw err;
    //           console.log("1 document inserted");
    //         // var query = { username: username };
    //         // dbo.collection("login_details").find(query).toArray(function(err, result) {
    //         //     if (err) throw err;
    //         //     console.log(result[1].username);
    //           db.close();
    //         });
    //       }); 

    kafka.make_request('post_property',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
                res.json({
                    updatedList:results
                });

                res.end();
            }
        
    });

  });
  

//Route to get All Books when user visits the Home Page
// app.get('/home', function(req,res){
//     console.log("Inside Home Login");    
//     res.writeHead(200,{
//         'Content-Type' : 'application/json'
//     });
//     console.log("Books : ",JSON.stringify(books));
//     res.end(JSON.stringify(books));
    
// })
//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");