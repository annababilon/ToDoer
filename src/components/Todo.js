import {
  faBell,
  faChevronDown,
  faClosedCaptioning,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { changeDateFormatShort, isDeadlineSoon } from "../utils/dateUtils";
import TodoOverview from "./TodoOverview";

export default function Todo({ todo, toggleTodo, setOpenedTodo, openedTodo }) {
  function toggleShowStatus() {
    if (openedTodo !== todo.id) {
      setOpenedTodo(todo.id);
    } else {
      setOpenedTodo(null);
    }
  }

  function handleTodoClick() {
    toggleTodo(todo.id);
  }

  // function showTodo(){
  //    setOpenedTodo(todo.id);
  //   // setShow(true);
  // }

  return (
    <>
      <div className="todo">
        <div className="todo-label">
          <div className="todo-name">
            {todo.deadline && isDeadlineSoon(todo.deadline) && (
              <FontAwesomeIcon
                icon={faBell}
                size="1x"
                className="deadline-icon"
              />
            )}
            <p>{todo.name}</p>
          </div>
          <div className="deadline-checkbox-panel">
            {todo.deadline && (
              <div className="todo-deadline">
                {changeDateFormatShort(todo.deadline)}
              </div>
            )}
            <FontAwesomeIcon
              icon={faChevronDown}
              size="sm"
              onClick={toggleShowStatus}
            />
            <input
              className="todo-checkbox"
              type="checkbox"
              checked={todo.complete}
              onChange={handleTodoClick}
            ></input>
          </div>
        </div>
      </div>
      {openedTodo === todo.id && <TodoOverview todo={todo}></TodoOverview>}
    </>
  );
}

// export class Todo extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleTodoClick = this.handleTodoClick.bind(this);
//   }

//   handleTodoClick() {
//     this.props.toggleTodo(this.props.todo.id);
//   }

//   render() {
//     const { todo } = this.props;

//     return (
//       <div className="todo">
//         <label>
//           <p>{todo.name}</p>
//           <input className ="todo-checkbox"
//             type="checkbox"
//             checked={todo.complete}
//             onChange={this.handleTodoClick}
//           ></input>
//         </label>

//       </div>
//     );
//   }
// }
