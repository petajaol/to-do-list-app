import "./App.css";
import Filter from "./components/Filter/Filter";
import List from "./components/Tasklist/Tasklist";
import Form from "./components/Form/Form";

function App() {
  return (
    <div className="app">
      <Form />
      <Filter />
      <List />
    </div>
  );
}

export default App;
