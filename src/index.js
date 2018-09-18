var express = require('express');
var request = require('request');

var app = express();
var apiKey = process.env.QUOTEKEY;

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

request.post(quoteUrlOptions, function (error, response, body) {
    if (error) {
        console.log('Error getting quote : ', error);
    } else {
        console.log('Got response: ' + body)
    }
});