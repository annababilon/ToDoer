import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { changeDateFormatLong, countDays } from "../utils/dateUtils";
import ToDoList from "./TodoList";

import { Droppable } from "react-beautiful-dnd";
export default function Day({
  date,
  currentTodos,
  toggleTodo,
  increaseDate,
  decreaseDate,
  droppableId,
  cleanCompleteTodos,
}) {
  function getDaysName(date) {
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    if (countDays(date, today) === 0) return "Today";
    if (countDays(date, today) === 1) return "Tommorow";
    if (countDays(date, today) === -1) return "Yesterday";
    return changeDateFormatLong(date);
  }

  function nextDay() {
    increaseDate();
  }

  function previousDay() {
    decreaseDate();
  }

  function deleteCompleteTodos() {
    date.setHours(0, 0, 0, 0);
    cleanCompleteTodos(date);
  }
  return (
    <div className="day-panel">

        <div className="todo-panel-header">
          <FontAwesomeIcon
            className="day-nav-arrow"
            icon={faChevronLeft}
            size="2x"
            onClick={previousDay}
          ></FontAwesomeIcon>
          <h2> {getDaysName(date)} </h2>
          <FontAwesomeIcon
            className="day-nav-arrow"
            icon={faChevronRight}
            size="2x"
            onClick={nextDay}
          ></FontAwesomeIcon>
        </div>

        {currentTodos.length !== 0 && (
          <button className="clean-complete-btn" onClick={deleteCompleteTodos}>
            Clean Complete
          </button>
        )}
        {currentTodos.length === 0 && (
          <p className="no-task-alert">Nothing planned for today.</p>
        )}
        <ToDoList
          todos={currentTodos}
          date={date}
          toggleTodo={toggleTodo}
          droppableId={droppableId}
        />
    
    </div>
  );
}
