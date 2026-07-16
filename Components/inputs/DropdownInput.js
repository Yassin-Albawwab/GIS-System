import Label from "./ui/Label";

export default function DropdownInput({ label, state, setState, list }) {
  // Initialize state with a default selected option value

  // Event handler to capture user updates
  const handleChange = (event) => {
    setState(event.target.value);
  };

  return (
    <div>
      <Label customClasses="font-bold text-base mb-1.5">{label}</Label>
      {/* The value and onChange props control the selected element */}
      <select id="opts-select" value={state} onChange={handleChange}>
        {list.map((x) => (
          <option key={crypto.randomUUID()} value={x.value}>
            {x.label}
          </option>
        ))}
        {/* <option value="F">Felony</option>
        <option value="V">Violance</option>
        <option value="M">Misdemeanor</option> */}
      </select>
    </div>
  );
}
