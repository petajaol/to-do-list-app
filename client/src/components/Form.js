import { useState } from "react";
import restService from "../service/RestService";
import "./Form.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Form() {
  const [formFields, setFormFields] = useState({ name: "", type: "", deadline: "" });
  const [date, setDate] = useState(new Date());

  const handleSubmit = () => {
    restService.post(formFields);
    //ilman
    //event.preventDefault();
    //refreshaa koko komponenttipuun, miten saisi pelkän List-komponentin?
  };

  const handleDate = (date) => {
    setDate(date);
    setFormFields({ ...formFields, deadline: date });
  };

  console.log(formFields);

  return (
    <form id="form" onSubmit={handleSubmit}>
      <label htmlFor="name">
        Add a new chore:
        <input
          type="text"
          id="name"
          name="name"
          value={formFields.name}
          onChange={(event) => setFormFields({ ...formFields, name: event.target.value })}
        />
      </label>
      <label htmlFor="home">
        Home
        <input
          type="radio"
          id="home"
          name="type"
          value="home"
          onChange={(event) => setFormFields({ ...formFields, type: event.target.value })}
        />
      </label>
      <label htmlFor="school">
        School
        <input
          type="radio"
          id="school"
          name="type"
          value="school"
          onChange={(event) => setFormFields({ ...formFields, type: event.target.value })}
        />
      </label>
      <label htmlFor="work">
        Work
        <input
          type="radio"
          id="work"
          name="type"
          value="work"
          onChange={(event) => setFormFields({ ...formFields, type: event.target.value })}
        />
      </label>
      <DatePicker selected={date} onChange={(date) => handleDate(date)} dateFormat="dd/MM/yyyy" />
      <input type="submit" id="submit" value="Add" />
    </form>
  );
}

export default Form;
