import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';

import {
  MapContainer,
  TileLayer,
  useMap,
  Popup,
  Marker
} from 'react-leaflet'
import "leaflet/dist/leaflet.css"



function App() {
  const [position, setPosition] = useState([[45.4897, -73.5881]])
  useEffect(() => {
    setPosition([[45.4897, -73.5881], [45.4800, -73.5889],[45.4890, -73.5870], [45.4980, -73.5889]])
  });
  
  return (
    <MapContainer 
        center={[45.5019, -73.5674]}
        zoom={13}
        scrollWheelZoom={false}
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
  </MapContainer>
  );
}

export default App;
