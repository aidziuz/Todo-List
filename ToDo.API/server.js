var restify = require('restify'),
    fs = require('fs');

var controllers = {},
    controllersPath = __dirname + '/app/controllers';

fs.readdirSync(controllersPath).forEach(function (file){
    if (file.indexOf('.js') != -1){
        controllers[file.split('.')[0]] = require(controllersPath + '/' + file);
    }
});

var server = restify.createServer();

server
    .use(restify.fullResponse())
    .use(restify.bodyParser());

server.on('NotFound', function (req, res, next) {
    res.send(404);
});   

server.use(restify.CORS({
  origins: ['https://localhost:30081', 'http://localhost:30081'], 
}));

server.get("/items", controllers.items.getItems);
server.post("/items", controllers.items.createItem);
server.del("/items/:itemId", controllers.items.deleteItem);

var port = process.env.PORT || 30080;
server.listen(port, function(err){
    if (err)
        console.error(err);
    else 
        console.log('Listening on port: ' + port);
});

if (process.env.environment == 'production')
    process.on('uncaughtException', function (err){
        console.error(JSON.parse(JSON.stringify(err, ['stack', 'message', 'inner'], 2)));
    });