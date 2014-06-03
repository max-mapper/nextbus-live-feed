var createFeed = require('./')
var Dat = require('dat')
var crypto = require('crypto')

var dat = new Dat('./data/', { port: process.env['PORT'] }, function(err) {
  if (err) throw err
  createFeed('actransit', 1000 * 5, function onLocation(err, location) {
    if (err) return console.error('error', err)
    dat.put(location, {primary: ['lastUpdated', 'id', 'lat', 'lon'], separator: '|'}, function(err, updated) {
      // do nothing
    })
  })
})
