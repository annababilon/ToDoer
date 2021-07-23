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
  const newTodo = useRef();
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
      {value && <div>Deadline: {value} </div>}
      
    </>
  

  ));


  if (!isOpen) return null;

  function createTodo(e) {
    addTodo(e, newTodo, deadline);
  }

 
  return ReactDom.createPortal(
    <>
      <div className="todo-input-window-overlay "></div>
      <div className="todo-input-window">
        <div className="todo-input-header">
          {/* <i className="far fa-window-close fa-2x fake-button"></i> */}
          <FontAwesomeIcon icon = {faWindowClose} size="3x" className="fake-button" onClick={closeCreateTodo}></FontAwesomeIcon>
          <h2>CREATE TODO</h2>
          {/* <i
            className="far fa-window-close fa-2x close-todo-btn"
            onClick={closeCreateTodo}
          ></i> */}

        <FontAwesomeIcon icon = {faWindowClose} size="3x" className="close-todo-btn" onClick={closeCreateTodo}></FontAwesomeIcon>
        </div>
        <input className="todo-input" type="text" ref={newTodo}></input>

        <ReactDatePicker
          selected={deadline}
          onChange={(date) => setDeadline(date)}
          customInput={<CustomDateInput />}
          popperPlacement="right"
          minDate={new Date()}
          isClearable
        />


        <button
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
