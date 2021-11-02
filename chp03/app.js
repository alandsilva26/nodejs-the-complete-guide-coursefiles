const http = require("http");
const fs = require("fs");

// basic implementation of a nodejs server
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');

    const url = req.url;
    const method = req.method;

    if(url === '/') {
        res.write('<h1>Welcome to the home page.</h1>');
        res.write('<form action="/message" method="POST"><input placeholder="Enter your name" type="text" name="name" required /><button type="submit">Submit</button></form>');
        return res.end();
    }

    if(url === '/message' && method === 'POST') {
        const body = [];
        // will listen to stream of data and write chunks to array
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        // will fire once all data is received. remember return
        return req.on('end', () => {
            // Buffer provided globally by nodejs. Concat and convert to string as we know incomming data is text
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            // if we write to file synchronously it will impact server performance
            // fs.writeFileSync('message.txt', message);
            fs.writeFile('name.txt', message + '-', { flag: 'a' }, (err) => {

                // redirect status code
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }

    res.write('<h1>404 page not found</h1>');
    res.end();
});

server.listen(4000, () => {
    console.log("Server started on port 4000");
});
