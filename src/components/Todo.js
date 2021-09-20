import { faBell, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { changeDateFormatShort, isDeadlineSoon } from "../utils/dateUtils";
import TodoOverview from "./TodoOverview";

export default function Todo({
  todo,
  date,
  toggleTodo,
  updateTodo,
  setOpenedTodo,
  openedTodo,
  index,
}) {
  console.log("date", date);
  function toggleShowTodo() {
    if (openedTodo !== todo.id) {
      setOpenedTodo(todo.id);
    } else {
      setOpenedTodo(null);
    }
  }

  function handleTodoClick() {
    toggleTodo(todo.id, date);
  }

  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided) => (
        <>
          <div
            className="todo"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
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

                {date && (
                  <input
                    className="todo-checkbox"
                    type="checkbox"
                    checked={todo.complete}
                    onChange={handleTodoClick}
                  ></input>
                )}

                <FontAwesomeIcon
                  icon={faChevronDown}
                  size="sm"
                  onClick={toggleShowTodo}
                />
              </div>
            </div>
          </div>
          {openedTodo === todo.id && (
            <TodoOverview
              todo={todo}
              updateTodo={updateTodo}
              setOpenedTodo={setOpenedTodo}
            ></TodoOverview>
          )}
        </>
      )}
    </Draggable>
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
