# nextbus-live-feed

get vehicle locations from the nextbus API as JSON

[![NPM](https://nodei.co/npm/nextbus-live-feed.png)](https://nodei.co/npm/nextbus-live-feed/)

```
  var feed = require('nextbus-live-feed')
  var fetchEvery = 1000 * 5
  feed('actransit', fetchEvery, function onLocation(err, location) {
    
  })
```

data looks like this:

```
{
  dirTag: "51A_91_1",
  heading: "345",
  id: "1054",
  lastUpdated: "1396983363000",
  lat: "37.7824325",
  lon: "-122.2763977",
  predictable: "true",
  routeTag: "51A",
  secsSinceReport: "68",
  speedKmHr: "5"
}
````
