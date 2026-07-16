import { useState, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { Map } from "react-map-gl/maplibre";
import { DeckGL } from "@deck.gl/react";
import { ScatterplotLayer } from "@deck.gl/layers";
import { DataFilterExtension } from "@deck.gl/extensions";
import { MapView } from "@deck.gl/core";
import { CSVLoader } from "@loaders.gl/csv";
import { load } from "@loaders.gl/core";
import RangeInput from "./range-input";

const MAP_VIEW = new MapView({
  repeat: true,
  // 1 is the distance between the camera and the ground
  farZMultiplier: 100,
});

const INITIAL_VIEW_STATE = {
  latitude: 36.5,
  longitude: -120,
  zoom: 5.5,
  pitch: 0,
  bearing: 0,
};

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json";

const MS_PER_DAY = 8.64e7;

export default function NewFilterTest() {
  return (
    <div>
      {" "}
      <DeckGL
        views={MAP_VIEW}
        layers={layers}
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        getTooltip={getTooltip}
      >
        <Map reuseMaps mapStyle={mapStyle} />
      </DeckGL>
    </div>
  );
}
