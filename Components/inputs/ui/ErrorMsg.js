export default function ErrorMsg({ error }) {
  return (
    <>
      {error ? (
        <span className="block text-sm text-danger-300">{error}</span>
      ) : null}
    </>
  );
}
