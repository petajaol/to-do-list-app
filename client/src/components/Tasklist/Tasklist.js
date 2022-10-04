import { useState, useEffect } from "react";
import restService from "../../services/RestService";
import "./Tasklist.css";

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

  const applyUpdateToTasks = (updatedTask) => {
    return tasks.map((task) =>
      task.id === updatedTask.id ? { ...updatedTask } : task
    );
  };

  const deleteFromTasks = (id) => {
    const index = tasks.findIndex((task) => task.id === id);
    const tasksCopy = [...tasks];
    tasksCopy.splice(index, 1);
    return tasksCopy;
  };

  const handleTaskDone = (id) => {
    (async () => {
      const response = await restService.update(id, { done: 1 });
      if (response.status === 200) {
        const tasksWithUpdate = applyUpdateToTasks(response.data);
        setTasks(tasksWithUpdate);
      }
    })();
  };

  const handleTaskDeleted = (id) => {
    (async () => {
      const response = await restService.delete(id);
      if (response.status === 200) {
        const tasksAfterDelete = deleteFromTasks(id);
        setTasks(tasksAfterDelete);
      }
    })();
  };

  const filterUndoneTasks = () => {
    return tasks.filter((task) => task.done === 0);
  };

  const filterDoneTasks = () => {
    return tasks.filter((task) => task.done === 1);
  };

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Created at</th>
            <th>Deadline</th>
          </tr>
          {filterUndoneTasks().map((task) => (
            <tr key={task.id}>
              <td>{task.name}</td>
              <td>{task.type}</td>
              <td>{task.created_at}</td>
              <td>{task.deadline}</td>
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleTaskDone(task.id)}
                />
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => handleTaskDeleted(task.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Done tasks</h3>
      <ul>
        {filterDoneTasks().map((task) => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Tasklist;
