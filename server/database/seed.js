"use strict"

const DB = require("./db")

const fs = require("fs");
const { parse } = require("csv-parse");

const dbname = "StmDatabase"
const collection = "BusRoutes"
const busRoutes = new Map()
// direction_id 0 = E or 0 = N, 1 = O or 1 = S

function parseCSV(path, treatRowCallback, endCallback) {
  fs.createReadStream(path)
    // eslint-disable-next-line camelcase
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", treatRowCallback)
    .on("end", endCallback)
    .on("error", function (error) {
      console.log(error.message);
    });
}

const gtfsFolderPath = "../../gtfs_stm/"
const seenRoutesSet = new Set()
const shapeIdToRouteIdCommaDirection = new Map()
const tripIdToRouteIdCommaDirection = new Map()
const stopIdToRouteIdCommaDirection = new Map()


parseRoutes(
  parseTrips(
    parseShapes(
      parseStopTimes(
        parseStops(() => {
          console.log("finished parsing")
          addBusRoutesToDB()
        })
      )
    )
  )
)


function parseRoutes(finishedCallback){
  parseCSV(gtfsFolderPath + "routes.txt", row => {
    //0: route_id, 3: route_long_name, 6: route_color
    busRoutes.set(row[0], {
      routeId: row[0],
      routeLongName: row[3],
      routeColor: row[6]
    })
  
    console.log(row);
  }, finishedCallback)
}

function parseTrips(finishedCallback){
  parseCSV(gtfsFolderPath + "trips.txt", row => {
    //0: route_id, 2: trip_id, 3: trip_headsign, 4: direction_id, 5: shape_id
  
    if(!seenRoutesSet.has(row[0] + row[4])){
      seenRoutesSet.add(row[0] + row[4])
      busRoutes.get(row[0])["direction" + row[4]] = {
        headsign: row[3],
        // maybe not needed
        tripId: row[2],
        shapeId: row[5], 
        // ---------------
        shapes: [],
        stops: []
      }
      shapeIdToRouteIdCommaDirection.set(row[5], row[0] + "," + row[4])
      tripIdToRouteIdCommaDirection.set(row[2], row[0] + "," + row[4])
      console.log(row);

    }
    
  }, finishedCallback)
}

function parseShapes(finishedCallback) {
  parseCSV(gtfsFolderPath + "shapes.txt", row => {
    //0: shape_id, 1: lat, 2: lon
  
    const routeId = shapeIdToRouteIdCommaDirection.get(row[0]).split(",")[0]
    const directionId = shapeIdToRouteIdCommaDirection.get(row[0]).split(",")[1]
  
    busRoutes.get(routeId)["direction" + directionId].shapes.push({
      lat: row[1],
      lon: row[2]
    })
    
    console.log(row);
  }, finishedCallback)
}


function parseStopTimes(finishedCallback) {
  parseCSV(gtfsFolderPath + "stop_times.txt", row => {
    //0: trip_id, 3: stop_id

    if(!tripIdToRouteIdCommaDirection.has(row[0])){
      const routeId = tripIdToRouteIdCommaDirection.get(row[0]).split(",")[0]
      const directionId = tripIdToRouteIdCommaDirection.get(row[0]).split(",")[1]
    
      stopIdToRouteIdCommaDirection.set(row[3], routeId + "," + directionId)
      
      console.log(row);
    }
  
    
  }, finishedCallback)
}

function parseStops(finishedCallback) {
  parseCSV(gtfsFolderPath + "stops.txt", row => {
    //0: stop_id, 2: stop_name, 3: lat, 4: lon  

    const routeId = stopIdToRouteIdCommaDirection.get(row[0]).split(",")[0]
    const directionId = stopIdToRouteIdCommaDirection.get(row[0]).split(",")[1]
    
    busRoutes.get(routeId)["direction" + directionId].stops.push({
      name: row[2],
      lat: row[3],
      lon: row[4]
    })

    console.log(row);
    
  }, finishedCallback)
}

// what we want
/**
 * route
 * other route info
 * 
 * south shape
 * south stops
 * 
 * north shape
 * north stops
 * 
 */

async function addBusRoutesToDB() {
  try {
    console.log("Adding bus routes to DB...");
    const db = new DB();
    await db.connect(dbname, collection);
    let num = await db.createMany(busRoutes);
    console.log(`Inserted ${num} bus routes`);
  } catch (e) {
    console.error("could not connect");
    process.exit();
  }
}
