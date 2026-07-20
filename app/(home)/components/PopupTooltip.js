import TitleSub from "@/Components/TitleSub";
import { getTrans, tt } from "@/store/useLangStore";
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
      <div dir={tt("ltr", "rtl")} className="">
        <TitleSub title={getTrans("longitude")} sub={selected?.longitude} />
        <TitleSub title={getTrans("latitude")} sub={selected?.latitude} />
        <TitleSub title={getTrans("arrestDate")} sub={selected?.arrest_date} />
        <TitleSub title={getTrans("pdDesc")} sub={selected?.pd_desc} />
        <TitleSub title={getTrans("ofnsDesc")} sub={selected?.ofns_desc} />
        <TitleSub
          title={getTrans("category")}
          sub={<CategorySwitch status={selected?.law_cat_cd} />}
        />
      </div>
    </Popup>
  );
}
