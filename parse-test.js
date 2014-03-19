var parseString = require('xml2js').parseString

var xml = '<vehicle id="1098" routeTag="51B" lat="37.868206" lon="-122.2973022" secsSinceReport="34" predictable="true" heading="255" speedKmHr="2"/>'

parseString(xml, function (err, result) {
  console.log(result.vehicle.$)
})