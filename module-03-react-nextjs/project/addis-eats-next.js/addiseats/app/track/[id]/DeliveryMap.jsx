'use client'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { MapContainer, Marker, Polyline, TileLayer, Tooltip, useMap } from 'react-leaflet'
import { useEffect, useMemo, useState } from 'react'
import { isValidCoordinates } from '../../../lib/location'
import { DELIVERY_ORIGIN, DELIVERY_TRANSIT_DURATION_MS, getDeliveryLocation } from '../../../lib/delivery-locations'

const courierIcon = L.divIcon({
  className: 'delivery-map-icon',
  html: '<span aria-hidden="true" style="display:grid;place-items:center;width:36px;height:36px;background:#172033;color:white;border:3px solid white;border-radius:50%;box-shadow:0 2px 8px #0004;font-size:18px">●</span>',
  iconSize: [36, 36],
  iconAnchor: [18, 18],
})

const deliveryIcon = L.divIcon({
  className: 'delivery-map-icon',
  html: '<span aria-hidden="true" style="display:grid;place-items:center;width:36px;height:36px;background:#f47d16;color:white;border:3px solid white;border-radius:50%;box-shadow:0 2px 8px #0004;font-size:18px">⌂</span>',
  iconSize: [36, 36],
  iconAnchor: [18, 18],
})

function FitMarkers({ positions }) {
  const map = useMap()
  useEffect(() => {
    map.fitBounds(L.latLngBounds(positions), { padding: [36, 36], maxZoom: 14 })
  }, [map, positions])
  return null
}

export default function DeliveryMap({
  deliveryCoordinates,
  courierLocation,
  neighborhood,
  originCoordinates,
  status,
  statusUpdatedAt,
}) {
  const origin = isValidCoordinates(originCoordinates) ? originCoordinates : DELIVERY_ORIGIN
  const destination = isValidCoordinates(deliveryCoordinates)
    ? deliveryCoordinates
    : getDeliveryLocation(neighborhood)
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (status !== 'On the way' || isValidCoordinates(courierLocation)) return undefined
    const timer = window.setInterval(() => setNow(Date.now()), 200)
    return () => window.clearInterval(timer)
  }, [courierLocation, status])

  const positions = useMemo(() => {
    if (!isValidCoordinates(destination)) return []
    return [
      [Number(origin.latitude), Number(origin.longitude)],
      [Number(destination.latitude), Number(destination.longitude)],
    ]
  }, [destination, origin])

  if (!positions.length) {
    return <div className="delivery-map-placeholder" role="status">
      Choose a delivery area at checkout to see its route on the map.
    </div>
  }

  const progress = status === 'Delivered'
    ? 1
    : status === 'On the way'
      ? Math.min(1, Math.max(0, (now - new Date(statusUpdatedAt).getTime()) / DELIVERY_TRANSIT_DURATION_MS))
      : 0
  const simulatedCourier = {
    latitude: Number(origin.latitude) + (Number(destination.latitude) - Number(origin.latitude)) * progress,
    longitude: Number(origin.longitude) + (Number(destination.longitude) - Number(origin.longitude)) * progress,
  }
  const markerLocation = status !== 'Delivered' && isValidCoordinates(courierLocation)
    ? courierLocation
    : simulatedCourier
  const markerPosition = [Number(markerLocation.latitude), Number(markerLocation.longitude)]
  const markerTitle = isValidCoordinates(courierLocation) ? 'Last verified courier location' : 'Simulated courier position'

  return <div className="delivery-map-frame" role="group" aria-label="Interactive map showing the dispatch point, route, and delivery area">
    <MapContainer center={positions[0]} zoom={13} scrollWheelZoom style={{ height: '360px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitMarkers positions={positions} />
      <Polyline positions={positions} pathOptions={{ color: '#f47d16', dashArray: '8 8', weight: 5 }} />
      <Marker position={markerPosition} icon={courierIcon} title={markerTitle}>
        <Tooltip permanent direction="top">{markerTitle}</Tooltip>
      </Marker>
      <Marker position={positions[1]} icon={deliveryIcon} title={`Delivery area: ${neighborhood}`}>
        <Tooltip permanent direction="top">{neighborhood || 'Delivery area'}</Tooltip>
      </Marker>
    </MapContainer>
  </div>
}
