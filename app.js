import {initialize, staticRouter} from "./lib.js"

const server = initialize();

server.get("/abc", (req, res) => {
  console.log("GET abc");
  res.end("<h1>abc path</h1>");
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
