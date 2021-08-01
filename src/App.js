import React, { useRef, useEffect, useState } from "react";
import TodoPanel from "./components/TodoPanel";
import Header from "./components/Header";
import "./styles.css";
import NavPanel from "./components/NavPanel";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./components/About";
import { v4 as uuidv4 } from "uuid";

function App() {
  const navTabs = ["about", "backlog", "history", "calender"];
  const [todos, setTodos] = useState([]);
  const phrase = useRef();
  const LOCAL_STORAGE_KEY = "toDoer.todos";
  const todosAmount = todos.filter((todo) => !todo.complete).length;

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function addTodo(todoNameRef, deadline, descriptionRef) {
    const name = todoNameRef.current.value;
    const description = descriptionRef.current.value;

    if (name === "") return;
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        {
          id: uuidv4(),
          name: name,
          description: description,
          complete: false,
          deadline: deadline,
        },
      ];
    });
    todoNameRef.current.value = null;
  }

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function cleanCompleteTodos() {
    const newTodos = todos.filter((todo) => !todo.complete);
    console.log(newTodos);
    setTodos(newTodos);
  }

  return (
    <Router>
      <Header todosAmount={todosAmount} />
      <div className="body-container">
        <NavPanel navTabs={navTabs} />
        <div className="main-content">
          <Switch>
            <Route path="/" exact component={About} />
            <Route path="/about" component={About} />
            <Route path="/backlog">
              <TodoPanel
                todos={todos}
                addTodo={addTodo}
                toggleTodo={toggleTodo}
                cleanCompleteTodos={cleanCompleteTodos}
              />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
