import {initialize, staticRouter} from "./lib.js"

const server = initialize();
server.get("/abc", (req, res, next) => {
  console.log("get abc 01");
  next();
  //res.end("<h1>get abc 01</h1>");
})


server.post("/abc", (req, res) => {
  console.log("POST abc");
  res.end('post req -rout post');
})


server.get("/abc", (req, res) => {
  console.log("GET abc - 02");
  res.end("<h1>get abc -  02 </h1>");
})

server.get("/ghi", (req, res) => {
  console.log("GET ghi- 01");
  res.end("<h1>get ghi-  01 </h1>");
})


server.listen(3000)
