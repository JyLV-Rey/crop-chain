function ProductNumberField({ index, data, header, setFunction, isRequired = false, field }) {
  const isInvalid = isRequired && (data === "" || data === null || isNaN(Number(data)));

  return (
    <div className="flex flex-col mb-3">
      <h1 className="text-xl font-bold text-neutral-500">{header}</h1>
      <input
        type="number"
        value={data}
        placeholder={`Enter ${header}`}
        onChange={(e) => setFunction(e, index, field)}
        className={`text-lg text-neutral-600 border-2 rounded-md p-1 hover:shadow-lg ease-(--my-beizer) duration-200
          ${isInvalid ? 'border-red-400 ring-1 ' : 'border-neutral-200'}`}
      />
      {isInvalid && (
        <span className="text-red-400 text-sm mt-1">This field is invalid.</span>
      )}
    </div>
  );
}

export default ProductNumberField;
