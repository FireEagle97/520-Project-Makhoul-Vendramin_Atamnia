import logo from './logo.svg';
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
import { Icon, marker, popup } from 'leaflet';


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
    
     data.map((pos) =>{
      allBusses.push(pos)
     })
     
     setBusses(allBusses, [])
    })
  }, []);
 
 
  // useEffect(() => {
  //   setPosition([[45.4897, -73.5881], [45.4800, -73.5889],[45.4890, -73.5870], [45.4980, -73.5889]])
  // }, []);

  

  const greenOptions = { color: 'green',
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
        console.log('clicked')
        doSomething(bus.routeId, bus.tripId)
      }
    }}>
      <Popup>
       {/* change next to fetch bus lane  */}
        Dawson College
        green line
      </Popup>
    </Marker>
  )};
  <Polyline positions={lanePositon} pathOptions={greenOptions} />
  </MapContainer>
  );


  function doSomething(routeId, tripId){
    fetch("lanes/" + routeId + "/" + tripId)
    .then((res) => res.json())
    .then((data) =>{
     console.log("data from server", data)
     //setLanePositon(data.line)
    })
    
  }
}



export default App;
