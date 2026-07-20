"use client";

import { useEffect, useRef, useState } from "react";
import { Map, NavigationControl, useControl } from "@vis.gl/react-maplibre";

import { MapboxOverlay as DeckOverlay } from "@deck.gl/mapbox";
import "maplibre-gl/dist/maplibre-gl.css";
import { HeatmapLayer, ScatterplotLayer, HexagonLayer } from "deck.gl";
import { CSVLoader } from "@loaders.gl/csv";
import { DataFilterExtension } from "@deck.gl/extensions";

import PopupTooltip from "./components/PopupTooltip";
import ControlPanel from "./components/ControlPanel";
import { reduce_listOfObj_to_simpleList } from "@/helpers/listOfObj";
import { OffenseCategories } from "./enums/crime.enums";
import { BaseMapsOpts } from "@/utils/baseMaps";
import { twMerge } from "tailwind-merge";

const INITIAL_VIEW_STATE = {
  longitude: -73.935242,
  latitude: 40.73061,
  zoom: 13,
  bearing: 0,
  pitch: 30,
};

export default function CrimeNYC() {
  const [selected, setSelected] = useState(null);
  const [baseMapState, setBaseMapState] = useState(
    BaseMapsOpts.find((x) => x.label == "Carto (voyager)")?.value ?? undefined,
  );
  const [mapLayersState, setMapLayersState] = useState([]);
  // Filteres States
  const [OffsCategoryStateList, setOffsCategoryStateList] = useState(
    reduce_listOfObj_to_simpleList(OffenseCategories),
  );
  const isMountRef = useRef(false);

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
    extensions: [new DataFilterExtension({ categorySize: 1 })],
    getFilterCategory: (d) => d.law_cat_cd,
    filterCategories: OffsCategoryStateList,

    getLineColor: [0, 0, 0],
    getLineWidth: 5,
    radiusScale: 25,
    pickable: true,
    onHover: ({ object }) => {
      // console.log("o: ", object);
      setSelected(object);
    },
  });

  const heatMapCrimelayer = new HeatmapLayer({
    id: "heatmap",
    data: "/NYC_crime_01.csv",
    loaders: [CSVLoader],
    aggregation: "SUM",
    gpuAggregation: true,

    // onDataLoad: (x) => {
    //   console.log("heatMap data loaded", x);
    // },
    getPosition: (f) => [f.longitude, f.latitude],
    getWeight: (d) =>
      d.law_cat_cd == "F" ? 35 : d.law_cat_cd == "M" ? 25 : 15,
    radiusPixels: 35,

    // getFilterCategory: (d) => d.law_cat_cd,
    // filterCategories: OffsCategoryStateList,
    //extensions: [new DataFilterExtension({ categorySize: 1 })],
  });

  const layersList = [
    { id: "scatterplot", name: "scatterPlot", data: scatterplotCrimeLayer },
    { id: "heatmap", name: "heatMap", data: heatMapCrimelayer },
  ];

  useEffect(() => {
    // console.log("setMapLayersState on 1st mount");
    setMapLayersState([scatterplotCrimeLayer, heatMapCrimelayer]);
  }, []);
  // useEffect(() => {
  //   // isMountRef.current = true;
  //   console.log("isMOunt changed to true");
  // }, []);

  // console.log("isMountRef", isMountRef.current);

  useEffect(() => {
    if (!isMountRef.current) {
      isMountRef.current = true;
      // console.log("skip 1st mount and return ;");
      return;
    }
    // console.log("after 1st mount");
    // console.log("mapLayersState", mapLayersState);
    setMapLayersState((prev) => {
      const layersIds = reduce_listOfObj_to_simpleList(prev);
      if (layersIds.includes("heatmap") && layersIds.includes("scatterplot"))
        return [scatterplotCrimeLayer, heatMapCrimelayer];
      if (layersIds.includes("scatterplot")) return [scatterplotCrimeLayer];
      if (layersIds.includes("heatmap")) return [heatMapCrimelayer];
      else return [];
    });
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
        <div
          className={twMerge(
            "absolute  top-4 inset-e-10 z-10 bg-white p-4  rounded-lg",
          )}
        >
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
