import React from 'react'

export default function SummaryPanel({todosAmount}) {
    
    return (
            <div className="task-amount-summary" >
            <p> <i>You have <b>{todosAmount}</b> tasks to do</i> </p>
            </div>
        
    )
}
