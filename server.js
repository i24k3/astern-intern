
'use strict';

import net from 'net';
import fs from 'fs';
import mime from 'mime';
import path from 'path'

import main from './main.js';
import index from './index.js';
import js from './js.js';
import age from './age.js';

const host = 'localhost';
const port = 2000;

/**
 * @type {{body: string, headers: Record<string, string | number> & {"content-length": number}, fetchMethod: string, urlPath: string}}
 **/
const requestInitialValue = {
  body: '',
  headers: { "content-length": 0 },
  fetchMethod: '',
  path: '',
};

const stringToObject = (stringData, seprator) => {
  return stringData.split('\r\n').reduce((accumilator, line) => {
    const [key, value] = line.split(seprator);
    accumilator[key] = value;
    return accumilator;
  }, {});
}

const parseHeaders = (rawHeaders) => {
  const headers = stringToObject(rawHeaders, ': ');
  const newObject = {};
  Object.keys(headers).forEach((key) => {
    newObject[key.toLowerCase()] = headers[key];
  });
  newObject["content-length"] = newObject['content-length'] ? Number(newObject["content-length"]) : 0;
  return newObject;
};



const cleanUp = (socket, request) => {
  socket.end();
  request = { ...requestInitialValue };
};


const filePath = (request)=> {
  const filename = path.basename(request.path)
  console.log(filename);
}

/**
 * @param {{body: string, headers: Record<string, string | number> & {"content-length": number}, fetchMethod: "GET" | "POST" | "DELETE" | "PUT", path: string}} request
 * @param {net.Socket} socket
 **/
const processResponse = (request, socket) => {
  if (request.fetchMethod === "GET") {
    const reqPath = request.path === "/" ? "/index.html": request.path;
    const staticPath = path.join("./", "public", reqPath);
    const fileExists = fs.existsSync(staticPath);
    if(fileExists){
      const file = fs.readFileSync(staticPath);
      socket.write('HTTP/1.0 200 OK\r\n' + `Content-Type: ${mime.getType(staticPath)}\r\nContent-Length: ${file.length}\r\n\r\n`);
      socket.write(file);
      return;
    }

    switch (request.path) {
      case '/':
        main(socket);
        cleanUp(socket, request);
        break;

  /*
      case '/img':
        socket.write('HTTP/1.0 200 OK\r\n' + `Content-Type: ${mime.getType("./public/img.jpg")}\r\n` + '\r\n');

        const url  = path.join('public',request.path);
        console.log(`url ${url}`);

        socket.write(image);
        cleanUp(socket, request);
        break;


      case '/html':
        index(socket);
        cleanUp(socket, request);
        break;

      case '/js':
        js(socket);
        cleanUp(socket, request);
        break;

      case '/age':
        age(socket);
        cleanUp(socket, request);
        break;

      case '/img':
        const image = fs.readFileSync('img.jpg');
        socket.write('HTTP/1.0 200 OK\r\n' + `Content-Type: ${mime.getType("img.jpg")}\r\n` + '\r\n');
        console.log(mime.getType('img.jpg'))
        socket.write(image);
        cleanUp(socket, request);
        break;

      case '/manga':
        const pdf = fs.readFileSync('./goodby.pdf');


        socket.write('HTTP/1.0 200 OK\r\n' + `Content-Type:${mime.getType("./goodby.pdf")}\r\n` + '\r\n');
        socket.write(pdf);

        cleanUp(socket, request);
        break;

*/

      default:
        const f = fs.readFileSync('./public/error.html');
        socket.write('HTTP/1.0 200 OK\r\n' + 'Content-Type: text/html\r\n' + '\r\n');
        socket.write(f);

        //error(socket);
        cleanUp(socket, request);
    }
  } else if (request.fetchMethod === "POST") {

    switch (request.path) {
      case '/image':
        const len = request.headers['content-length'];
        console.log(len);
        socket.write('HTTP/1.0 200 OK\r\n' + 'Content-Type: text/html\r\n' + '\r\n');
        socket.write(`
<html>
<head>
</head>
<body>
  <img class='image' src='${request.body}'>
</body>
</html>
`);
        console.log(request.body);

        break;

      default:
        //error(socket);
        cleanUp(socket, request);
    }

  }
};

const tcpServer = net.createServer((socket) => {
  let request = { ...requestInitialValue };
  socket.on('data', (packet) => {

    // first iteration | first packet
    if (request.body === '') {
      const [requestLine, rawHeaders, firstBodyChunk] = packet.toString().split('\r\n\r\n').reduce((accumilator, currentSlice, index) => {
        const returnVal = [...accumilator];

        /* remold the array where the first index is requestline. */
        if (index === 0) {
          const lines = currentSlice.split('\n');
          returnVal.push(lines.shift());
          returnVal.push(lines.join('\n'));
        } else {
          returnVal.push(currentSlice);
        }
        return returnVal;
      }, []);


      /* setting the values */
      request.headers = parseHeaders(rawHeaders);
      request.fetchMethod = requestLine.split(' ')[0];
      request.path = requestLine.split(' ')[1];
      request.body += firstBodyChunk;
    } else { //for all packets (even the last one) except firstBodyChunk
      request.body += packet.toString();
    }



    if (request.body.length >= request.headers["content-length"]) { //last packet
      processResponse(request, socket);
    }
  })
});

tcpServer.listen(port, host);
