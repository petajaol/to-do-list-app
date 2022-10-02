function InputWithLabel(props) {
  return (
    <label htmlFor={props.id}>
      {props.label}
      <input
        type={props.type}
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
    </label>
  );
}

export default InputWithLabel;
