// <!-- "make reservation" button will be the POST request  -->

// dependancies

var express = require("express");
var path = require("path");
var db = require("./db/db.json");
var fs = require("fs");

// set up the express app
var app = express();
var PORT = 4040;

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
  res.json(db);
});
app.post("/api/notes", function (req, res) {
  //userinput == req.body
  req.body.id = db.length;
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
  console.log(req.params.id)

  const result = db.filter(word => word.id != req.params.id);
console.log(result)

  // db.splice(req.params.id, 1)
  fs.writeFile(
    "./db/db.json",
    JSON.stringify(result),
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

// // data table routes
// app.get("/api/tables", function (req, res) {
//   return res.json(tables);
// });

// app.get("/api/waitlist", function (req, res) {
//   return res.json(waitlist);
// });

// port listener
app.listen(PORT, function () {
  console.log("App listening on PORT" + PORT);
});
