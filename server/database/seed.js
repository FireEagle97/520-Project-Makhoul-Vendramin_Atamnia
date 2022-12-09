"use strict"

const DB = require("./db")

const fs = require("fs");
const { parse } = require("csv-parse");

const dbname = "StmDatabase"
const collection = "BusRoutes"
const busRoutes = []

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
 * maybe (not likely)
 */

(async () => {
  try {
    const db = new DB();
    await db.connect(dbname, collection);
    let num = await db.createMany(busRoutes);
    console.log(`Inserted ${num} bus routes`);
  } catch (e) {
    console.error("could not connect");
    process.exit();
  }
})();
