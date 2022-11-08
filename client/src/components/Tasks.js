import { useState, useEffect } from "react";
import restService from "../services/RestService";
import Tasktable from "./Tasktable";
import "./Tasks.css";
import FilterSelector from "./FilterSelector";

function Tasks({ newTask }) {
  const [tasks, setTasks] = useState([]);
  const [filterOption, setFilterOption] = useState("all");

  useEffect(() => {
    (async () => {
      const response = await restService.get();
      setTasks(response.data);
    })();
  }, []);

  useEffect(() => {
    setTasks([...tasks, newTask]);
    // eslint-disable-next-line
  }, [newTask]);

  function applyUpdateToTasks(updatedTask) {
    return tasks.map((task) =>
      task.id === updatedTask.id ? { ...updatedTask } : task
    );
  }

  function deleteFromTasks(id) {
    return tasks.filter((task) => task.id !== id);
  }

  function handleTaskDone(id) {
    (async () => {
      const response = await restService.update(id, { done: 1 });
      if (response.status === 200) {
        const tasksWithUpdate = applyUpdateToTasks(response.data);
        setTasks(tasksWithUpdate);
      }
    })();
  }

  function handleTaskDeleted(id) {
    (async () => {
      const response = await restService.delete(id);
      if (response.status === 200) {
        const tasksAfterDelete = deleteFromTasks(id);
        setTasks(tasksAfterDelete);
      }
    })();
  }

  function filterUndoneTasksWithSelect() {
    const undoneTasks = tasks.filter((task) => task.done === 0);
    if (filterOption === "all") {
      return undoneTasks;
    } else {
      return undoneTasks.filter((task) => filterOption === task.type);
    }
  }

  function filterDoneTasks() {
    return tasks.filter((task) => task.done === 1);
  }

  return (
    <>
      <FilterSelector
        className={"filter"}
        label={"Filter tasks by type"}
        onChange={(event) => setFilterOption(event.target.value)}
        options={[
          { value: "all", name: "All" },
          { value: "home", name: "Home" },
          { value: "school", name: "School" },
          { value: "work", name: "Work" },
        ]}
      />
      <Tasktable
        className="todo"
        tableHeader={"To do"}
        columnHeaders={["Name", "Type", "Created at", "Deadline"]}
        rowContent={filterUndoneTasksWithSelect()}
        showDoneButton={true}
        handleTaskDone={handleTaskDone}
        handleTaskDeleted={handleTaskDeleted}
      />
      <Tasktable
        className="done"
        tableHeader={"Done tasks"}
        columnHeaders={["Name", "Type", "Created at", "Deadline"]}
        rowContent={filterDoneTasks()}
        handleTaskDeleted={handleTaskDeleted}
        showDoneButton={false}
      />
    </>
  );
}

export default Tasks;
