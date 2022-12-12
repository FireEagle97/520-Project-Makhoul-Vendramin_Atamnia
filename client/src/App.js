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
  const [activeBus , setActiveBus] = useState([])
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
    
    {busses.map((bus, i) =>
      <Marker position={[bus.position.latitude, bus.position.longitude]} key={i} eventHandlers={{
        click: (e) =>{
          fetchBusInfo(bus.routeId, bus.tripId)
          
        }
      }}>
        <Popup>
          Route number : {bus.routeId}
          <br></br>
          Occupancy Status : {bus.occupancyStatus} out of 5 
        </Popup>
        
      </Marker>
    )};

    <Polyline positions={activeBus.busLane} pathOptions={{ color: activeBus.routeColor, weight : 4 }}>
      <Popup>
        {activeBus.headSign + activeBus.routeLongName}
      </Popup>
    </Polyline>

    {activeBus.busStops.map((stop, i) =>
      <Marker position={[stop.lat, stop.lon]} key={i}>
        <Popup>
          {stop.name} 
        </Popup>
        
      </Marker>
    )};

  </MapContainer>
  );


  function fetchBusInfo(routeId, tripId){
    fetch("lanes/" + routeId + "/" + tripId)
    .then((res) => res.json())
    .then((data) =>{
      setActiveBus(data.response)
    })
  }
}

export default App;
