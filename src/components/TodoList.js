import React, {useState} from "react";
import Todo from "./Todo";
import {Droppable} from 'react-beautiful-dnd';

export default function ToDoList({ todos, toggleTodo, updateTodo,  toSearch, droppableId}) {

  const [openedTodo, setOpenedTodo] = useState();

  return (


    // <div className="todo-list">
    //   {todos.filter(todo => todo.name.includes(toSearch)).map((todo, index) => {
    //     return <Todo key={todo.id} todo={todo}  updateTodo = {updateTodo} toggleTodo={toggleTodo} openedTodo={openedTodo} setOpenedTodo ={setOpenedTodo}/>;
    //   })}
    // </div>

<Droppable droppableId = {droppableId}>

{ (provided) =>
(
  <div className="todo-list"
  ref = {provided.innerRef}
  {...provided.droppableProps}
 >
  {todos.length >0 && todos
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
    {provided.placeholder}
</div>
)

}

</Droppable> 
    
  );
}