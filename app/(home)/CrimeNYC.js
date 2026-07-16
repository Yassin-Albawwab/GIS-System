"use client";

import { useEffect, useState } from "react";
import {
  Map,
  NavigationControl,
  useControl,
  Source,
  Layer,
} from "@vis.gl/react-maplibre";

import { MapboxOverlay as DeckOverlay } from "@deck.gl/mapbox";
import "maplibre-gl/dist/maplibre-gl.css";
import { HeatmapLayer, ScatterplotLayer, HexagonLayer } from "deck.gl";
import { CSVLoader } from "@loaders.gl/csv";
import { DataFilterExtension } from "@deck.gl/extensions";

import PopupTooltip from "./components/PopupTooltip";
import ControlPanel from "./components/ControlPanel";
import RasterLayer from "./components/RasterLayer";
import { reduce_listOfObj_to_simpleList } from "@/helpers/listOfObj";
import { OffenseCategories } from "./enums/crime.enums";
// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz

const INITIAL_VIEW_STATE = {
  longitude: -73.935242,
  latitude: 40.73061,
  zoom: 13,
  bearing: 0,
  pitch: 30,
};

export default function CrimeNYC() {
  const [selected, setSelected] = useState(null);
  const [baseMapState, setBaseMapState] = useState("carto");
  const [mapLayersState, setMapLayersState] = useState([]);

  // Filteres States
  const [OffsCategoryStateList, setOffsCategoryStateList] = useState(
    reduce_listOfObj_to_simpleList(OffenseCategories),
  );

  // Update the state as the user drags the slider thumb
  // const handleChange = (event) => {
  //   setLatitudeState(Number(event.target.value));
  // };

  // useEffect(() => {
  //   setBaseMapState(BASEMAPS.carto_dark);
  // }, []);

  const scatterplotCrimeLayer = new ScatterplotLayer({
    id: "scatterplot",
    data: "/NYC_crime_01.csv",
    loaders: [CSVLoader],
    stroked: true,
    //   getRadius: (d) => Math.sqrt(d.exits),
    getPosition: (f) => [f.longitude, f.latitude],
    getFillColor: (d) => {
      return d.law_cat_cd == "F"
        ? [255, 0, 0]
        : d.law_cat_cd == "V"
          ? [0, 255, 0]
          : [0, 211, 242];
    },
    // DataFilterExtension specific props
    getFilterCategory: (d) => d.law_cat_cd,
    filterCategories: OffsCategoryStateList,
    extensions: [new DataFilterExtension({ categorySize: 1 })],

    getLineColor: [0, 0, 0],
    getLineWidth: 5,
    radiusScale: 25,
    pickable: true,
    onHover: ({ object }) => {
      console.log("o: ", object);
      setSelected(object);
    },
  });

  const heatMapCrimelayer = new HeatmapLayer({
    id: "heatmap",
    data: "/NYC_crime_01.csv",
    loaders: [CSVLoader],
    aggregation: "SUM",
    gpuAggregation: true,
    getPosition: (f) => [f.longitude, f.latitude],
    getWeight: (d) =>
      d.law_cat_cd == "F" ? 35 : d.law_cat_cd == "M" ? 25 : 15,
    radiusPixels: 35,

    getFilterCategory: (d) => d.law_cat_cd,
    filterCategories: OffsCategoryStateList,
    extensions: [new DataFilterExtension({ categorySize: 1 })],
  });

  const layersList = [
    { id: "scatterplot", name: "Scatter plot", data: scatterplotCrimeLayer },
    { id: "heatmap", name: "Heat map", data: heatMapCrimelayer },
  ];

  useEffect(() => {
    setMapLayersState([scatterplotCrimeLayer, heatMapCrimelayer]);
  }, [OffsCategoryStateList]);

  function formatLabel(timestamp) {
    const date = new Date(timestamp);
    return `${date.getUTCFullYear()}/${date.getUTCMonth() + 1}`;
  }

  // console.log({ mapLayersState });
  // console.log("mapLayersState ", mapLayersState);
  return (
    <div className=" relative">
      <Map
        interactive
        style={{ width: "100vw", height: "100vh" }}
        initialViewState={INITIAL_VIEW_STATE}
        mapStyle={baseMapState}
      >
        {/* <RasterLayer
          tilesURls={[
            "https://geoserveis.icgc.cat/servei/catalunya/mapa-base/wmts/orto/MON3857NW/{z}/{x}/{y}.png",
          ]}
        /> */}
        <div className="absolute  top-4 right-10 z-10 bg-white p-4  rounded-lg">
          <ControlPanel
            {...{
              layersList,
              baseMapState,
              setBaseMapState,
              mapLayersState,
              setMapLayersState,
              OffsCategoryStateList,
              setOffsCategoryStateList,
            }}
          />
        </div>
        {selected && <PopupTooltip selected={selected} />}
        <DeckGLOverlay layers={mapLayersState} controller={true} />
        <NavigationControl position="top-left" />
      </Map>
    </div>
  );
}

function DeckGLOverlay(props) {
  const overlay = useControl(() => new DeckOverlay(props));
  overlay.setProps(props);
  return null;
}
