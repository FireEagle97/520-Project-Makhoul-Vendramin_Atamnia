/* eslint-disable strict */
const apiInfo = require("../controllers/trying-gtfs.js");
// import getBusesPositions from '../../trying-gtfs.mjs';
const express = require("express");
const router = express.Router();



router.get('/:busLine', (req, res) => {
    if(req.params.busLine.match("1")){
        try{
            res.json({"line": [
                [45.446466, -73.603118],
                [45.451158, -73.593242],
                [45.457010, -73.581691],
                [45.459441, -73.572021],
                [45.461894, -73.567074],
                [45.471063, -73.566267],
                [45.478465, -73.569336],
                [45.482509, -73.580180],
                [45.490068, -73.585812],
                [45.495570, -73.579310],
                [45.500879, -73.574715],
                [45.504064, -73.571586],
                [45.508220, -73.568433],
                [45.511033, -73.564899],
                [45.515226, -73.561082],
                [45.518831, -73.555837],
                [45.523988, -73.552703],
                [45.533504, -73.552196],
                [45.541717, -73.554192],
                [45.546832, -73.551391],
                [45.553688, -73.551757],
                [45.560687, -73.547530],
                [45.569285, -73.547336],
                [45.576843, -73.546710],
                [45.582736, -73.543133],
                [45.589431, -73.539269],
                [45.596572, -73.535376]
            ]});
        } catch(err){
            res.status(400).send({"error":"not supported in api"});
        }
    }else{
        res.status(400).send({"error":"no result in api"});
    }
})
router.get('/', async (req, res) => {
    try{
        let data =  await apiInfo.getBusesPositions();
        console.log("testing buses positions")
        data.forEach(position => {
            console.log("postions " + position)
        });
     
        res.json(data);
    }catch(err){
        res.status(400).send({"error":"not supported in api"});
        
    }
})
// router.get('/', (req, res) => {
//     res.status(404).send({"error":"not supported in api"});
// })

module.exports = router;
