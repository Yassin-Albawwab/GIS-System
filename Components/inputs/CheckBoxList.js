// import { useState } from "react";
import { getTrans } from "@/store/useLangStore";
import Label from "./ui/Label";

export default function CheckboxList({
  itemsList,
  label,
  idsState,
  setIdsState,
  showSelectedIds = false,
}) {
  // State holds an array of selected item IDs
  //   const [selectedIds, setSelectedIds] = useState([]);

  const handleCheckboxChange = (id) => {
    setIdsState(
      (prev) =>
        prev.includes(id)
          ? prev.filter((itemIds) => itemIds !== id) // Remove if checked
          : [...prev, id], // Add if unchecked
    );
  };

  return (
    <form>
      <Label customClasses="font-bold text-base mb-1.5">{label}</Label>
      <div className="flex flex-col items-start ps-2 gap-1.5">
        {itemsList?.map((i) => (
          <label
            key={i.id}
            className="flex justify-center gap-2 cursor-pointer"
          >
            <input
              type="checkbox"
              // Controlled property: derives boolean directly from state
              checked={idsState.includes(i.id)}
              onChange={() => handleCheckboxChange(i.id)}
            />
            {getTrans(i.label)}
          </label>
        ))}
      </div>

      {showSelectedIds && <p>Selected IDs: {idsState.join(", ")}</p>}
    </form>
  );
}
