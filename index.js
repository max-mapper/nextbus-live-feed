// <vehicle id="1098" routeTag="51B" lat="37.868206" lon="-122.2973022" secsSinceReport="34" predictable="true" heading="255" speedKmHr="2"/>
var request = require('request')
var parseString = require('xml2js').parseString

module.exports = function (agency, interval, onNewLocation) {
  var baseURL = "http://webservices.nextbus.com/service/publicXMLFeed?command=vehicleLocations&a=" + agency
  
  makeRequest()
  
  // this works by:
  // 1. using &t=0 to get all bus locations
  // 2. converting each location line from XML to JSON
  // 3. taking the secsSinceReport relative time and turning it into an absolute timestamp (lastUpdated)
  function makeRequest() {
    request(baseURL + "&t=0", function(err, resp, xml) {
      if (err) return onNewLocation(err)
      var lastTime = +new Date()
      xml.split('\n').reverse().map(function(line) {
        if (line.indexOf('<vehicle') > -1) {
          parseString(line, function (err, result) {
            if (err) return onNewLocation(err)
            var bus = result.vehicle.$
            var secs = +bus.secsSinceReport
            var adjusted = lastTime - (secs * 1000)
            adjusted = adjusted.toString().split('')
            adjusted = adjusted.slice(0, adjusted.length - 3)
            adjusted = +adjusted.join('') + '000'
            bus.lastUpdated = adjusted
            onNewLocation(null, bus)
          })
        }
      })
      setTimeout(makeRequest, interval)
    })
  }
}
