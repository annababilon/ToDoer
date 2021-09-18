import React, { useState } from "react";
import Day from "./Day";
import TodoPanel from "./TodoPanel";
import { checkIfTheSameDate } from "../utils/dateUtils";
import { DragDropContext } from "react-beautiful-dnd";


export default function Planner({
  todos,
  addTodo,
  updateTodo,
  toggleTodo,
  cleanCompleteTodos,
  assignPlannedDate
}) {

  const [date, setDate] = useState(new Date());
  const todoPanelDroppableId = "todoPanel";
  const dayDroppableId = "day";
  // is it ok that I have a variable set with a filter?
  const currentTodos = todos.filter(
    function(todo){ 
      if(todo.plannedDate){
        const formatedDate = new Date(todo.plannedDate);
        const result = checkIfTheSameDate(formatedDate,date);
        return checkIfTheSameDate(formatedDate, date);
      }
      return false;
     
    }
  );

  function increaseDate() {
    const newDate = new Date();
    newDate.setDate(date.getDate() + 1);
    setDate(newDate);
  }

  function decreaseDate() {
    const newDate = new Date();
    newDate.setDate(date.getDate() - 1);
    setDate(newDate);
  }

  function onDragEnd(result) {

    const {destination, source, draggableId} = result;
    if(!destination) return;
    if(destination.droppableId === source.droppableId && destination.index === source.index) return;

    if (source.droppableId === todoPanelDroppableId && destination.droppableId === dayDroppableId ){
      assignPlannedDate(result.draggableId, date);
    }
  if (source.droppableId === dayDroppableId && destination.droppableId === todoPanelDroppableId ) {
    assignPlannedDate(result.draggableId, null);
    }

  }

  return (
      <DragDropContext onDragEnd = {onDragEnd}>
        <Day
          date={date}
          currentTodos={currentTodos}
          toggleTodo={toggleTodo}
          increaseDate={increaseDate}
          decreaseDate={decreaseDate}
          droppableId = {dayDroppableId}
        />
        {console.log(currentTodos)}
        <TodoPanel
          todos={todos}
          addTodo={addTodo}
          updateTodo={updateTodo}
          toggleTodo={toggleTodo}
          cleanCompleteTodos={cleanCompleteTodos}
          droppableId = {todoPanelDroppableId}
        />
      </DragDropContext>

  );
}
