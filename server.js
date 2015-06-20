var express = require('express'),
	 app = express(),
    path = require('path'),
    http = require('http'),
		_ = require('underscore');
	
// configuration ===============================================================

    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());


// routes ======================================================================
require('./routes.js')(app, _, http);

// launch ======================================================================
http.createServer(app).listen(app.get('port'), function () {
    console.log("Open Weather API > " + app.get('port'));
});




