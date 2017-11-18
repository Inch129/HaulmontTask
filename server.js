const http = require('http');
var fs = require("fs");
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log(`Запрошенный адрес: ${req.url}`);
        // получаем путь после слеша
        var filePath = "./template.html";
        fs.readFile(filePath,"utf-8", function (error, data) {

            if (error) {

                res.statusCode = 404;
                res.end("Ресурс не найден!");
            } else {
                res.end("тестик");
            }
            return;
        })
  
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
