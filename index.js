const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;
//const mongoose=require('mongoose');

const app = express();

const generatePassword = require('password-generator');
const generateEmail = require('random-email');

//const url = process.env.MONGODB_URI;
//const url="mongodb://br14n:Hello123@ds247827.mlab.com:47827/heroku_tj9btv1k";
//const url = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@ds247827.mlab.com:47827/heroku_tj9btv1k`;
const PORT = process.env.PORT || 3001;



app.use(bodyParser.json());


// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));






MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true } , function(err, db) {
  if (err) throw err;

  var dbo = db.db("heroku_tj9btv1k");
  dbo.createCollection("works after deploy!!!", function(err, res) {
  //  if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
}); 


  

  // dbo.createCollection("id_table",function(err,res){
  //   if(err) throw err;
  //   db.close();
  // });
  // dbo.createCollection("status_table",function(err,res){
  //   if(err) throw err;
  //   db.close();
  // });



  // dbo.collection('UserInput').insertOne({
  //   item: "canvas", qty: 100, tags: ["cotton"], size: { h: 28, w: 35.5, uom: "cm" }
  // }, function(err,res){
  //   if(err) throw err;
  //   console.log("# of docs inserted: " + res.insertedCount);
  //   dbo.close();
  // });









// Put all API endpoints under '/api'
app.get('/api/passwords', (req, res) => {
  const count = 5;

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  )

  // Return them as json
  res.json(passwords);

  console.log(`Sent ${passwords} passwords`);
});




app.get('/api/emails',(req,res) => {

  
  //var email = generateEmail({domain: 'gmail.com'});
  const email2 = Array.from(Array(5).keys()).map(i =>
    generateEmail({domain: 'gmail.com'})
  )

  res.json(email2);
  console.log(`${email2}`);
  
  
});










// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});




// const port = process.env.PORT || 5000;
// app.listen(port);

// console.log(`Password generator listening on ${port}`);





app.listen(PORT,function(){
  console.log(`app started on port ${PORT}`);
});


