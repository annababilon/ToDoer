import { faWindowClose } from "@fortawesome/fontawesome-free-regular";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { forwardRef, useRef, useState } from "react";
import ReactDatePicker, { CalendarContainer } from "react-datepicker";
import ReactDom from "react-dom";

export default function CreateTodoModal({
  isOpen,
  children,
  closeCreateTodo,
  addTodo,
}) {
  const todoName = useRef();
  const description =useRef();
  const [deadline, setDeadline] = useState(null);

  const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
    <>
  <div className="set-deadline-panel">
    <FontAwesomeIcon icon = {faCalendarAlt}></FontAwesomeIcon>
      <p
        className="deadline-button"
        onClick={onClick}
        ref={ref}
      >
        Set a deadline (optional)
      </p>
      </div>
      {value && <div className ="set-deadline-panel">Deadline: <b> {value} </b> </div>}
      
    </>
  

  ));


  if (!isOpen) return null;

  function createTodo() {
    addTodo(todoName, deadline, description);
  }

 
  return ReactDom.createPortal(
    <>
      <div className="todo-input-window-overlay "></div>
      <div className="todo-input-window">
        <div className="todo-input-header">
          <FontAwesomeIcon icon = {faWindowClose} size="3x" className="fake-button" onClick={closeCreateTodo}></FontAwesomeIcon>
          <h2>CREATE TODO</h2>

        <FontAwesomeIcon icon = {faWindowClose} size="3x" className="close-todo-btn" onClick={closeCreateTodo}></FontAwesomeIcon>
        </div>
        <h4>Title*:</h4>
        <input className="todo-input" type="text" maxlength = "50"ref={todoName} autoFocus></input>
        <h4>Description:</h4>
        <textarea className="todo-input" maxLength = "340" rows = "5" ref={description}></textarea>

        <ReactDatePicker
          selected={deadline}
          onChange={(date) => setDeadline(date)}
          customInput={<CustomDateInput />}
          popperPlacement="right"
          minDate={new Date()}
          isClearable
        />


        <button className="create-todo-btn"
          onClick={() => {
            createTodo();
            setDeadline(null);
            closeCreateTodo();
            
          }}
        >
          {" "}
          CREATE
        </button>
      </div>
    </>,
    document.getElementById("portal")
  );
}
