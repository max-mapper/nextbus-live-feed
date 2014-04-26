var createFeed = require('./')
var Dat = require('dat')
var hyper = require('leveldown-hyper')
var crypto = require('crypto')

var dat = new Dat('./data/', { port: process.env['PORT'], backend: hyper }, function(err) {
  if (err) throw err
  createFeed('actransit', 1000 * 5, function onLocation(err, location) {
    if (err) return console.error('error', err)
    
    var ws = dat.createWriteStream({ objects: true, primary: ['lastUpdated', 'id', 'lat', 'lon'], separator: '|' })
    
    ws.on('error', function(e) {
      // console.log('write err', e)
    })
    
    ws.write(location)
    ws.end()
  })
})
