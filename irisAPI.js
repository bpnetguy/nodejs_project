var http = require('https');
var urlUtil = require('url');
var config = require('./config');


var urls  = {
    'login': "https://www.irissmarthome.com/myhome/index/login/format/json/",
    'list' : "https://www.irissmarthome.com/myhome/index/ajax"
};


var createRequestOption = function(url) {
    var urlBits = urlUtil.parse(url);
    var httpOptions = {
        host:urlBits.hostname,
	followRedirect: true,
        port:443,
        path:urlBits.path
    };
    
    return httpOptions;

}


var Cookie = "";
var getCookies = function(cookies) {
    var i = 0;
    var tmp = {};
    for(i=0; i < cookies.length;i++) {
        var ar =  cookies[i].split(" ")[0].split("=")
        tmp[ar[0]] = ar[1];
    }

    var result = "";
    for (key in tmp) {
      result += key + "=" + tmp[key] + ";";
      // use key and value here
    }
    return result;
}
var login = function(success){
    var postData = 'username=' + config.username +  '&password=' + config.password + '&rememberMyUsername=0';
    var httpOptions = createRequestOption(urls['login'])
    httpOptions.method = "POST"
    httpOptions.headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
    };
    var req = http.request(httpOptions, function (response){
        response.setEncoding('utf8');
        response.on('data', function(chunk) {
            
            var cookie = getCookies(response.headers['set-cookie'])
            success(cookie);
        });
    });
    req.write(postData);
    req.end();
}

exports.list = function(options)  {
    login(function(cookie) {
        var postData = "Controls=%23%2Fcontrols%2Fwidget%2Fformat%2Fjson&AlarmWidget=%23%2Falarm%2Fwidget&AlarmOverview=%23%2Falarm%2Foverview&Magic=%23%2Frules%2Fmagic%2Freload%2Ftrue%2Fcategory%2FALARM%2Fformat%2Fjson";
        var httpOptions = createRequestOption(urls['list'])
        httpOptions.method = "POST"
        httpOptions.headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length,
            'Cookie':cookie
        };
        var req = http.request(httpOptions, function (response){
            response.setEncoding('utf8');
            response.on('data', function(chunk) {
                options.success && options.success(chunk);
            });
        });
        req.write(postData);
        req.end();
    });

}

