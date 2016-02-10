'use strict';

var express = require('express');

var app = express();
var path = require('path');
app.set('port', (process.env.PORT || 5000));



var router = express.Router();

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

router.get('/level:level/', function(req, res) {

    var levelNum = req.params.level;

    var options = {
        root: __dirname + '/',
        dotfiles: 'deny',
        headers: {
            'x-level': levelNum
        }
    };


    res.sendFile(path.join('slides.html'),options);
});

app.use('/', router);
app.use(express.static(__dirname + '/'));
app.listen(app.get('port'));
