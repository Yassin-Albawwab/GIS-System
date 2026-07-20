"use client";

import React, { useEffect, useState } from "react";
import {
  Map,
  NavigationControl,
  Popup,
  useControl,
} from "@vis.gl/react-maplibre";

import { GeoJsonLayer, ArcLayer } from "deck.gl";
import { MapboxOverlay as DeckOverlay } from "@deck.gl/mapbox";
import "maplibre-gl/dist/maplibre-gl.css";
import { BASEMAPS } from "@/utils/baseMaps";
import { Formik, Field, ErrorMessage } from "formik";
import FormikRadio from "@/Components/formik/FormikRadio";
import { HeatmapLayer } from "deck.gl";
import { TerrainLayer } from "deck.gl";
import { CSVLoader } from "@loaders.gl/csv";

// import { load } from "@loaders.gl/core";

// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
const AIR_PORTS =
  "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson";

const INITIAL_VIEW_STATE = {
  longitude: -73.935242,
  latitude: 40.73061,
  zoom: 13,
  bearing: 0,
  pitch: 30,
};

function DeckGLOverlay(props) {
  const overlay = useControl(() => new DeckOverlay(props));
  overlay.setProps(props);
  return null;
}
import { parse } from "@loaders.gl/core";
import { ScatterplotLayer } from "deck.gl";
import CategorySwitch from "./components/CategorySwitch";
import TitleSub from "@/Components/TitleSub";
import FormikCheckbox from "@/Components/formik/FormikCheckbox";
import FormikLayerPicker from "./components/FormikLayerPicker";
import { twMerge } from "tailwind-merge";

const heatMaplayer = new HeatmapLayer({
  id: "HeatmapLayer",
  data: "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/sf-bike-parking.json",

  aggregation: "SUM",
  getPosition: (d) => d.COORDINATES,
  getWeight: (d) => d.SPACES,
  radiusPixels: 25,
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
  // parent: heatMaplayer,
});

