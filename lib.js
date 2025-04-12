import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs';
import mime from 'mime';
import url from 'node:url';
import merge from 'merge-descriptors';

export function initialize(){

  const routes = {};  

  /*

  const routes = {
  '/' : function (req, res) {
    // code of this 
    }

  '/abc': function (req, res) {
   // code of abc goes here
    }
  }



  // execute the / 

  

  */


  //initialization
  const lib = {get: (path, handler) => {
    routes[path] = handler
  /*

  localhost:3000/ => {/: (req,res)}
  localhost:3000/abc/ => {/abc: (req, res)}

  */
  }};

  const server = http.createServer((req, res) => {

    if(req.method === "GET"){
      console.log('the req.url', req.url);

      routes[url.parse(req.url).path](req,res);
    }

  })

  return merge(server, lib);
}

/**
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res
  **/
export function staticRouter(req, res) {
  const reqUrl = url.parse(req.url);
  const reqPath = path.join(reqUrl.pathname === "/" ? "/index.html" : reqUrl.pathname);
  const staticPath = path.join("./", "public", reqPath);
  const fileExists = fs.existsSync(staticPath);

  if (fileExists) {
    const file = fs.readFileSync(staticPath);
    res.setHeader("Content-Type", mime.getType(staticPath))
    res.end(file)
    return true;
  }
  return false;
}
