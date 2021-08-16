import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { changeDateFormatLong } from "../utils/dateUtils";
import React, {useState} from "react";
import CreateTodoModal from "./CreateTodoModal";


export default function TodoOverview({todo, updateTodo}) {

    const[isTodoModalOpen, setIsTodoModalOpen] = useState(false);

    function openCreateTodoModal(e) {
        setIsTodoModalOpen(true);  
    }

    return (
<div className = "todo-overview">
    <div className="todo-overview-header">
    <p><b>#{todo.name}</b></p>
    <FontAwesomeIcon icon={faEdit} onClick={openCreateTodoModal }></FontAwesomeIcon>
    {isTodoModalOpen && <CreateTodoModal closeCreateTodo = {()=> setIsTodoModalOpen(false)} updateTodo ={updateTodo} todo = {todo}/>}
    </div>
    
    <p className= "todo-overview-description">{todo.description}</p>
    {todo.deadline && <p className="todo-overview-deadline"> Deadline: {changeDateFormatLong(todo.deadline)}</p>}


</div>
    )
}