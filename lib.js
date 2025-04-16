import http from 'node:http';
import nodePath from 'node:path';
import fs from 'node:fs';
import mime from 'mime';
import url from 'node:url';
import merge from 'merge-descriptors';
import { match } from 'path-to-regexp';

let routes = [];

const addRoutes = (pattern, handler, method) => {
  routes.push({ pattern, handler, method })
};
export function initialize() {

  const lib = {
    get: function(pattern, handlerCallback) {
      addRoutes(pattern, handlerCallback, "GET");
    },
    post: function(pattern, handlerCallback) {
      addRoutes(pattern, handlerCallback, "POST");
    },
  };

  const server = http.createServer((req, res) => {

    let lastMatchedIdx = -1;
    const currentPath = url.parse(req.url)?.path;
    const currentMethod = req.method;

    function next() {
      const handlerFn = routes.find((route, i) => {
        const methodPtrn = match(route.pattern)
        const methodPtrnStatus = methodPtrn(currentPath);

        if (methodPtrnStatus && route.method === req.method && i > lastMatchedIdx) {
          lastMatchedIdx = i;
          return true;
        }
        else return false;

      });
    handlerFn.handler(req, res, next);

    }
    next();
  });


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
