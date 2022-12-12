const fetch = require('node-fetch');
const DB = require("../database/db");
const GtfsRealtimeBindings = require('gtfs-realtime-bindings');
const dbname = "StmDatabase"
const collection = "BusRoutes"
const url = 'https://api.stm.info/pub/od/gtfs-rt/ic/v2/vehiclePositions';

async function fetchAPI(){
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
        const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(new Uint8Array(body));
        return feed
    }
}
async function getBusesPositions(){
    let feedlist = await fetchAPI()
    let positionsList = []
    feedlist.entity.forEach(entity => {
        let busPosition = {
            "routeId" : entity.vehicle.trip.routeId,
            "tripId" : entity.vehicle.trip.tripId,
            "position" : entity.vehicle.position,
            "occupancyStatus" : entity.vehicle.occupancyStatus
        }
        positionsList.push(busPosition)
    })

    return positionsList
}

async function getBusInfoFromDB(routeId, tripId){
   
    const db = new DB();
    await db.connect(dbname, collection);
    const busRoute = (await db.find({routeId: routeId}))[0];
    if (busRoute === undefined){
        return "bus Route doesn't Exist";
    }
    let direction;
    if (busRoute.direction1.tripIds.includes(tripId) ){
        direction = 1;
    }else if (busRoute.direction0.tripIds.includes(tripId) ){
        direction = 0;
    }else {
        direction = undefined;
        return "bus trip id doesn't exist";
    }
    let busInfo = {
        routeId : busRoute.routeId,
        tripId : tripId,
        direction : direction,
        busLane : busRoute["direction" + direction].shapes,
        busStops : busRoute["direction" + direction].stops,
        routeColor: busRoute.routeColor,
        routeLongName: busRoute.routeLongName,
        headSign: busRoute["direction" + direction].headsign
    }
    return busInfo;

}

module.exports = {getBusesPositions, getBusInfoFromDB}

