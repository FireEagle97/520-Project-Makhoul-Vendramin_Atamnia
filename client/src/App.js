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

import L from 'leaflet';

const busIcon = new L.Icon({
    iconUrl: require('./assets/marker-icon.webp'),
    iconSize: [32,32],

})

function App() {
  const [lanePositon , setLanePositon] = useState([])
  const [busses, setBusses] = useState([])


  useEffect(() => {
    var allBusses = []
    fetch("/lanes")
    .then((res) => res.json())
    .then((data) =>{

    
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
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {busses.map((bus) =>
    <Marker position={[bus.position.latitude, bus.position.longitude]} icon={busIcon} eventHandlers={{
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
