import React, { useState, useRef } from "react";
import ToDoList from "./TodoList";
import CreateTodoModal from "./CreateTodoModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function TodoPanel({
  todos,
  addTodo,
  updateTodo,
  toggleTodo,
  cleanCompleteTodos,
}) {
  const [toSearch, setToSearch] = useState("");
  const phrase = useRef();


  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);

  function openCreateTodoModal(e) {
    setIsTodoModalOpen(true);
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
        {/* <i className='fas fa-plus fa-2x fake-button'></i> */}
        <FontAwesomeIcon icon={faPlus} size="3x" className="fake-button" />
        <h2> TODO List</h2>

        {/* <i className='fas fa-plus fa-2x add-todo-btn' onClick={openCreateTodoModal}></i> */}
        <FontAwesomeIcon
          icon={faPlus}
          size="3x"
          className="add-todo-btn"
          onClick={openCreateTodoModal}
        />
      </div>
      {isTodoModalOpen && (
        <CreateTodoModal
          closeCreateTodo={() => setIsTodoModalOpen(false)}
          addTodo={addTodo}
        />
      )}
      <div className="todo-panel-content">
        <div className="search-todo-panel">
          <input
            className="search-todo-input"
            placeholder="enter a phrase that you are searching for"
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
        <ToDoList todos={todos}  updateTodo = {updateTodo} toSearch={toSearch} toggleTodo={toggleTodo} />

        {todos.length !== 0 && (
          <button className="clean-complete-btn" onClick={cleanCompleteTodos}>
            Clean Complete
          </button>
        )}
      </div>
    </div>
  );
}
