import { faWindowClose } from "@fortawesome/fontawesome-free-regular";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { forwardRef, useRef, useState } from "react";
import ReactDatePicker from "react-datepicker";
import ReactDom from "react-dom";

export default function CreateTodoModal({ closeCreateTodo, addTodo, todo }) {
  const todoName = useRef();
  const description = useRef();
  const [deadline, setDeadline] = useState(
    todo ? new Date(todo.deadline) : null
  );

  const [nameValue, setNameValue] = useState(todo ? todo.name : "");
  const [descriptionValue, setDescriptionValue] = useState(
    todo ? todo.description : ""
  );

  const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
    <>
      <div className="set-deadline-panel">
        <FontAwesomeIcon icon={faCalendarAlt}></FontAwesomeIcon>
        <p className="deadline-button" onClick={onClick} ref={ref}>
          Set a deadline (optional)
        </p>
      </div>
      {value && (
        <div className="set-deadline-panel">
          Deadline: <b> {value} </b>{" "}
        </div>
      )}
    </>
  ));

  function handleTodo() {
    if (!todo) addTodo(todoName, deadline, description);
    else {
      todo.name = todoName.current.value;
      todo.deadline = deadline;
      todo.description = description.current.value;
    }
  }

  return ReactDom.createPortal(
    <>
      <div className="todo-input-window-overlay "></div>
      <div className="todo-input-window">
        <div className="todo-input-header">
          <FontAwesomeIcon
            icon={faWindowClose}
            size="3x"
            className="fake-button"
            onClick={closeCreateTodo}
          ></FontAwesomeIcon>
          {todo ? <h2>EDIT TODO</h2> : <h2>CREATE TODO</h2>}

          <FontAwesomeIcon
            icon={faWindowClose}
            size="3x"
            className="close-todo-btn"
            onClick={closeCreateTodo}
          ></FontAwesomeIcon>
        </div>
        <h4>Title*:</h4>
        <input
          className="todo-input"
          type="text"
          maxLength="60"
          ref={todoName}
          autoFocus
          value={nameValue}
          onChange={(e) => setNameValue(todoName.current.value)}
        ></input>
        <h4>Description:</h4>
        <textarea
          className="todo-input"
          maxLength="340"
          rows="5"
          ref={description}
          value={descriptionValue}
          onChange={(e) => setDescriptionValue(description.current.value)}
        ></textarea>

        <ReactDatePicker
          selected={deadline}
          onChange={(date) => setDeadline(date)}
          customInput={<CustomDateInput />}
          popperPlacement="right"
          minDate={new Date()}
          isClearable
        />

        <button
          className="create-todo-btn"
          onClick={() => {
            handleTodo();
            setDeadline(null);
            closeCreateTodo();
          }}
        >
          {" "}
          {todo? "SAVE":"CREATE"  }
        </button>
      </div>
    </>,
    document.getElementById("portal")
  );
}
