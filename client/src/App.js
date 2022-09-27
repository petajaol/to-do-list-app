import "./App.css";
import axios from "axios";

function App() {
  const get = () => {
    axios.get(`http://localhost:3000/chores/1`).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div className="App">
      <button onClick={get}>GET</button>
    </div>
  );
}

export default App;
