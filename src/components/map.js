"use client";

import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import "../styles/map.css";
import { MapContainer, GeoJSON, TileLayer } from "react-leaflet";

const defaultStyle = {
  fillColor: "#ffffff",
  weight: 2,
  opacity: 1,
  color: "#999999",
  dashArray: "3",
  fillOpacity: 0.7,
};

const highlightStyle = {
  fillColor: "#e53935",
  weight: 2,
  opacity: 1,
  color: "#b71c1c",
  dashArray: "3",
  fillOpacity: 0.8,
};

const Map = ({ geojsonData, onSelectArrondissement }) => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const styleFeature = (feature) => {
    return selectedFeature &&
      feature.properties.nom === selectedFeature.properties.nom
      ? highlightStyle
      : defaultStyle;
  };

  const onEachArrondissement = (feature, layer) => {
    layer.bindPopup(`<strong>${feature.properties.nom}</strong>`);
    layer.on({
      click: () => {
        setSelectedFeature(feature);
        if (onSelectArrondissement) {
          const idParts = feature.id.split(".");
          const lastPart = idParts[idParts.length - 1];
          onSelectArrondissement(parseInt(lastPart));
        }
      },
    });
  };

  return (
      <MapContainer
        center={[45.75, 4.85]}
        zoom={12}
        style={{ height: "100%", width: "100%", backgroundColor: "#ffffff" }}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        dragging={false}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
        <GeoJSON
          key={selectedFeature?.properties.nom || "default"}
          data={geojsonData}
          style={styleFeature}
          onEachFeature={onEachArrondissement}
        />
      </MapContainer>
  );
};

export default Map;
