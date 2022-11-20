import fetch from 'node-fetch';
import GtfsRealtimeBindings  from 'gtfs-realtime-bindings';


const url = 'https://api.stm.info/pub/od/gtfs-rt/ic/v2/tripUpdates';

(async () => {
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      apikey: "l7xxe0e4565b6761411c824e7d3565c2c6fc"
    }
  })
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  } else {
    const body = await response.arrayBuffer();
    console.log(body);
    // you have to convert the arrayBuffer into Uint8Array: 
    // https://github.com/protobufjs/protobuf.js/issues/869
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(new Uint8Array(body));
    feed.entity.forEach(function (entity) {
      // if (entity.trip_update) {
      //   console.log(entity.trip_update);
      // }
      console.log(entity);
    });
  }
})()




// request(requestSettings, function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     var feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);
//     feed.entity.forEach(function (entity) {
//       if (entity.trip_update) {
//         console.dir(entity.trip_update);
//       }
//     });
//   }
// });