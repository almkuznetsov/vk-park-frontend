const http = require('http');
const fs = require('fs');
const debug = require('debug');

const SERVER_PORT = 8001;
const page404 = fs.readFileSync('./public/404.html');


const server = http.createServer((request, response) => {
    //const url = request.url; аналогично тому, что ниже
    const {url} = request;
    const normalizedurl = url === '/' ? 'index.html' : url;
    //const filepath = './public' + url; аналогично тому, что ниже
    const filepath = `./public${normalizedurl}`;
    debug.log('filepath', filepath);

    fs.readFile(filepath, (err, data) => {
        if (err) {
            debug.log('error');
            console.log('oopsie');
            response.write(page404);
            response.end();
            return;
        }

        response.write(data);
        response.end();
    })
});

debug.log('Starting server');
console.log('starting server');
server.listen(SERVER_PORT);