const geoJsonPortLayer = new GeoJsonLayer({
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
  // beforeId: 'watername_ocean' // In interleaved mode, render the layer under map labels
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

export default function Test() {
  const [selected, setSelected] = useState(null);
  const [mapLayers, setMapLayers] = useState([]);

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
    getLineColor: [0, 0, 0],
    getLineWidth: 5,
    radiusScale: 25,
    pickable: true,
    onHover: ({ object }) => {
      //   console.log({ object });
      setSelected(object);
    },
  });

  const heatMapCrimelayer = new HeatmapLayer({
    id: "heatmap",
    data: "/NYC_crime_01.csv",
    loaders: [CSVLoader],
    aggregation: "SUM",
    getPosition: (f) => [f.longitude, f.latitude],
    getWeight: (d) =>
      d.law_cat_cd == "F" ? 80 : d.law_cat_cd == "M" ? 50 : 20,
    radiusPixels: 25,
  });

  //   const data = await parse(fetch("NYC_crime_01.csv"), CSVLoader);
  //   console.log({ data });
  useEffect(() => {
    setMapLayers([scatterplotCrimeLayer, heatMapCrimelayer]);
    // return () => {};
  }, []);

  const layersOptsObj = [scatterplotCrimeLayer, heatMapCrimelayer];
  // const layersOptsObj = [
  //   { label: "Scatter Point", value: scatterplotCrimeLayer },
  //   { label: "HeatMap", value: heatMapCrimelayer },
  // ];

  // const layers = [
  //   // crimeLayer,

  //   // terrainLayer,
  //   // heatMaplayer,
  //   // geoJsonPortLayer,
  //   // arcLayer
  // ];

  //   const [selectedBaseMap, setSelectedBaseMap] = useState(BASEMAPS.mabLibre);

  //   const handleChange = (event) => {
  //     setSelectedBaseMap(event.target.value);
  //   };

  //   async function handleFormSubmit(values, e) {
  //     e.preventDefault();
  //     try {
  //       console.log(values);
  //       console.log("e", e);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  function handleLayerPick(e) {
    if (mapLayers.find((x) => x.id == "scatterplot")) {
      setMapLayers((prev) => prev.filter((x) => x.id != "scatterplot"));
    } else {
      setMapLayers((prev) => [...prev, scatterplotCrimeLayer]);
    }
  }
  return (
    <Formik>
      <Formik
        enableReinitialize
        initialValues={{
          baseMap: "carto",
          // layers: layersOptsObj,
          layers: mapLayers,
        }}
        // onSubmit={handleFormSubmit}
        // innerRef={formRef}
      >
        {(formik) => {
          console.log("formik.values", formik.values.baseMap);
          return (
            <div className=" relative">
              {/* asdasdasda */}
              <Map
                interactive
                style={{ width: "100vw", height: "100vh" }}
                initialViewState={INITIAL_VIEW_STATE}
                mapStyle={
                  formik.values.baseMap == "mabLibre"
                    ? BASEMAPS.mabLibre
                    : formik.values.baseMap == "carto"
                      ? BASEMAPS.carto
                      : undefined
                }
              >
                <div className="absolute top-4 right-10 z-10 bg-white p-4  rounded-lg">
                  <Field
                    mb_0
                    label="Select the map source"
                    labelClassName={"text-lg"}
                    name={"baseMap"}
                    options={baseMapsOptions}
                    // component={RadioGroup}
                    component={FormikRadio}
                    // size="sm"
                    // disabled
                  />
                  <Field
                    label="HeatMap"
                    name="layers"
                    optsList={layersOptsObj}
                    component={FormikLayerPicker}
                  />
                  <button
                    onClick={handleLayerPick}
                    className={twMerge(
                      "text-base font-bold",
                      mapLayers.find((x) => x.id == "scatterplot") &&
                        "text-green-500",
                    )}
                  >
                    scatterplot
                  </button>
                  {/* <Field
                    mb_0
                    name="heatMap"
                    isSwitch
                    containerClassName="w-full justify-start"
                    labelClassName="font-medium p-0 m-0 me-2 max-w-[80%]"
                    component={FormikCheckbox}
                    label="HeatMap."
                  /> */}
                </div>
                {selected && (
                  <Popup
                    key={selected?.arrest_key}
                    anchor="bottom"
                    style={{
                      zIndex: 10,
                    }}
                    longitude={selected?.longitude}
                    latitude={selected?.latitude}
                  >
                    <div className="">
                      <TitleSub
                        title={"arrest_date"}
                        sub={selected?.arrest_date}
                      />
                      <TitleSub title={"pd_desc"} sub={selected?.pd_desc} />
                      <TitleSub title={"ofns_desc"} sub={selected?.ofns_desc} />
                      <TitleSub
                        title={"Category"}
                        sub={<CategorySwitch status={selected?.law_cat_cd} />}
                      />
                    </div>
                    {/* {selected?.arrest_date} {selected?.pd_desc}{" "} */}
                  </Popup>
                )}
                <DeckGLOverlay layers={formik.values.layers} /* interleaved*/ />
                <NavigationControl position="top-left" />
              </Map>
            </div>
          );
        }}
      </Formik>
    </Formik>
  );
}

const baseMapsOptions = [
  {
    label: "MabLibre",
    value: "mabLibre",
    //   desc: "Visible to everyone in the account",
  },
  {
    label: "Carto",
    value: "carto",
  },
];

const RadioGroup = ({ name, label, options }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <div role="group" aria-labelledby={name}>
        {options.map((option) => (
          <label key={option.value} style={{ marginRight: "15px" }}>
            <Field type="radio" name={name} value={option.value} />
            {option.label}
          </label>
        ))}
      </div>
      {/* <ErrorMessage name={name} component="div" className="error" /> */}
    </div>
  );
};
