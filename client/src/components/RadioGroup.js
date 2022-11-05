function RadioGroup({ className, label, radioAttributes, onChange }) {
  return (
    <div className={className}>
      <label>{label}</label>
      {radioAttributes.map((radio) => (
        <div key={radio.label}>
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
