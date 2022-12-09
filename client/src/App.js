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
import { marker, popup } from 'leaflet';


function App() {
  const [position, setPosition] = useState([[45.4897, -73.5881]])
  const [lanePositon , setLanePositon] = useState([])
  
  useEffect(() => {
    fetch("/lanes/1")
    .then((res) => res.json())
    .then((data) =>{
     console.log("data from server", data)
     setLanePositon(data.line)
    })
  }, []);
 
 
  useEffect(() => {
    setPosition([[45.4897, -73.5881], [45.4800, -73.5889],[45.4890, -73.5870], [45.4980, -73.5889]])
  }, []);

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
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {position.map((pos) =>
    <Marker position={pos} eventHandlers={{
      click: (e) =>{
        console.log('marker click', e)
        console.log(e.latlng)
        doSomething()
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


  function doSomething(){
    fetch("lanes/1")
    .then((res) => res.json())
    .then((data) =>{
     console.log("data from server", data)
     setLanePositon(data.line)
    })
    
  }
}



export default App;
