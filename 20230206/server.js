console.log('js작동된다.');
const http = require('http'); // nodejs 설치 시 사용할 수 있는 require 함수
console.log(http);
const fs = require('fs'); // nodejs가 제공하는 함수

const mySet = function (request, response) {
    let url = request.url;
    console.log(`request.url >> ${url}`); // '/'
    if (url === '/') {
        url = '/index.html';
    }
    response.writeHead(200, {
        'Content-type': 'text/html',
    });
    const htmlFile = fs.readFileSync(__dirname + url);
    console.log(`__dirname >> ${__dirname}`); // C:\Users\user\Documents\vuejs\20230206
    response.end(htmlFile);
}
const app = http.createServer(mySet);

app.listen(8080);
