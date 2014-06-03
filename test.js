var createFeed = require('./')
var Dat = require('dat')
var crypto = require('crypto')
var port = process.env['PORT']

var dat = new Dat('./data/', function(err) {
  if (err) throw err
  createFeed('actransit', 1000 * 5, function onLocation(err, location) {
    if (err) return console.error('error', err)
    dat.put(location, {primary: ['lastUpdated', 'id', 'lat', 'lon'], separator: '|'}, function(err, updated) {
      // do nothing
    })
  })
})

dat.listen(port, function(err) {
  if (err) return console.error('could not listen', err)
  console.log('listening on', port)
})
