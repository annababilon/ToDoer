import React from "react";
import Todo from "./Todo";

export default function ToDoList({ todos, toggleTodo, toSearch }) {
  return (
    <div className="todo-list">
      {todos.filter(todo => todo.name.includes(toSearch)).map((todo) => {
        return <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} />;
      })}
    </div>
  );
}
