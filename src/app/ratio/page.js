import Map from '@/components/map';
import React from 'react';
import geojsonData from '../../data/metropole-de-lyon_adr_voie_lieu.adrarrond.json';


export default function RatioPage() {
    return (
        <>
        <Map geojsonData={geojsonData}></Map>
        </>
    );
}