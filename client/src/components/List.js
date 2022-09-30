import { useState, useEffect } from "react";
import restService from "../service/RestService";
import "./List.css";

function List() {
  const [undoneTasks, setUndoneTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);

  //delete and update buttons and logic for singular tasks

  useEffect(() => {
    (async () => {
      const response = await restService.get();
      divideTasksToUndoneAndDone(response.data);
    })();
  }, []);

  const divideTasksToUndoneAndDone = (tasks) => {
    const undoneTasks = tasks?.filter((task) => task.done === 0);
    const doneTasks = tasks?.filter((task) => task.done === 1);
    setUndoneTasks(undoneTasks);
    setDoneTasks(doneTasks);
  };

  const moveTaskFromUndoneToDone = (id) => {
    const index = undoneTasks.findIndex((task) => task.id === id);
    if (index > -1) {
      const undoneTasksCopy = [...undoneTasks];
      const removedItem = undoneTasksCopy.splice(index, 1);
      setUndoneTasks(undoneTasksCopy);
      setDoneTasks([...doneTasks, ...removedItem]);
    }
  };

  const updateTaskToDone = (id) => {
    restService.update(id, { done: 1 });
    moveTaskFromUndoneToDone(id);
  };

  console.log(undoneTasks);
  console.log(doneTasks);

  return (
    <table>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Created at</th>
          <th>Deadline</th>
        </tr>
        {undoneTasks.map((task) => (
          <tr key={task.id}>
            <td>{task.name}</td>
            <td>{task.type}</td>
            <td>{task.created_at}</td>
            <td>{task.deadline}</td>
            <td>
              <input
                type="checkbox"
                onChange={() => updateTaskToDone(task.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default List;
