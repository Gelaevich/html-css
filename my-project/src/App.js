import React from "react";
import CounterClass from "./components/CounterClass";
import CounterFunction from "./components/CounterFunction";
import "./App.css";

function App() {
  return (
    <div className="App">
      <CounterClass />
      <CounterFunction />
    </div>
  );
}

export default App;
