function TextInput({ className, id, label, name, value, onChange }) {
  return (
    <div className={className}>
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default TextInput;
