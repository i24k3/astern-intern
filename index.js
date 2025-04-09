'use strict';
function index(socket) {
      socket.write('HTTP/1.0 200 OK\r\n' + 'Content-Type: text/html\r\n' + '\r\n');
      const code = `
      <div>
        <h1>Lorem ipsum...</h1>
        <p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras imperdiet sem massa, vel auctor nisl rutrum vitae. Sed tristique fermentum diam. Ut risus risus, suscipit ut odio auctor, semper vulputate erat. Praesent id eros eget nulla pellentesque vulputate sit amet sed massa. Fusce ullamcorper semper efficitur. Ut vitae ipsum tellus. Praesent faucibus molestie faucibus. Suspendisse condimentum nisl in enim venenatis, in elementum nulla suscipit. Proin scelerisque, libero nec condimentum volutpat, leo turpis tristique dui, quis interdum tellus erat in sem. Nullam semper malesuada nisi quis placerat. Suspendisse a turpis vitae velit luctus egestas ac at libero. Praesent laoreet vestibulum turpis. Integer maximus egestas vestibulum. Donec consectetur turpis a erat malesuada, elementum aliquet tellus consequat. Nam at ligula eu sem aliquam gravida. Duis non risus a urna venenatis dapibus eu ac tortor.
        </p>
        <button>
          getinfo
        </button>
      </div>`;
      socket.write(code);
}

export default index;
