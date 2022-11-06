import { useState, useEffect } from "react";
import restService from "../services/RestService";
import Tasktable from "./Tasktable";
import "./Tasks.css";

function Tasklist({ newTask }) {
  const [tasks, setTasks] = useState([]);

  //delete and update buttons and logic for singular tasks

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
  };

  function deleteFromTasks(id) {
    return tasks.filter((task) => task.id !== id);
  };

  function handleTaskDone(id) {
    (async () => {
      const response = await restService.update(id, { done: 1 });
      if (response.status === 200) {
        const tasksWithUpdate = applyUpdateToTasks(response.data);
        setTasks(tasksWithUpdate);
      }
    })();
  };

  function handleTaskDeleted(id) {
    (async () => {
      const response = await restService.delete(id);
      if (response.status === 200) {
        const tasksAfterDelete = deleteFromTasks(id);
        setTasks(tasksAfterDelete);
      }
    })();
  };

  function filterUndoneTasks() {
    return tasks.filter((task) => task.done === 0);
  };

  function filterDoneTasks() {
    return tasks.filter((task) => task.done === 1);
  };

  return (
    <>
      <Tasktable
        className="todo"
        tableHeader={"To do"}
        columnHeaders={["Name", "Type", "Created at", "Deadline"]}
        rowContent={filterUndoneTasks()}
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

export default Tasklist;
