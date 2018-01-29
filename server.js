//  OpenShift sample Node application
var express = require('express'),
    fs      = require('fs'),
   // ejs     = require('ejs'),
    //morgan  = require('morgan'),
	httpProxy = require('http-proxy');
    

var port = process.env.PORT || 8080;
var ip = process.env.IP  || '0.0.0.0';
var env = process.env.ENVIRONMENT;



var server = express();
server.use(express.static(__dirname + '/src'));
server.set('views', __dirname + '/src');
server.set('port', port);
//server.engine('html', ejs.renderFile);
//server.use(morgan('combined'))

// error handling
server.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

//server.get('/', function (req, res, next) {
//    res.render('index.html');
//});

server.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = server ;