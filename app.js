const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req);
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from Nodejs</h1></body>");
  res.write("</html>");
});

server.listen(3000);
