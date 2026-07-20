import BaseRadio from "@/Components/inputs/BaseRadio";
import CheckboxList from "@/Components/inputs/CheckBoxList";
import DropdownInput from "@/Components/inputs/DropdownInput";
import { ProgressInput } from "@/Components/inputs/ProgressInput";
import { BaseMapsOpts } from "@/utils/baseMaps";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { OffenseCategories } from "../enums/crime.enums";

export default function ControlPanel({
  layersList,

  baseMapState,
  setBaseMapState,

  setMapLayersState,

  OffsCategoryStateList,
  setOffsCategoryStateList,
}) {
  const [show, setShow] = useState(true);
  return (
    <div
      className={twMerge(
        "flex flex-col gap-1.5 ring-1 ring-gray-300 ring-offset-20 rounded-lg",
        !show && "/p-0",
      )}
    >
      <span
        onClick={() => {
          setShow((prev) => !prev);
        }}
        className={twMerge(
          "self-end  bg-gray-300 rounded-xl cursor-pointer p-2",
          !show && "text-lg",
        )}
      >
        {show ? "⛶" : "⌞⌝"}
      </span>
      <div className={twMerge("flex flex-col gap-2", !show && "hidden")}>
        <div>
          <h4 className="text-base -mb-2 font-bold">Base Map: </h4>
          <BaseRadio
            containerClassName="mb-0 max-h-30 overflow-y-auto"
            value={baseMapState}
            onChange={(e) => setBaseMapState(e.target.value)}
            options={BaseMapsOpts}
          />
        </div>

        <div>
          <h4 className="text-base mb-1 font-bold">Layers: </h4>
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
                  <span className="ps-2 font-bold">{x.name}</span>
                </label>
              );
            })}
          </div>
        </div>

        <CheckboxList
          label="Select Preferences"
          itemsList={OffenseCategories}
          idsState={OffsCategoryStateList}
          setIdsState={setOffsCategoryStateList}
        />
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
