function TextInputWithLabel({ className, id, label, name, value, onChange }) {
  return (
    <div className={className}>
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
