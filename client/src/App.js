import "./App.css";
import Tasklist from "./components/Tasklist/Tasklist";
import Form from "./components/Form/Form";
import { useState } from "react";

function App() {
  const [postResponse, setPostResponse] = useState({});

  return (
    <div className="app">
      <Form setPostResponse={setPostResponse}/>
      <Tasklist newTask={postResponse} />
    </div>
  );
}

export default App;
