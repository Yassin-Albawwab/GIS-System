import React from "react";
import { Source, Layer } from "@vis.gl/react-maplibre";

export default function RasterLayer({
  srcId = "custom-tiles-source",
  tilesURls = [
    // "https://geoserveis.icgc.cat/servei/catalunya/mapa-base/wmts/orto/MON3857NW/{z}/{x}/{y}.png",
  ],
  sourceParam,
  layerParam,
}) {
  return (
    <Source
      id={srcId}
      type="raster"
      tiles={tilesURls}
      tileSize={256}
      minzoom={0}
      maxzoom={18}
      {...sourceParam}
    >
      <Layer
        id={`custom-png-tiles ${crypto.randomUUID()}`}
        source={srcId}
        type="raster"
        paint={{
          // Optional: adjust opacity
          "raster-opacity": 1.0,
        }}
        {...layerParam}
      />
    </Source>
  );
}
