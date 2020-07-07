// <!-- "make reservation" button will be the POST request  -->

// dependancies

var express = require("express");
var path = require("path");
var db = require("./db/db.json");
var fs = require("fs");

// set up the express app
var app = express();
var PORT = process.env.PORT || 3000;
const { v1: uuidv1 } = require('uuid');



// set up express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// array variables

// html routes
app.get("/notes", function (req, res) {

  // res.send("homepage")
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function (req, res) {


  fs.readFile("./db/db.json", "utf8", function(error, data) {

    if (error) {
      return console.log(error);
    }
  
    res.json(JSON.parse(data));
  
  });

});
app.post("/api/notes", function (req, res) {
  //userinput == req.body
   req.body.id = uuidv1();
  db.push(req.body);
  fs.writeFile("./db/db.json", JSON.stringify(db), function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("Success!");
  });

  res.json(db);
});

app.delete("/api/notes/:id", function (req, res) {
  //userinput == req.body

//   const result = db.filter(word => word.id != req.params.id);
 console.log(req.params.id)
//first find loc of the speicif data
console.log(db.indexOf(req.params.id))
var index=0;
for(var i=0;i <db.length;i++){
  if(db[i].id==req.params.id){
    index=i;
  }
}
console.log(index);

//then get that index and remove it off the db 
 db.splice(index, 1)
  //then update your file
  fs.writeFile(
    "./db/db.json",
    JSON.stringify(db),
    function (err) {
      if (err) {
        return console.log(err);
      }

      console.log("delete success!");
    }
  );

  res.json(db);
});

app.get("*", function (req, res) {
  // res.send("reservation form")
  res.sendFile(path.join(__dirname, "./public/index.html"));
});



// port listener
app.listen(PORT, function () {
  console.log("App listening on PORT" + PORT);
});
