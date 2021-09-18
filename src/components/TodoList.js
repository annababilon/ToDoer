import React, {useState} from "react";
import Todo from "./Todo";
import {Droppable} from 'react-beautiful-dnd';

export default function ToDoList({ todos, toggleTodo, updateTodo,  toSearch}) {

  const [openedTodo, setOpenedTodo] = useState();

  return (
  <div className="todo-list">
  {todos
    .filter((todo) => toSearch? todo.name.includes(toSearch):true)
    .map((todo, index) => {
      return (
        <Todo
          key={todo.id}
          todo={todo}
          updateTodo={updateTodo}
          toggleTodo={toggleTodo}
          openedTodo={openedTodo}
          setOpenedTodo={setOpenedTodo}
          index={index}
        />
      );
    })}
</div>
    
  );
}