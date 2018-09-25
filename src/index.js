var express = require('express');
var request = require('request');
const promclient = require('prom-client');

const collectDefaultMetrics = promclient.collectDefaultMetrics;

var app = express();

//Getting api from env variable
var apiKey = process.env.QUOTEKEY;

//Getting port and normalizing value
var port = normalizePort(process.env.PORT || '3000');

// Collect default NodeJS metrics every 5000ms
promclient.collectDefaultMetrics({ timeout: 5000 });

// Histogram to keep track of API requests to third party services
const httpRequestDurationMicroseconds = new promclient.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['route', 'code'],
    // buckets for response times from 5ms to 6400, increasingly spaced
    buckets: [5, 15, 50, 100, 200, 300, 400, 600, 800, 1000, 1600, 3200, 6400]
});

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
    },
    time: true
};

//Default entrypoint for the root
//Requesting root will cause a quote to be requested
app.get('/', (req, res) => {
    request.post(quoteUrlOptions, function (error, response, body) {

        if(!error){
            // Record request durations in buckets
            httpRequestDurationMicroseconds
                .labels(quoteUrlOptions.url, response.statusCode)
                .observe(response.timingPhases.total)
        }

        if ( !error && response.statusCode >= 200 && response.statusCode <= 399) { // If HTTP status code in reply is between 200 and 399
            console.log('Got response: ' + body)

            var qTxt = JSON.parse(body)

            if (Array.isArray(qTxt)) {
                res.send(qTxt[0].quote + ' - ' + qTxt[0].author)
            } else {
                res.send(body)
            }
        }else{
            console.log('Error getting quote : ', error)
            res.status(500).send('No quote available ... wonder why?')
        }
    })
});

// Expose Prometheus-formatted metrics for scraping
app.get('/metrics', (req, res) => {
    res.set('Content-Type', promclient.register.contentType)
    res.end(promclient.register.metrics())
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