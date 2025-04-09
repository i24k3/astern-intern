
'use strict';
const main = (socket) => {
      socket.write('HTTP/1.0 200 OK\r\n' + 'Content-Type: text/html\r\n' + '\r\n');
      const page = `<h1> hey it's working...`;
      socket.write(page);
};
export default main;
