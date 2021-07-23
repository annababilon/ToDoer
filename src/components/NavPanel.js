import React, { useState } from 'react'
import NavTab from './NavTab'

export default function NavPanel({navTabs}) {

    const [selected, setSelected] = useState("Home");

    // function changeTab(tab) {
    //     setSelected(tab);
        
    // }
    return (
        <div className='nav-panel'>
            <ul>
            {navTabs.map((navTab) => {
        return <NavTab key = {navTab} navTab={navTab} setSelected={setSelected} />;
      })}
            </ul>
            
        </div>
    )
}
