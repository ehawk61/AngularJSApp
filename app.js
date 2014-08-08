var express = require('express');
var minimist = require('minimist');
var httpProxy = require('http-proxy');
var domain = require('domain');
var http = require('http');
var path = require('path');
var mongoclient = require('mongodb');
var fs = require('fs');
var app = express();
var parsedOptions = minimist(process.argv.slice(2));
var _ = require('underscore');


var portToUse = parsedOptions.port || 5000;
var mongoUrl = 'mongodb://127.0.0.1/angluar';

app.set('port', portToUse);
app.use(express.json());
app.use(express.static(path.join(__dirname, './')));
app.use(require('connect-restreamer')());

var urlPrefix = '/countries';

var schemaList = ['countries'];

var myRandomInteger = function() {
    return Math.ceil(Math.random() * 1000000);
};

var d = domain.create();
d.on('error', function(err) {
    console.log("Error processing request");
    console.log(err);
});
d.run(function() {
    if (parsedOptions.proxy) {
        console.log("Proxying to " + parsedOptions.proxy);

        var proxy = undefined;
        var restProxy = httpProxy.createProxyServer();
        var options = {target: parsedOptions.proxy, ws: true};
        var pathMatch = "/ui/*";
        app.all(pathMatch, function(req, res) {
            restProxy.web(req, res, options);
        });

        http.createServer(app).listen(app.get('port'), function() {
            console.log("Express Web listening on port: " + app.get('port'));
        });



    }
    else {
        //add your own sample data here.
        console.log("Using file sources");

        app.get('/countries', function(req, res) {
            mongoclient.connect(mongoUrl, function(err, db) {
                if (err)
                    throw err;
                var collection = db.collection('countries');
                console.log(req.query);
                collection.find(req.query).toArray(function(err, docs) {
                    if (err)
                        throw err;
                    console.log("countries...");
                    console.log(docs);
                    db.close();
                    res.send(docs);
                });

            });
        });
       
        app.get('/countries/:countryName',function(req, res){
            mongoclient.connect(mongoUrl, function(err,db){
                if(err)
                    throw err;
                var collection = db.collection('countries');

                console.log(req.params.countryName);
                collection.find({countryName: req.params.countryName}).toArray(function(err,docs){
                    if(err)
                        throw err;
                    console.log("Selective countries...");
                    console.log(docs);
                    db.close();
                    res.send(docs);
                });
            });
        });
        app.delete('/countries/:countryName',function(req, res){
            mongoclient.connect(mongoUrl, function(err,db){
                if(err)
                    throw err;
                var collection = db.collection('countries');

                console.log(req.params.countryName);
                collection.remove({countryName: req.params.countryName}, function(err){
                    if(err)
                        throw err;
                });
                console.log("deleted "+ req.params.countryName);
                db.close();                
            });
        });
        function loadSchema(schema, req, res) {

            var fileName = __dirname + '/data/' + schema + '.json';

            fs.readFile(fileName, 'utf8', function(err, data) {
                if (err) {
                    res.send(400, 'File for schema : ' + schema + ' not found.');
                }
                var jsonData = JSON.parse(data);
                mongoclient.connect(mongoUrl, function(err, db) {
                    if (err) {
                        throw err;
                        db.close();
                    }
                    db.collection(schema).drop(function(err, value) {
                        if (err) {
                            console.log(schema + " not found. Creating.");
                        }                    
                        db.createCollection(schema, function(err, collection) {
                            db.collection(schema).insert(jsonData, function(err, data) {
                                if (err) {
                                    console.log('Error inserting data into ' + schema + ' collection.');
                                    throw err;
                                    db.close();
                                }
                                db.close();
                            });
                        });
                    });
                });
            });
        }

       app.get('/data/load/:schema', function(req, res) {
            var schema = req.params.schema;

            if (schema === 'all') {
                _(schemaList).each(function(schema, req, res) {
                    loadSchema(schema, req, res);
                });
                res.send(200, 'Data inserted into all the schemas');
            }
            else {
                loadSchema(schema);
                res.send(200, 'Data inserted into ' + schema + ' collection.');
            }


        });

       http.createServer(app).listen(app.get('port'), function() {
            console.log("Express Web listening on port: " + app.get('port'));
        });

    }
});