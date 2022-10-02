import { useState, useEffect } from "react";
import restService from "../../service/RestService";
import "./Tasklist.css";

function Tasklist() {
  const [tasks, setTasks] = useState([]);

  console.log(tasks);

  //delete and update buttons and logic for singular tasks

  useEffect(() => {
    (async () => {
      const response = await restService.get();
      setTasks(response.data);
    })();
  }, []);

  /*  useEffect(() => {
    setTasks([...tasks, props.newTask]);
  }, [props.newTask]); */

  const setUpdatedTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? { ...updatedTask } : task
    );
    setTasks(updatedTasks);
  };

  const handleTaskDone = (id) => {
    (async () => {
      const response = await restService.update(id, { done: 1 });
      setUpdatedTask(response.data);
    })();
  };

  const undoneTasks = () => {
    return tasks.filter((task) => task.done === 0);
  };

  const doneTasks = () => {
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
          {undoneTasks().map((task) => (
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
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Done tasks</h3>
      <ul>
        {doneTasks().map((task) => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Tasklist;
