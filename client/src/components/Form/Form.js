import { useState } from "react";
import restService from "../../services/RestService";
import "./Form.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../InputWithLabel";
import TextInputWithLabel from "../InputWithLabel";
import RadioGroup from "../RadioGroup";

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
      <TextInputWithLabel
        label="Add a new task:"
        id="name"
        name="name"
        value={formInputs.name}
        onChange={(event) =>
          setFormInputs({ ...formInputs, name: event.target.value })
        }
      />
      <RadioGroup
        radioAttributes={[
          { label: "Home", value: "home" },
          { label: "School", value: "school" },
          { label: "Work", value: "work" },
        ]}
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
