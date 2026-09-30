import BaseRadio from "@/Components/inputs/BaseRadio";
import CheckboxList from "@/Components/inputs/CheckBoxList";
import { BaseMapsOpts } from "@/utils/baseMaps";
import { twMerge } from "tailwind-merge";
import { OffenseCategories } from "../enums/crime.enums";
import { changeLang, getTrans, tt, useLangStore } from "@/store/useLangStore";
import { useState } from "react";

export default function ControlPanel({
  layersList,

  baseMapState,
  setBaseMapState,

  setMapLayersState,

  OffsCategoryStateList,
  setOffsCategoryStateList,
}) {
  const { lang } = useLangStore();
  const [show, setShow] = useState(true);
  return (
    <div
      className={twMerge(
        "flex flex-row absolute top-4 inset-e-10 z-10 bg-white  rounded-lg",
        show && "p-1",
      )}
    >
      <button
        onClick={() => setShow((prev) => !prev)}
        className={twMerge(
          "text-3xl /my-auto hover:cursor-pointer  py-1 p-1 pr-0.5  flex rounded-md items-center justify-center bg-gray-400/40 border border-black",
          "hover:bg-gray-400/70 transition duration-500 hover:animate-pulse ",
          !show ? "-scale-x-100" : "me-1",
        )}
      >
        {show ? "➧" : "➧"}
      </button>
      <div
        dir={tt("ltr", "rtl")}
        className={twMerge(
          "flex flex-col transition-all  overflow-hidden  duration-1000 gap-1.5  /ring-1 /ring-gray-300 /ring-offset-20 rounded-lg",

          show ? "px-1 opacity-100 h-96 w-80" : "opacity-0 h-10 w-0",
        )}
      >
        <div className="flex justify-between items-center gap-18">
          <h2 className="text-lg font-bold">{getTrans("projectTitle")}</h2>

          <span
            onClick={changeLang}
            className={twMerge(
              "self-end  bg-gray-300 rounded-xl cursor-pointer p-2",
              "hover:bg-gray-400/70 transition ",
            )}
          >
            {tt("عربي", "ENG")}
          </span>
        </div>
        <div className={twMerge("flex flex-col gap-2")}>
          <div>
            <h4 className="text-base /mb-2 font-bold">{getTrans("baseMap")}</h4>
            <BaseRadio
              containerClassName="mb-0 max-h-30 overflow-y-auto"
              value={baseMapState}
              onChange={(e) => setBaseMapState(e.target.value)}
              options={BaseMapsOpts}
            />
          </div>

          <div>
            <h4 className="text-base mb-1 font-bold">{getTrans("layers")}</h4>
            <div className="flex flex-col gap-2 ps-2">
              {layersList.map((x) => {
                return (
                  <label
                    key={x.id}
                    htmlFor={x.id}
                    className="flex cursor-pointer"
                  >
                    <input
                      onChange={(e) => {
                        // console.log("e-checked: ", e.target.checked);
                        // console.log("e-value: ", e.target.defaultValue);
                        handleLayerPick(
                          x.id,
                          x.data,
                          setMapLayersState,
                          layersList,
                          e.target.checked,
                        );
                      }}
                      defaultChecked={isLayerActive(x.id, layersList)}
                      type="checkbox"
                      id={x.id}
                    />
                    <span className="ps-2 font-bold">{getTrans(x.name)}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <CheckboxList
            label={getTrans("filterCategory")}
            itemsList={OffenseCategories}
            idsState={OffsCategoryStateList}
            setIdsState={setOffsCategoryStateList}
          />
        </div>
      </div>
    </div>
  );
}

function isLayerActive(layerId, list) {
  return list?.find((x) => x.id == layerId);
}

function handleLayerPick(layerId, layer, setState, list, val) {
  //   if (isLayerActive(layerId, list)) {
  if (!val) {
    setState((prev) => prev.filter((x) => x.id != layerId));
  } else {
    setState((prev) => [...prev, layer]);
  }
}
