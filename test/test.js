var assert = require('assert')
var expect = require('chai').expect

var normalizePort = require('../src/index.js')

describe('normalizePort(val)', function () {
  it('should normalise sting 3000 to int 3000', function () {
    var port = '3000'
    var normalizedPort = normalizePort(port)

    expect(normalizedPort).to.be.equal(3000)
  })

  it('should return value of type number', function () {
    var port = '3000'
    var normalizedPort = normalizePort(port)

    expect(normalizedPort).to.be.a('number')
  })
})
