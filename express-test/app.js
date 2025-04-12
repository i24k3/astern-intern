const express = require("express");

const server = express();

server.get("/abc/*splat", (req, res, next) => {
  console.log("GET abc");
  next();
  console.log("3")
//   res.end("<h1>abc path</h1>");
})

server.get("/abc/def", (req, res) => {
    console.log("GET abc 2");
    // res.end("<h1>abc path 2</h1>");
  })

server.post("/abc", (req, res) => {
  console.log("POST abc");
  res.end('post req -rout post');
})

server.get("/def", (req, res) => {
  console.log("GET def");
  res.end("<h1>def path</h1>");
})

server.listen(3000)
