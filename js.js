
'use strict';
import mime from 'mime';
const js = (socket) => {
  socket.write('HTTP/1.0 200 OK\r\n' + 'Content-Type: text/html\r\n' + '\r\n');
  socket.write(`
  <!DOCTYPE html>
    <html>
      <head>
      <title>js</title>
    <style>
  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: monospace;
  }
  h1 {
  border-left : 11px solid black;
  margin: 1%;
  padding: 1%;
  }

  </style>
  </head>
  <body>
  <script>

  console.log('the js is working dawg');
  document.body.appendChild(document.createElement('h1'));
  const message = document.querySelector('h1');
  message.innerText = 'check the console <CTRL+SHIFT+I> for javascript message.'

  </script>
  </body>
  </html>
`);
}
export default js;
