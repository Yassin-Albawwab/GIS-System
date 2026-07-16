"use client";
import { useState } from "react";

import {
  Map,
  NavigationControl,
  Popup,
  Marker,
  useControl,
  Layer,
} from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

import {
  GeoJsonLayer,
  ArcLayer,
  ScatterplotLayer,
  TerrainLayer,
  HeatmapLayer,
} from "deck.gl";
import { DeckGL } from "deck.gl";
import { MapboxOverlay } from "@deck.gl/mapbox";

import JSONMap from "../../public/mapJson.json";

// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
const AIR_PORTS =
  "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson";

const INITIAL_VIEW_STATE = {
  longitude: -122.4,
  latitude: 37.74,
  // longitude: -73,
  // latitude: 40,
  zoom: 11,
  bearing: 0,
  pitch: 20,
};

const MAP_STYLE = JSONMap;
// "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

const scatterplotLayer = new ScatterplotLayer({
  id: "ScatterplotLayer",
  data: "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-stations.json",

  stroked: true,
  getPosition: (d) => d.coordinates,
  getRadius: (d) => Math.sqrt(d.exits),
  getFillColor: [255, 140, 0],
  getLineColor: [0, 0, 0],
  getLineWidth: 10,
  radiusScale: 6,
  pickable: true,
});

const heatMaplayer = new HeatmapLayer({
  id: "HeatmapLayer",
  data: "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/sf-bike-parking.json",

  aggregation: "SUM",
  getPosition: (d) => d.COORDINATES,
  getWeight: (d) => d.SPACES,
  radiusPixels: 25,
});

const arcLayer = new ArcLayer({
  id: "arcs",
  data: AIR_PORTS,
  dataTransform: (d) => d.features.filter((f) => f.properties.scalerank < 4),
  // Styles
  getSourcePosition: (f) => [-0.4531566, 51.4709959], // London
  getTargetPosition: (f) => f.geometry.coordinates,
  getSourceColor: [0, 128, 200],
  getTargetColor: [200, 0, 80],
  getWidth: 1,
});

const terrainLayer = new TerrainLayer({
  elevationDecoder: {
    rScaler: 2,
    gScaler: 0,
    bScaler: 0,
    offset: 0,
  },
  // Digital elevation model from https://www.usgs.gov/
  elevationData:
    "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/terrain.png",
  texture:
    "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/terrain-mask.png",
  bounds: [-122.5233, 37.6493, -122.3566, 37.8159],
  parent: heatMaplayer,
});

function DeckGLOverlay(props) {
  const overlay = useControl(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
}

export default function Main() {
  const [selected, setSelected] = useState(null);

  const geoJSONLayer = new GeoJsonLayer({
    id: "airports",
    data: AIR_PORTS,
    // Styles
    filled: true,
    pointRadiusMinPixels: 2,
    pointRadiusScale: 2000,
    getPointRadius: (f) => 11 - f.properties.scalerank,
    getFillColor: [200, 0, 80, 180],
    // Interactive props
    pickable: true,
    autoHighlight: true,
    onClick: (info) => setSelected(info.object),
    // beforeId: "watername_ocean", // In interleaved mode, render the layer under map labels
  });

  const layers = [
    // geoJSONLayer,
    // scatterplotLayer,
    // terrainLayer,
    // heatMaplayer,
    arcLayer,
  ];
  return (
    <div>
      <DeckGL
        // style={{ zIndex: 100 }}
        initialViewState={{
          longitude: -122.4,
          latitude: 37.74,
          zoom: 11,
          maxZoom: 20,
          pitch: 30,
          bearing: 0,
        }}
        controller
        layers={layers} /* interleaved*/
      >
        <Map
          initialViewState={INITIAL_VIEW_STATE}
          style={{ width: "100vw", height: "100vh" }}
          mapStyle={MAP_STYLE}
          // dragPan
          // dragRotate
        >
          {selected && (
            <Popup
              key={selected.properties.name}
              anchor="bottom"
              style={{
                zIndex: 100,
              }} /* position above deck.gl canvas */
              longitude={selected.geometry.coordinates[0]}
              latitude={selected.geometry.coordinates[1]}
            >
              {selected.properties.name} ({selected.properties.abbrev})
              <a
                className="text-blue-400 hover:text-blue-600 hover:underline ps-2 text-shadow-2xs"
                href={selected.properties.wikipedia}
                target="_blank"
              >
                wiki
              </a>
              {/* </div> */}
            </Popup>
          )}

          <NavigationControl
            style={{ zIndex: 1000 }}
            position="top-left"
            visualizePitch
          />
          <Marker longitude={-73.924263} latitude={40.684388} color="black" />
          <Marker longitude={-58.3816} latitude={-34.6037} color="blue" />
          <Marker longitude={38} latitude={35} color="red" />
        </Map>
        {/*  */}
      </DeckGL>
    </div>
  );
}

{
  /* <DeckGLOverlay
        layers={layers} /* interleaved*/
  /> */;
}

{
  /* <TerrainLayer
          id="terrainLayerComp"
          elevationDecoder={{ rScaler: 2, gScaler: 0, bScaler: 0, offset: 0 }}
          elevationData="https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/terrain.png"
          texture="https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/terrain-mask.png"
          bounds={[-122.5233, 37.6493, -122.3566, 37.8159]}
        />
        <HeatmapLayer
          id="HeatmapLayerComp"
          data="https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/sf-bike-parking.json"
          aggregation="SUM"
          getPosition={(d) => d.COORDINATES}
          getWeight={(d) => d.SPACES}
          radiusPixels={25}
        /> */
}
