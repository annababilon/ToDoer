import React, { useState } from "react";
import TodoPanel from "./components/TodoPanel";
import Header from "./components/Header";
import "./styles.css";
import NavPanel from "./components/NavPanel";


function App() {
  const [todosAmount, setTodosAmount] = useState([]);
  const navTabs = ["Home", "About", "History", "Calender"];

  return (
    <>
      <Header todosAmount={todosAmount} />
      <div className="body-container">
        <NavPanel navTabs={navTabs} />
        <div className="main-content">
          <TodoPanel setTodosAmount={setTodosAmount} />
        </div>
      </div>
    </>
  );
}

export default App;