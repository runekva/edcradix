var express = require('express');
var request = require('request');

var app = express();

//Getting api from env variable
var apiKey = process.env.QUOTEKEY;

//Getting port and normalizing value
var port = normalizePort(process.env.PORT || '3000');

//Defining the options for the Quote post
var quoteUrlOptions = {
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'X-Mashape-Key': apiKey
    },
    form: {
        cat: 'famous',
        count: 1
    }
};

//Default entrypoint for the root
//Requesting root will cause a quote to be requested
app.get('/', (req, res) => {
    request.post(quoteUrlOptions, function (error, response, body) {
        if (error) {
            console.log('Error getting quote : ', error)
            res.send('No quote available ... wonder why?')
        } else {
            console.log('Got response: ' + body)

            var qTxt = JSON.parse(body)

            if (Array.isArray(qTxt)) {
                res.send(qTxt[0].quote + ' - ' + qTxt[0].author)
            } else {
                res.send(body)
            }
        }
    })
});

// Normalise the webserver port
function normalizePort(val) {
    var port = parseInt(val, 10)

    if (isNaN(port)) {
        // named pipe
        return val
    }

    if (port >= 0) {
        // port number
        return port
    }

    return false
}


// Give warning to console if api is blank
if (apiKey === '') {
    console.log('Warning - missing key to quote api');
}

//Starting webserver
app.listen(port, () => console.log('Quote app is listening on port %s!', port))

module.exports = normalizePort;