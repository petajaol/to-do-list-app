import { useState } from "react";
import restService from "../../services/RestService";
import "./Form.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../InputWithLabel";
import InputWithLabel from "../InputWithLabel";

function Form({ setPostResponse }) {
  const emptyForm = {
    name: "",
    type: "",
    deadline: "",
  };

  const [formInputs, setFormInputs] = useState(emptyForm);
  const [date, setDate] = useState(new Date());

  const clearFormInputs = () => {
    setFormInputs(emptyForm);
  };

  const handleSubmit = (event) => {
    (async () => {
      const response = await restService.post(formInputs);
      setPostResponse(response.data);
      clearFormInputs();
    })();
    event.preventDefault();
  };

  return (
    <form id="form" onSubmit={handleSubmit}>
      <InputWithLabel
        label="Add a new task:"
        type="text"
        id="name"
        name="name"
        value={formInputs.name}
        onChange={(event) =>
          setFormInputs({ ...formInputs, name: event.target.value })
        }
      />
      <InputWithLabel
        label="Home"
        type="radio"
        id="home"
        name="type"
        value="home"
        onChange={(event) =>
          setFormInputs({ ...formInputs, type: event.target.value })
        }
      />
      <InputWithLabel
        label="School"
        type="radio"
        id="school"
        name="type"
        value="school"
        onChange={(event) =>
          setFormInputs({ ...formInputs, type: event.target.value })
        }
      />
      <InputWithLabel
        label="Work"
        type="radio"
        id="work"
        name="type"
        value="work"
        onChange={(event) =>
          setFormInputs({ ...formInputs, type: event.target.value })
        }
      />
      <label>Deadline</label>
      <DatePicker
        selected={date}
        onChange={(date) => {
          setDate(date);
          setFormInputs({ ...formInputs, deadline: date });
        }}
        dateFormat="dd/MM/yyyy"
      />
      <input type="submit" id="submit" value="Add" />
    </form>
  );
}

export default Form;
