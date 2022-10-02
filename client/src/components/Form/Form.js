import { useState } from "react";
import restService from "../../service/RestService";
import "./Form.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../InputWithLabel";
import InputWithLabel from "../InputWithLabel";

function Form() {
  const [formFields, setFormFields] = useState({
    name: "",
    type: "",
    deadline: "",
  });
  const [date, setDate] = useState(new Date());

  const handleSubmit = () => {
    (async () => {
      const response = await restService.post(formFields);
    })();
    //how to refresh only the List-component instead of whole component tree (without event.preventDefault())?
  };

  return (
    <form id="form" onSubmit={handleSubmit}>
      <InputWithLabel
        label="Add a new task:"
        type="text"
        id="name"
        name="name"
        value={formFields.name}
        onChange={(event) =>
          setFormFields({ ...formFields, name: event.target.value })
        }
      />
      <InputWithLabel
        label="Home"
        type="radio"
        id="home"
        name="type"
        value="home"
        onChange={(event) =>
          setFormFields({ ...formFields, type: event.target.value })
        }
      />
      <InputWithLabel
        label="School"
        type="radio"
        id="school"
        name="type"
        value="school"
        onChange={(event) =>
          setFormFields({ ...formFields, type: event.target.value })
        }
      />
      <InputWithLabel
        label="Work"
        type="radio"
        id="work"
        name="type"
        value="work"
        onChange={(event) =>
          setFormFields({ ...formFields, type: event.target.value })
        }
      />
      <DatePicker
        selected={date}
        onChange={(date) => {
          setDate(date);
          setFormFields({ ...formFields, deadline: date });
        }}
        dateFormat="dd/MM/yyyy"
      />
      <input type="submit" id="submit" value="Add" />
    </form>
  );
}

export default Form;
