import logo from './logo.svg';
import './App.css';
import React from 'react';
import {
  MapContainer,
  TileLayer,
  useMap,
  Popup,
  Marker,
  Circle,
  Polyline
} from 'react-leaflet'
import "leaflet/dist/leaflet.css"


const polyline = [
  [45.4897, -73.5881],
  [43,-72],
  [43,-72.12]
]


function App() {
  const position = [45.4897, -73.5881]
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
    <Circle center={position} radius={1200}></Circle> 
    <Polyline positions={polyline}/>
    <Marker position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
  );
}

export default App;
