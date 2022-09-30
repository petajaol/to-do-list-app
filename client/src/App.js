import "./App.css";
import Filter from "./components/Filter";
import List from "./components/List";
import Form from "./components/Form";

function App() {
  console.log("asdasd")
  return (
    <div className="app">
      <Form />
      <Filter />
      <List />
    </div>
  );
}

export default App;
