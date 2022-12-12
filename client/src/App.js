import './App.css';
import React, { useState, useEffect } from 'react';
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
  shadowUrl: require('./assets/marker-shadow.webp'),
  iconSize: [32, 32],
})

const stopIcon = new L.Icon({
  iconUrl: require('./assets/busStopCircle.webp'),
  shadowUrl: require('./assets/marker-shadow.webp'),
  iconSize: [32, 32],
})

function App() {
  const [activeBus, setActiveBus] = useState()
  const [busses, setBusses] = useState([])


  useEffect(() => {
    var allBusses = []
    fetch("/lanes")
      .then((res) => res.json())
      .then((data) => {


        // eslint-disable-next-line array-callback-return
        data.map((pos) => {
          allBusses.push(pos)
        })

        setBusses(allBusses, [])
      })
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

      {busses.map((bus, i) =>
        <Marker position={[bus.position.latitude, bus.position.longitude]} key={i} icon={busIcon} eventHandlers={{
          click: (e) => {
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

      {
        () => {
          if (activeBus) {
            return (
              <Polyline positions={activeBus.busLane} pathOptions={{ color: activeBus.routeColor, weight: 4 }}>
                <Popup>
                  {activeBus.headSign + activeBus.routeLongName}
                </Popup>
              </Polyline>
            )
          }
        }
      }

      {
        () => {
          if (activeBus) {
            return (
              activeBus.busStops.map((stop, i) =>
                <Marker position={[stop.lat, stop.lon]} key={i} icon={stopIcon}>
                  <Popup>
                    {stop.name}
                    <br></br>
                    <a target="_blank" href="https://icons8.com/icon/37601/circle">Circle</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
                  </Popup>

                </Marker>
              )
            )
          }
        }
      }


    </MapContainer>
  );


  function fetchBusInfo(routeId, tripId) {
    fetch("lanes/" + routeId + "/" + tripId)
      .then((res) => res.json())
      .then((data) => {
        setActiveBus(data.response)
      })
  }
}

export default App;
