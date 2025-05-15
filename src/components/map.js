"use client";

import React, { useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const defaultStyle = {
  fillColor: "#3388ff",
  weight: 2,
  opacity: 1,
  color: "white",
  dashArray: "3",
  fillOpacity: 0.6,
};

const highlightStyle = {
  fillColor: "#ff7800",
  weight: 2,
  opacity: 1,
  color: "white",
  dashArray: "3",
  fillOpacity: 0.7,
};

const Map = ({ geojsonData }) => {
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
      },
    });
  };

  return (
    <MapContainer  
      center={[45.75, 4.85]}
      zoom={12}
      style={{ height: "500px", width: "100%" }}
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
