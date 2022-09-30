import { useState, useEffect } from "react";
import restService from "../service/RestService";
import "./List.css";

function List() {
  const [chores, setChores] = useState([]);

  //make two arrays on basis of done and undone?

  //delete and update buttons and logic for singular chores

  useEffect(() => {
    /* (async () => {
      const response = await restService.get();
      setChores(response.data);
    })(); */
    fetchChores();
  }, []);

  console.log(chores);

  async function fetchChores() {
    const response = await restService.get();
    setChores(response.data); 
  }

  const updateChoreToDone = (id) => {
    //slice from done list and add to undone list?
    restService.update(id, { done: 1 });
    const updatedChores = chores.map((chore) =>
      chore.id === id ? { ...chore, done: 1 } : chore
    );
    setChores(updatedChores);
  };

  const returnUndoneChores = () => {
    return chores?.filter((chore) => chore.done === 0);
  };

/*   const returnDoneChores = () => {
    return chores?.filter((chore) => chore.done === 1);
  }; */

  return (
    <table>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Created at</th>
          <th>Deadline</th>
        </tr>
        {returnUndoneChores()?.map((chore) => (
          <tr key={chore.id}>
            <td>{chore.name}</td>
            <td>{chore.type}</td>
            <td>{chore.created_at}</td>
            <td>{chore.deadline}</td>
            <td>
              <input
                type="checkbox"
                onChange={() => updateChoreToDone(chore.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default List;
