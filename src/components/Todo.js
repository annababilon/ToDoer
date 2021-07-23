import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {changeDateFormatShort, isDeadlineSoon} from "../utils/dateUtils";




export default function Todo({todo, toggleTodo}) {

    function handleTodoClick() {
        toggleTodo(todo.id);        
    }
    return (
        <div className='todo'>
            <label>
            <div className='todo-name'>
              {todo.deadline && isDeadlineSoon(todo.deadline, 3) && <FontAwesomeIcon icon = {faBell} size = "1x" className="deadline-icon"/>}
              <p>{todo.name}</p>
            </div>
            <div className='deadline-checkbox-panel'>
              {todo.deadline && <div className='todo-deadline'>{changeDateFormatShort(todo.deadline)}</div>}
              <input className='todo-checkbox' type='checkbox' checked= {todo.complete} onChange ={(handleTodoClick)} ></input>
            </div>
            </label>
           
            
        </div>
    )
}


// export class Todo extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleTodoClick = this.handleTodoClick.bind(this);
//   }

//   handleTodoClick() {
//     this.props.toggleTodo(this.props.todo.id);
//   }

//   render() {
//     const { todo } = this.props;

//     return (
//       <div className="todo">
//         <label>
//           <p>{todo.name}</p>
//           <input className ="todo-checkbox"
//             type="checkbox"
//             checked={todo.complete}
//             onChange={this.handleTodoClick}
//           ></input>
//         </label>

//       </div>
//     );
//   }
// }
