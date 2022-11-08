function FilterSelector({ className, label, onChange, options }) {
  return (
    <div className={className}>
      <label>{label}</label>
      <select onChange={onChange}>
        {options.map((option) => (
          <option value={option.value}>{option.name}</option>
        ))}
      </select>
    </div>
  );
}

export default FilterSelector;
