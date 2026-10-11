'use client'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { MapContainer, Marker, TileLayer, Tooltip, useMap } from 'react-leaflet'
import { useEffect, useMemo } from 'react'

const neighborhoodCoordinates = {
  bole: [8.995, 38.789],
  piassa: [9.035, 38.752],
  piazza: [9.035, 38.752],
  kazanchis: [9.016, 38.765],
  megenagna: [9.030, 38.805],
  mexico: [9.010, 38.740],
  arat_kilo: [9.034, 38.761],
  sidist_kilo: [9.021, 38.761],
}

function getDeliveryPosition(neighborhood) {
  const key = String(neighborhood || '').toLowerCase().replace(/[\s-]+/g, '_')
  return neighborhoodCoordinates[key] || [9.022, 38.746]
}

function FitMarkers({ positions }) {
  const map = useMap()
  useEffect(() => {
    map.fitBounds(L.latLngBounds(positions), { padding: [36, 36], maxZoom: 14 })
  }, [map, positions])
  return null
}

const courierIcon = L.divIcon({
  className: 'delivery-map-icon',
  html: '<span aria-hidden="true" style="display:grid;place-items:center;width:36px;height:36px;background:#172033;color:white;border:3px solid white;border-radius:50%;box-shadow:0 2px 8px #0004;font-size:18px">🚚</span>',
  iconSize: [36, 36],
  iconAnchor: [18, 18],
})

const deliveryIcon = L.divIcon({
  className: 'delivery-map-icon',
  html: '<span aria-hidden="true" style="display:grid;place-items:center;width:36px;height:36px;background:#f47d16;color:white;border:3px solid white;border-radius:50%;box-shadow:0 2px 8px #0004;font-size:18px">⌂</span>',
  iconSize: [36, 36],
  iconAnchor: [18, 18],
})

export default function DeliveryMap({ neighborhood = '', address = '' }) {
  const delivery = useMemo(() => getDeliveryPosition(neighborhood), [neighborhood])
  const courier = useMemo(() => [delivery[0] + 0.009, delivery[1] - 0.012], [delivery])
  const positions = useMemo(() => [courier, delivery], [courier, delivery])

  return <div className="delivery-map-frame" role="group" aria-label="Illustrative delivery map">
    <MapContainer center={delivery} zoom={13} scrollWheelZoom={false} style={{ height: '360px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitMarkers positions={positions} />
      <Marker position={courier} icon={courierIcon}><Tooltip permanent direction="top">Courier · demo position</Tooltip></Marker>
      <Marker position={delivery} icon={deliveryIcon}><Tooltip permanent direction="top">Delivery area</Tooltip></Marker>
    </MapContainer>
    <p className="delivery-map-note">Map pins show an illustrative location for the neighbourhood. Your full delivery address is listed beside the map.</p>
  </div>
}
