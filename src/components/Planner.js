import React, {useState} from "react";
import Day from "./Day";
import TodoPanel from "./TodoPanel";
import {checkIfTheSameDate } from "../utils/dateUtils";



export default function Planner({todos, addTodo, updateTodo, toggleTodo, cleanCompleteTodos}) {


const [date, setDate] = useState(new Date());
const currentTodos = todos.filter(todo => (todo.plannedDate && checkIfTheSameDate(todo.plannedDate, date)));

function increaseDate(){
    const newDate = new Date();
    newDate.setDate(date.getDate() + 1);
    setDate(newDate);

}

function decreaseDate(){
    const newDate = new Date();
    newDate.setDate(date.getDate() - 1);
    setDate(newDate);

}
    return (
        <>
      
        <Day date = {date} currentTodos = {currentTodos} toggleTodo = {toggleTodo} increaseDate = {increaseDate} decreaseDate = {decreaseDate}/>
        
        <TodoPanel
        todos={todos}
        addTodo={addTodo}
        updateTodo = {updateTodo}
        toggleTodo={toggleTodo}
        cleanCompleteTodos={cleanCompleteTodos}
        />
      </>
  
    )
}