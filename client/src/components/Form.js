import { useState } from "react";
import restService from "../services/RestService";
import "./Form.css";
import TextInput from "./TextInput";
import RadioGroup from "./RadioGroup";
import DatePickerWithLabel from "./DatePickerWithLabel";

function Form({ setPostResponse }) {
  const emptyForm = {
    name: "",
    type: "",
    deadline: "",
  };

  const [formInputs, setFormInputs] = useState(emptyForm);
  const [checkedRadio, setCheckedRadio] = useState("");

  function clearFormInputs() {
    setFormInputs(emptyForm);
  }

  function validateFormInputs() {
    if (!formInputs.name) {
      alert("Task name is required!");
      return false;
    }
    return true;
  }

  function handleSubmit(event) {
    if (!validateFormInputs()) {
      return;
    }
    (async () => {
      const response = await restService.post(formInputs);
      if (response.status === 200) {
        setPostResponse(response.data);
        clearFormInputs();
      }
    })();
    setCheckedRadio("");
    event.preventDefault();
  }

  return (
    <form id="form" onSubmit={handleSubmit}>
      <TextInput
        className="new-task-input"
        label="Add a new task:"
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
        checked={checkedRadio}
        setChecked={setCheckedRadio}
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
