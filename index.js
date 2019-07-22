const MongoClient = require('mongodb').MongoClient;
const url = require('url');

const express = require('express');
const router=express.Router();

const path = require('path');

const generatePassword = require('password-generator');
const generateEmail = require('random-email');

const app = express();



// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));





router.get('/',function(req,res,next){ 
  MongoClient.connect(process.env.MONGODB_URI,function(err,db){
    if(err) throw err;
    var dbo=db.db('heroku_tj9btv1k');

    dbo.createCollection("id_table",function(err,res){
      if(err) throw err;
      db.close();
    });
    dbo.createCollection("status_table",function(err,res){
      if(err) throw err;
      db.close();
    });



    dbo.collection('UserInput').insertOne({
      item: "canvas", qty: 100, tags: ["cotton"], size: { h: 28, w: 35.5, uom: "cm" }
    }, function(err,res){
      if(err) throw err;
      console.log("# of docs inserted: " + res.insertedCount);
      db.close();
    });


  });
});












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




const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);








