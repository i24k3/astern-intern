import http from 'node:http';
import nodePath from 'node:path';
import fs from 'node:fs';
import mime from 'mime';
import url from 'node:url';
import merge from 'merge-descriptors';

export function initialize() {

  const getRoutes = {};
  const postRoutes = {}

  /*
  '/' : function (req, res) {...}

  '/abc': function (req, res) {...}
  }
  */


  //initialization
  const lib = {
    get: (path, handler) => {
      getRoutes[path] = handler
      /*
    
      localhost:3000/ => {/: (req,res)}
      localhost:3000/abc/ => {/abc: (req, res)}
    
      */
    },
    post: (path, handler) => {
      postRoutes[path] = handler;

    }
  };

  const server = http.createServer((req, res) => {

    if (req.method === "GET") {

      const handler = getRoutes[url.parse(req.url).path];
      typeof handler === "function" && handler(req, res);

    } else if (req.method === "POST") {
      const handler = postRoutes[url.parse(req.url).path]
      typeof handler === "function" && handler(req, res);
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
  const reqPath = nodePath.join(reqUrl.pathname === "/" ? "/index.html" : reqUrl.pathname);
  const staticPath = nodePath.join("./", "public", reqPath);
  const fileExists = fs.existsSync(staticPath);

  if (fileExists) {
    const file = fs.readFileSync(staticPath);
    res.setHeader("Content-Type", mime.getType(staticPath))
    res.end(file)
    return true;
  }
  return false;
}
