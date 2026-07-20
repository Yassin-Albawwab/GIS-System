import BaseRadio from "@/Components/inputs/BaseRadio";
import CheckboxList from "@/Components/inputs/CheckBoxList";
import { BaseMapsOpts } from "@/utils/baseMaps";
import { twMerge } from "tailwind-merge";
import { OffenseCategories } from "../enums/crime.enums";
import { changeLang, getTrans, tt, useLangStore } from "@/store/useLangStore";

const offenseCategoryTransKey = {
  F: "felony",
  M: "misdemeanor",
  V: "violance",
};

export default function ControlPanel({
  layersList,

  baseMapState,
  setBaseMapState,

  setMapLayersState,

  OffsCategoryStateList,
  setOffsCategoryStateList,
}) {
  const { lang } = useLangStore();

  return (
    <div
      dir={tt("ltr", "rtl")}
      className={twMerge(
        "flex flex-col gap-1.5 ring-1 ring-gray-300 ring-offset-20 rounded-lg",
      )}
    >
      <div className="flex justify-between items-center gap-18">
        <h2 className="text-lg font-bold">{getTrans("projectTitle")}</h2>

        <span
          onClick={changeLang}
          className={twMerge(
            "self-end  bg-gray-300 rounded-xl cursor-pointer p-2",
          )}
        >
          {tt("EN", "AR")}
        </span>
      </div>
      <div className={twMerge("flex flex-col gap-2")}>
        <div>
          <h4 className="text-base -mb-2 font-bold">{getTrans("baseMap")}</h4>
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
