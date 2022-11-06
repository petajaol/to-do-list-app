import "./App.css";
import Tasks from "./components/Tasks";
import Form from "./components/Form";
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
