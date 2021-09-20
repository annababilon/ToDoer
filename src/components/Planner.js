import React, { useState } from "react";
import Day from "./Day";
import TodoPanel from "./TodoPanel";
import { checkIfTheSameDate } from "../utils/dateUtils";
import { DragDropContext } from "react-beautiful-dnd";

export default function Planner({
  unplannedTodos,
  dayPlan,
  addTodo,
  updateTodo,
  assignToDay,
  assignToBacklog,
  toggleTodo,
  cleanCompleteTodos,
  reorderPlannedTodos, 
  reorderUnplannedTodos
}) {
  const [date, setDate] = useState(() => {
    const newDate = new Date();
    newDate.setHours(0,0,0,0);
    return newDate;
  });
  const todoPanelDroppableId = "todoPanel";
  const dayDroppableId = "day";

  const dateKey = date.toString();
  const currentTodos = dayPlan.has(dateKey) ? dayPlan.get(dateKey) : [];

  function increaseDate() {
    const newDate = new Date();
    newDate.setDate(date.getDate() + 1);
    newDate.setHours(0,0,0,0);
    setDate(newDate);
  }

  function decreaseDate() {
    const newDate = new Date();
    newDate.setDate(date.getDate() - 1);
    newDate.setHours(0,0,0,0);
    setDate(newDate);
  }

  function onDragEnd(result) {
    console.log(result);
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (source.droppableId === todoPanelDroppableId && destination.droppableId === dayDroppableId) {
        assignToDay(result.draggableId, date, destination.index);
    } else if (
      source.droppableId === dayDroppableId &&
      destination.droppableId === todoPanelDroppableId
    ) {
      //TODO
      // if todo completed toggle it before sending back to Backlog
      assignToBacklog(result.draggableId, date, destination.index);
    } else if (destination.droppableId === todoPanelDroppableId){
      reorderUnplannedTodos(source.index, destination.index);
    } else {
      reorderPlannedTodos(date, source.index, destination.index);
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Day
        date={date}
        currentTodos={currentTodos}
        toggleTodo={toggleTodo}
        increaseDate={increaseDate}
        decreaseDate={decreaseDate}
        droppableId={dayDroppableId}
        cleanCompleteTodos={cleanCompleteTodos}
      />
      {console.log(currentTodos)}
      <TodoPanel
        todos={unplannedTodos}
        addTodo={addTodo}
        updateTodo={updateTodo}
        droppableId={todoPanelDroppableId}
      />
    </DragDropContext>
  );
}
