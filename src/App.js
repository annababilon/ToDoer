import React, { useState } from "react";
import TodoPanel from "./components/TodoPanel";
import Header from "./components/Header";
import "./styles.css";
import NavPanel from "./components/NavPanel";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./components/About";


function App() {
  const [todosAmount, setTodosAmount] = useState();
  const navTabs = ["about", "backlog", "history", "calender"];

  return (
    
    <Router>
    <Header todosAmount={todosAmount} />
      <div className="body-container">
        <NavPanel navTabs={navTabs} />
        <div className="main-content">
          <Switch>
            <Route path = "/about" component= {About} />
            <Route path = "/backlog">
              <TodoPanel setTodosAmount={setTodosAmount} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
     
  );
}

export default App;