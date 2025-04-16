const express = require("express");

const server = express();
/*
server.get("/abc/*splat", (req, res, next) => {
  console.log("GET /abc/*");
  next();
  console.log('get next /abc....');
});
*/

server.get("/", (req, res) => {
  console.log("1", req.params);
  res.send("/")
})

server.get("/posts/muneeb/into-to-node/view", (req, res, next ) => {
  console.log("2", req.params);
  next(); 
  console.log("special easter egg response")
})

server.get("/posts/:userid/:postId/view", (req, res) => {
  console.log("3", req.params);
  res.send("response")
  //res.socket.end();
})

//server.get("/abc/def", (req, res, next) => {
//  console.log("GET abc/ - 2");
//  next();
//  console.log("end")
//  res.end("<h1>get /abc/ - 2</h1>");
//});
//
//server.post("/def", (req, res) => {
//  console.log("POST abc");
//  res.end('post req -rout post');
//});
//
//server.get("/abc/def", (req, res) => {
//  console.log("GET abc/def");
//  //res.end("<h1>get /abc/def</h1>");
//});




server.listen(3000)
