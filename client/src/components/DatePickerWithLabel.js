import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DatePickerWithLabel({ className, label, setFormInputs, form }) {
  const [date, setDate] = useState(new Date());

  return (
    <div className={className}>
      <label>{label}</label>
      <DatePicker
        selected={date}
        onChange={(date) => {
          setDate(date);
          setFormInputs({ ...form, deadline: date });
        }}
        dateFormat="dd/MM/yyyy"
      />
    </div>
  );
}

export default DatePickerWithLabel;
