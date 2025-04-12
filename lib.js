import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs';
import mime from 'mime';
import url from 'node:url';
import merge from 'merge-descriptors';

export function initialize(){
  //initialization
  const lib = {get: (path, handler) => {
    console.log("adding get handler to path", path)
  }};

  const server = http.createServer((req, res) => {
    //code
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
