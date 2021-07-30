import React, { useState, useRef, useEffect } from "react";
import ToDoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";
import CreateTodoModal from "./CreateTodoModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function TodoPanel({ setTodosAmount }) {
  const [todos, setTodos] = useState([]);
  const [toSearch, setToSearch] = useState("");
  const phrase = useRef();
  const LOCAL_STORAGE_KEY = "toDoer.todos";
  let todosAmount = todos.filter((todo) => !todo.complete).length;

  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);

  useEffect(() => {
    setTodosAmount(todosAmount);
  }, [todosAmount]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function addTodo(e, todoNameRef, deadline) {
    const name = todoNameRef.current.value;

    if (name === "") return;
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        { id: uuidv4(), name: name, complete: false, deadline: deadline },
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

  function openCreateTodoModal(e) {
    setIsTodoModalOpen(true);
  }

  function cleanCompleteTodos() {
    const newTodos = todos.filter((todo) => !todo.complete);
    console.log(newTodos);
    setTodos(newTodos);
  }

  function searchTodos() {
    const searchedPhrase = phrase.current.value;
    setToSearch(searchedPhrase);
  }

  function cleanInput() {
    setToSearch("");
    phrase.current.value = "";
  }
  return (
    <div className="todo-panel">
      <div className="todo-panel-header">

        <FontAwesomeIcon icon={faPlus} size="3x" className="fake-button" />
        <h2> TODO List</h2>

        <FontAwesomeIcon
          icon={faPlus}
          size="3x"
          className="add-todo-btn"
          onClick={openCreateTodoModal}
        />
      </div>
      <CreateTodoModal
        isOpen={isTodoModalOpen}
        closeCreateTodo={() => setIsTodoModalOpen(false)}
        addTodo={addTodo}
      />
      <div>
        <div className="search-todo-panel">
          <input
            className="search-todo-input"
            placeholder="Enter a phrase that you are searching for"
            ref={phrase}
            onChange={searchTodos}
          ></input>

          {toSearch ? (
            <FontAwesomeIcon
              icon={faTimes}
              className="fa-times"
              onClick={cleanInput}
            />
          ) : (
            <FontAwesomeIcon icon={faSearch} className="fa-search" />
          )}
        </div>
        {todos.length === 0 && (
          <p className="no-task-alert">You haven't created any task yet.</p>
        )}
        <ToDoList todos={todos} toSearch={toSearch} toggleTodo={toggleTodo} />

        <button className="clean-complete-btn" onClick={cleanCompleteTodos}>
          Clean Complete
        </button>
      </div>
    </div>
  );
}
