import TitleSub from "@/Components/TitleSub";
import { Popup } from "@vis.gl/react-maplibre";
import CategorySwitch from "./CategorySwitch";

export default function PopupTooltip({ selected }) {
  return (
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
        <TitleSub title={"longitude"} sub={selected?.longitude} />
        <TitleSub title={"Latitude"} sub={selected?.latitude} />
        <TitleSub title={"arrest_date"} sub={selected?.arrest_date} />
        <TitleSub title={"pd_desc"} sub={selected?.pd_desc} />
        <TitleSub title={"ofns_desc"} sub={selected?.ofns_desc} />
        <TitleSub
          title={"Category"}
          sub={<CategorySwitch status={selected?.law_cat_cd} />}
        />
      </div>
    </Popup>
  );
}
