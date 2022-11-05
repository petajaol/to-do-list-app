import "./App.css";
import Tasks from "./components/Tasks/Tasks";
import Form from "./components/Form/Form";
import { useState } from "react";

function App() {
  const [postResponse, setPostResponse] = useState({});

  return (
    <div className="app">
      <Form setPostResponse={setPostResponse}/>
      <Tasks newTask={postResponse} />
    </div>
  );
}

export default App;
