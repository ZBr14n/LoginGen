const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;

const app = express();

const generatePassword = require('password-generator');

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

//include EJS
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');


let db=null;
let passwords=null;
let emails=null;


MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true } , function(err, database) {
  if(err){
    return console.log(err);
  }

  db=database;
}); 


// Put all API endpoints under '/api'
app.get('/api/passwords', (req, res) => {
  const count = 5;

  // Generate some passwords
    passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  )

  // Return them as json
  res.json(passwords);

  console.log(`Sent ${passwords} passwords`);
});


function randString(){
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let aux="";
  for(let i=0; i < 9; i++){
    aux+=str.charAt(Math.floor(Math.random()*63));    
  }
  return aux;
}

app.get('/api/emails',(req,res) => {
  
  emails = Array.from(Array(5).keys()).map(i => randString());
  res.json(emails);
  console.log(`${emails}`);  
});


app.post('/api/upload',(req,res)=>{
  //Keeping the db connection open otherwise it throws 'MongoError: server instance pool was destroyed'
  let myobj = [
    {emails},
    {passwords}
  ];

  let dbo = db.db("heroku_tj9btv1k");

  dbo.collection("UserInput").insertMany(myobj, (error, response) => {
    if (error) {
      return console.log(error);
    }

    console.log('this works!!!');

    res.sendStatus(201);
    //db.close();             
  });
});


//http://localhost:5000/logs/retrieveData

app.get('/logs/retrieveData',(req,res)=>{
  
  let dbo = db.db("heroku_tj9btv1k");
  
  dbo.collection('UserInput').find({}).toArray((err, result) => {
    
    if (err) return console.log(err);
     
     console.log(result);
     //res.status(200).json({ result });
     
      res.render('retrieveData',{mongod: result});

  });
  //  res.send(JSON.stringify({ result }))    
  
});


// Any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(PORT,()=>{console.log(`App started listening on ${PORT}`)});

