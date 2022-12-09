"use strict"
require("dotenv").config();
const dbUrl = process.env.ATLAS_URI;
const { MongoClient } = require("mongodb");

let instance

/**
 * Note! none of the errors are handled here, 
 * so any client of this module has to treat the errors
 */

class DB{
  constructor(){
    //instance is the singleton, defined in outer scope
    if (!instance){
      instance = this;
      this.client = new MongoClient(dbUrl);
      this.db = null;
      this.collection = null;
    }
    return instance;
  }

  async connect(dbname, collName) {
    if (instance.db){
      return;
    }
    await instance.client.connect();
    instance.db = await instance.client.db(dbname);
    console.log("Successfully connected to MongoDB database " + dbname);
    instance.collection = await instance.db.collection(collName)
  }

  async close() {
    await instance.client.close();
    instance = null;
  }

  async readAll() {
    // projection if 0 means dont return this field, 1 means return it
    return await instance.collection.find().projection({ _id: 0 }).toArray();
    
  }

  async insert(busRoute) {
    return await instance.collection.insertOne(busRoute);
  }

  async insertMany(busRoutes) {
    return await instance.collection.insertMany(busRoutes);
  }
}

module.exports = DB

// Quick docs from the lecture slides

/**
 * A Mongo query is an object that specifies the criteria for the query. 
 * For example, to find all quotes with a rating greater than 3:

  async readAll() {
    return await instance.collection.find({ rating: { $gt: 3 } }).toArray();
  }

  FETCHING: https://www.mongodb.com/docs/manual/reference/operator/query/
  CRUD: https://www.mongodb.com/docs/manual/crud/
  */
