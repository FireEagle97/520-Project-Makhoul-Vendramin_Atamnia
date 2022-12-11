const DB = require("./db")

const demoRouteId = "440"
// these are 440 tripIds
const demoTripIdDirection0 = "260346666"
const demoTripIdDirection1 = "260346664"

const dbname = "StmDatabase"
const collection = "BusRoutes"

demoDb()

async function demoDb() {
    try {
        const db = new DB()
        await db.connect(dbname, collection)
        const busRoute = (await db.find({routeId: demoRouteId}))[0]
        console.log(busRoute)

        // show you can find direction from tripId
        proveDirectionFromTripId(demoTripIdDirection0, busRoute)
        proveDirectionFromTripId(demoTripIdDirection1, busRoute)
    } catch (e) {
        console.error(e.message);
        process.exit();
    }
}

function proveDirectionFromTripId(busRoute, busTrip){
    
    const direction = busRoute.direction1.tripIds.includes(busTrip) ? 1 : 0
    console.log(`Trip id ${busTrip} is direction: ${direction}`)
    console.log(`Its route shape is:`)
    console.log(busRoute["direction" + direction].shapes)
    console.log(`Its stops:`)
    console.log(busRoute["direction" + direction].stops)
}

module.exports = {demoDb}