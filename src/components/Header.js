import React from 'react'
import SummaryPanel from './SummaryPanel'

export default function Header({todosAmount}) {
    return (
        <div className='header'>
            <div className="logo-container">
            <h1 className= "website-name">ToDoer</h1>   
            </div>

            <SummaryPanel todosAmount={todosAmount}/>
            
        </div>
    )
}
