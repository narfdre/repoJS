var express = require('express'),
	mongoose = require('mongoose'),
	db = mongoose.connect('mongodb://localhost/repojs'),
	schema = mongoose.Schema;

var catalog = new schema({
	name : {type : String, unique: true },
	url : String
	});

var item = mongoose.model('catalog', catalog);
var newItem = new item();
newItem.name = "jQuery";
newItem.url = "jQuery.com";
newItem.save();
var app = module.exports = express.createServer();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.get('/getLib', function(req, res){
  console.log('getting library');
  console.log(req.query.callback);
  console.log(req.param('lib'))

  res.header('Content-Type', 'application/json');
  res.header('Charset', 'utf-8')
  res.send(req.query.callback + '({"library" : "'+ req.param('lib') +'"})');
  
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

item.find({}, function (err, docs) {
  console.log(docs);
});