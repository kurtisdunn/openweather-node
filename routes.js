// app/routes.js
module.exports = function(app, _, http) {
  app.get('/weather/6620339', function(req, res) {
    var body = JSON.stringify({
      "id": 6620339,
      "units": 'metricm'
    });
    var options = {
      host: 'api.openweathermap.org',
      port: '80',
      path: '/data/2.5/weather?id=6620339&units=metric',
      method: 'GET',
      headers: {
        'APPID': '<< APPID >>',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    }
    var req = http.request(options, function(data, err) {
      data.setEncoding('utf8');
      var i = "";
      if (data.statusCode == 503 && !err) {
        console.log('api.openweathermap.org: ', data.statusCode)
      } else if (data.statusCode == 403 && !err) {
        console.log('api.openweathermap.org: ', data.statusCode)
      } else {
        console.log('api.openweathermap.org: ', data.statusCode)
        data.on('data', function(dataData) {
          i += dataData;
        });
        data.on('end', function() {
          var json = JSON.parse(i);
          console.log("rsp", json)
          res.jsonp(json);
        });
      }
    });
    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });
    req.write(body);
    req.end();
  });
}