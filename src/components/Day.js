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
}) {
  date.setHours(0, 0, 0, 0);

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

  return (
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <div
          className="day-panel"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <FontAwesomeIcon
            className="day-nav-arrow"
            icon={faChevronLeft}
            onClick={previousDay}
          ></FontAwesomeIcon>
          <div className="day">
            <h2> {getDaysName(date)} </h2>
            {currentTodos.length === 0 && (
              <p className="no-task-alert">Nothing planned for today.</p>
            )}
            <ToDoList todos={currentTodos} toggleTodo={toggleTodo} />
          </div>
          <FontAwesomeIcon
            className="day-nav-arrow"
            icon={faChevronRight}
            onClick={nextDay}
          ></FontAwesomeIcon>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
