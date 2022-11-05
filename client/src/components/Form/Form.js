import { useState } from "react";
import restService from "../../services/RestService";
import "./Form.css";
import TextInputWithLabel from "../TextInputWithLabel";
import RadioGroup from "../RadioGroup";
import DatePickerWithLabel from "./DatePickerWithLabel";

function Form({ setPostResponse }) {
  const emptyForm = {
    name: "",
    type: "",
    deadline: "",
  };

  const [formInputs, setFormInputs] = useState(emptyForm);

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
        className="new-task-input"
        label="Add a new task:"
        id="name"
        name="name"
        value={formInputs.name}
        onChange={(event) =>
          setFormInputs({ ...formInputs, name: event.target.value })
        }
      />
      <RadioGroup
        label="Select task type: "
        className="radio-group"
        radioAttributes={[
          { label: "Home", value: "home" },
          { label: "School", value: "school" },
          { label: "Work", value: "work" },
        ]}
        onChange={(event) =>
          setFormInputs({ ...formInputs, type: event.target.value })
        }
      />
      <DatePickerWithLabel
        className={"deadline"}
        label={"Deadline"}
        setFormInputs={setFormInputs}
        form={formInputs}
      />
      <input type="submit" id="submit" value="Add" />
    </form>
  );
}

export default Form;
