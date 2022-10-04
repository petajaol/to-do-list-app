function TextInputWithLabel({ id, label, name, value, onChange }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default TextInputWithLabel;
