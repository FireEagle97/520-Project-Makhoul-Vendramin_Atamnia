import './App.css';
import React, {useState, useEffect} from 'react';
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  Polyline
} from 'react-leaflet'
import "leaflet/dist/leaflet.css"


function App() {
  const [lanePositon , setLanePositon] = useState([])
  const [busses, setBusses] = useState([])


  useEffect(() => {
    var allBusses = []
    fetch("/lanes")
    .then((res) => res.json())
    .then((data) =>{
    console.log("data from server",data)
     console.log("data from server", data[0].position.latitude, data[0].position.longitude)
    
     // eslint-disable-next-line array-callback-return
     data.map((pos) =>{
      allBusses.push(pos)
     })
     
     setBusses(allBusses, [])
    })
  }, []);
 
  const colorOptions = { color: 'blue',
                          weight : 4 }
  

  return (
    <MapContainer 
        center={[45.5019, -73.5674]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100vh" }}
        >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
    />
    {busses.map((bus) =>
    <Marker position={[bus.position.latitude, bus.position.longitude]} eventHandlers={{
      click: (e) =>{
        fetchBusInfo(bus.routeId, bus.tripId)
        
      }
    }}>
      <Popup>
        Route number : {bus.routeId}
        <br></br>
        Occupancy Status : {bus.occupancyStatus} out of 5 
      </Popup>
      <Polyline positions={lanePositon} pathOptions={colorOptions} />
       
    </Marker>
  )};
  </MapContainer>
  );


  function fetchBusInfo(routeId, tripId){
    fetch("lanes/" + routeId + "/" + tripId)
    .then((res) => res.json())
    .then((data) =>{
     setLanePositon(data.response.busLane)
    })
  }
}

export default App;
