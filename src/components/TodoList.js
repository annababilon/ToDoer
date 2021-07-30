import React, {useState} from "react";
import Todo from "./Todo";

export default function ToDoList({ todos, toggleTodo, toSearch }) {

  const [openedTodo, setOpenedTodo] = useState();

  return (
    <div className="todo-list">
      {todos.filter(todo => todo.name.includes(toSearch)).map((todo) => {
        return <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} openedTodo={openedTodo} setOpenedTodo ={setOpenedTodo}/>;
      })}
    </div>
  );
}
