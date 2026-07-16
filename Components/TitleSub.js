export default function TitleSub({ title, sub }) {
  return (
    <div className="flex gap-2 items-center border-b border-black last:border-0">
      <h5 className="text-amber-700 font-bold text-base">{title}:</h5>
      <span>{sub}</span>
    </div>
  );
}
