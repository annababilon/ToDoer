import React from "react";
import Todo from "./Todo";

export default function ToDoList({ todos, toggleTodo }) {
  return (
    <div className="todo-list">
      {todos.map((todo) => {
        return <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} />;
      })}
    </div>
  );
}
