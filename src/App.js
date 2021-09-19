import React, { useRef, useEffect, useState } from "react";
import "./styles.css";
import Header from "./components/Header";

import NavPanel from "./components/NavPanel";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./components/About";
import { v4 as uuidv4 } from "uuid";
import Planner from "./components/Planner";

function App() {
  const navTabs = ["About", "Planner", "History", "Calender"];
  const [todos, setTodos] = useState([]);
  const [dayPlan, setDayPlan] = useState(new Map());
  const LOCAL_STORAGE_TODOS = "toDoer.todos";
  const LOCAL_STORAGE_DAYPLAN = "toDoer.dayPlan";
  const today = new Date();
  today.setHours(0,0,0,0);
  const todayString = today.toString();
  const todosAmount = dayPlan.has(todayString)? dayPlan.get(todayString).filter((todo)=> !todo.complete).length : 0;

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODOS));
    console.log("retrieved local todos", storedTodos);
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_TODOS, JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const storedDayPlan = new Map(
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_DAYPLAN))
    );

    const newMap = new Map();
    Array.from(storedDayPlan.keys()).forEach(function (key) {
      const newkey = new Date(key).toString();
      newMap.set(newkey, storedDayPlan.get(key));
    });

    if (newMap) {
      setDayPlan(newMap);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_DAYPLAN,
      JSON.stringify(Array.from(dayPlan.entries()))
    );
  }, [dayPlan]);

  function addTodo(name, deadline, description) {
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
          plannedDate: null,
        },
      ];
    });
  }
  //to change, find out how to render component when only any value in object changes
  function updateTodo(todoId, name, deadline, description) {
    if (name === "") return;
    setTodos((prevTodos) => {
      const toDeleteIndex = todos.findIndex((todo) => todo.id === todoId);
      const newTodos = [...prevTodos];
      newTodos.splice(toDeleteIndex, 1, {
        id: uuidv4(),
        name: name,
        description: description,
        complete: false,
        deadline: deadline,
      });
      return newTodos;
    });
  }

  function assignToDay(todoId, date, index) {
    const todoIndex = todos.findIndex((todo) => todo.id === todoId);
    const todo = todos[todoIndex];

    setDayPlan((prevPlan) => {
      const dateKey = date.toString();
      if (!prevPlan.has(dateKey)) {
        const newDayPlan = new Map(prevPlan);
        newDayPlan.set(dateKey, [todo]);
        return newDayPlan;
      } else {
        const newDayPlan = new Map(prevPlan);
        const dayTodos = newDayPlan.get(dateKey);
        dayTodos.splice(index, 0, todo);
        newDayPlan.set(dateKey, dayTodos);
        return newDayPlan;
      }
    });

    setTodos((prevTodos) => {
      //check if I need 2 lines or if I can do it in one
      const newTodos = [...prevTodos];
      newTodos.splice(todoIndex, 1);
      return newTodos;
    });
  }

  function assignToBacklog(todoId, date, destinationIndex) {
    const dateKey = date.toString();

    setTodos((prevTodos) => {
      const dayTodos = dayPlan.get(dateKey);
      const todoIndex = dayTodos.findIndex((todo) => todo.id === todoId);
      const todo = dayTodos[todoIndex];
      const newUnplannedTodos = [...todos];
      newUnplannedTodos.splice(destinationIndex, 0, todo);
      return newUnplannedTodos;
    });

    setDayPlan((prevDayPlan) => {
      const newDayPlan = new Map(prevDayPlan);
      const todos = newDayPlan.get(dateKey);
      const todoIndex = todos.findIndex((todo) => todo.id === todoId);
      todoIndex >= 0 && todos.splice(todoIndex, 1);
      if (todos.length === 0) {
        newDayPlan.delete(dateKey);
      } else {
        newDayPlan.set(dateKey, todos);
      }
      return newDayPlan;
    });
  }
  
  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function cleanCompleteTodos() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  function reorderUnplannedTodos(sourceIndex, destinationIndex) {
    const orderedTodos = [...todos];
    const todo = orderedTodos[sourceIndex];
    orderedTodos.splice(sourceIndex, 1);
    orderedTodos.splice(destinationIndex, 0, todo);
    setTodos(orderedTodos);
  }

  function reorderPlannedTodos(date, sourceIndex, destinationIndex) {
    const dateKey = date.toString();
    const newDayPlan = new Map(dayPlan);
    const orderedTodos = dayPlan.get(dateKey);
    const todo = orderedTodos[sourceIndex];
    orderedTodos.splice(sourceIndex, 1);
    orderedTodos.splice(destinationIndex, 0, todo);
    setDayPlan(newDayPlan.set(date, orderedTodos));
  }
  return (
    <Router>
      <Header todosAmount={todosAmount} />
      <div className="body-container">
        <NavPanel navTabs={navTabs} />
        <div className="main-content">
          <Switch>
            <Route path="/" exact component={About} />
            <Route path="/About" component={About} />
            <Route path="/Planner">
              <Planner
                unplannedTodos={todos}
                dayPlan={dayPlan}
                addTodo={addTodo}
                updateTodo={updateTodo}
                assignToDay={assignToDay}
                assignToBacklog={assignToBacklog}
                toggleTodo={toggleTodo}
                cleanCompleteTodos={cleanCompleteTodos}
                reorderPlannedTodos={reorderPlannedTodos}
                reorderUnplannedTodos={reorderUnplannedTodos}
              />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
