import React from 'react'
import LoginPanel from './LoginPanel'
import SummaryPanel from './SummaryPanel'

export default function Header({todosAmount}) {
    return (
        <div className='header'>
            <div className="logo-container">
            <h1 className= "website-name">ToDoer</h1>   
            </div>

           {todosAmount && <SummaryPanel todosAmount={todosAmount}/>}
            <LoginPanel/>
        </div>
    )
}
