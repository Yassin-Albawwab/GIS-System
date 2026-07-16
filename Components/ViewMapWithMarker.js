"use client";
import { Map, Marker } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css"; // Required!

export default function ViewMapWithMarker() {
  return (
    <div>
      <Map
        initialViewState={{
          longitude: 38,
          latitude: 35,
          zoom: 3.5,
        }}
        // position="relative"
        // style={{ width: 1000, height: 400 }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="https://demotiles.maplibre.org/style.json"
      >
        <Marker longitude={-73.924263} latitude={40.684388} color="black" />
        <Marker longitude={-58.3816} latitude={-34.6037} color="blue" />
        <Marker longitude={38} latitude={35} color="red" />
      </Map>
    </div>
  );
}
