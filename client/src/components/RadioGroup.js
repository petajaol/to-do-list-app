function RadioGroup({ radioAttributes, onChange }) {
  return (
    <div>
      {radioAttributes.map((radio) => (
        <div>
          <label htmlFor={radio.value}>{radio.label}</label>
          <input
            label={radio.label}
            type="radio"
            id={radio.value}
            name="type"
            value={radio.value}
            onChange={onChange}
          />
        </div>
      ))}
    </div>
  );
}

export default RadioGroup;
