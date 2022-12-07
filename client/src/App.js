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

// const polyline = [
//   [45.446466,-73.603118],
//   [45.451158,-73.593242],
//   [45.457010,-73.581691],
//   [45.459441,-73.572021],
//   [45.461894,-73.567074],
//   [45.471063,-73.566267],
//   [45.478465,-73.569336],
//   [45.482509,-73.580180],
//   [45.490068,-73.585812],
//   [45.495570,-73.579310],
//   [45.500879,-73.574715],
//   [45.504064,-73.571586],
//   [45.508220,-73.568433],
//   [45.511033,-73.564899],
//   [45.515226,-73.561082],
//   [45.518831,-73.555837],
//   [45.523988,-73.552703],
//   [45.533504,-73.552196],
//   [45.541717,-73.554192],
//   [45.546832,-73.551391],
//   [45.553688,-73.551757],
//   [45.560687,-73.547530],
//   [45.569285,-73.547336],
//   [45.576843,-73.546710],
//   [45.582736,-73.543133],
//   [45.589431,-73.539269],
//   [45.596572,-73.535376]
// ]


function App() {
  const [position, setPosition] = useState([[45.4897, -73.5881]])
  const [lanePositon , setLanePositon] = useState([])
  
  useEffect(() => {
    fetch("lanes/1")
    .then((res) => res.json())
    .then((data) =>{
     console.log("data from server", data)
     setLanePositon(data.line)
    })
  }, []);
 
 
  useEffect(() => {
    setPosition([[45.4897, -73.5881], [45.4800, -73.5889],[45.4890, -73.5870], [45.4980, -73.5889]])
  }, []);
  
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
    <Marker position= {pos}>
      <Popup>
        Dawson College
      </Popup>
    </Marker>
  )};
  <Polyline positions={lanePositon}/>
  </MapContainer>
  );
}

export default App;
