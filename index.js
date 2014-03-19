// <vehicle id="1098" routeTag="51B" lat="37.868206" lon="-122.2973022" secsSinceReport="34" predictable="true" heading="255" speedKmHr="2"/>
var request = require('request')
var parseString = require('xml2js').parseString
var crypto = require('crypto')

module.exports = function (agency, interval, onNewLocation) {
  var baseURL = "http://webservices.nextbus.com/service/publicXMLFeed?command=vehicleLocations&a=" + agency
  
  makeRequest()
  
  function makeRequest() {
    var now = Date.now() - interval
    request(baseURL + "&t=" + now, function(err, resp, xml) {
      if (err) return onNewLocation(err)
      console.log('debug', xml)
      xml.split('\n').map(function(line) {
        if (line.indexOf('<vehicle') > -1) {
          parseString(line, function (err, result) {
            var bus = result.vehicle.$
            onNewLocation(null, bus)
          })
        }
      })
      setTimeout(makeRequest, interval)
    })
  }
}
