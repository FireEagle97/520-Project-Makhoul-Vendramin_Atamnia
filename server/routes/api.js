const apiInfo = require("../controllers/fetchInfo.js");
const express = require("express");
const router = express.Router();


router.get('/:routeId/:tripId', async (req, res) => {

    try{
        
        let busInfo =  await apiInfo.getBusInfoFromDB(req.params.routeId, req.params.tripId);
        res.json({"response":busInfo});
    } catch(err){
        res.status(400).send({"error":"not supported in db"});
    }

})


router.get('/', async (req, res) => {
    try{
        let data =  await apiInfo.getBusesPositions()
        res.json(data);
    }catch(err){
        res.status(400).send({"error":"not supported in api"});
        
    }
})


module.exports = router;
