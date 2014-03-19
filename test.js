var createFeed = require('./')

createFeed('actransit', 1000 * 45, function onLocation(err, location) {
  if (err) throw err
  console.log(JSON.stringify(location))
})