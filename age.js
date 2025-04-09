'use strict';
import mime from 'mime';
import fs from 'fs';

const age = (socket) => {


  socket.write('HTTP/1.0 200 OK\r\n' + `Content-Type: ${mime.getType('age.html')}\r\n` + '\r\n');
  const file = fs.readFileSync('./age.html');
  socket.write(file);
};
export default age;
