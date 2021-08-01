import React from 'react'
import { useState } from 'react';
import {Link} from "react-router-dom";

export default function NavTab({navTab, changeCurrentTab, isActive}) {
    const link = `/${navTab}`;
    
   function setAsActiveTab(){
       changeCurrentTab(navTab);
   }

    return (
        <Link to = {link} style={{ textDecoration: 'none' }}><li key ={navTab} className={isActive? "nav-tab-active":"nav-tab-inactive"} onClick ={setAsActiveTab}>{navTab}</li> </Link>
   
    )
}
