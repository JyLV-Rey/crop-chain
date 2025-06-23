function NumberField({ data, header, setFunction, isRequired = false, min = 0, max = Infinity }) {
  const parsed = parseFloat(data);
  const isEmpty = `${data}`.trim() === '';
  const isInvalid =
    (isRequired && isEmpty) || isNaN(parsed) || parsed < min || parsed > max;

  return (
    <div className="flex flex-col mb-3">
      <h1 className="text-xl font-bold text-neutral-600">{header}</h1>
      <input
        type="number"
        value={data}
        placeholder={`Enter ${header}`}
        onChange={(e) => setFunction(e.target.value)}
        className={`text-lg text-neutral-600 border-2 rounded-md p-1 hover:shadow-lg ease-(--my-beizer) duration-200
          ${isInvalid ? 'border-red-500 ring-1 ring-red-300' : 'border-neutral-200'}`}
      />
      {isInvalid && (
        <span className="text-red-400 text-sm mt-1">
          {isEmpty
            ? 'This field is required.'
            : isNaN(parsed)
            ? 'Please enter a valid number.'
            : parsed < min
            ? `Value must be at least ${min}.`
            : parsed > max
            ? `Value must be at most ${max}.`
            : ''}
        </span>
      )}
    </div>
  );
}

export default NumberField;
