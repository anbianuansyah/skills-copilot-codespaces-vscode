// create web server
const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const qs = require('querystring');
const comments = [];
// create web server
http.createServer((req, res) => {
  const pathname = url.parse(req.url).pathname;
  if (pathname === '/') {
    fs.readFile(path.resolve(__dirname, 'index.html'), (err, data) => {
      if (err) {
        throw err;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else if (pathname === '/comment') {
    if (req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', () => {
        const query = qs.parse(body);
        comments.push(query);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify(comments));
      });
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
}).listen(3000, () => {
  console.log('Server is running...');
});