import React from 'react'
import {Link} from "react-router-dom";

export default function NavTab({navTab, setSelected}) {
    const link = `/${navTab}`;

    function setTab(tab) {
        setSelected(tab);
    }
    return (
        <Link to = {link} style={{ textDecoration: 'none' }}><li onClick ={setTab} key ={navTab}><a href= {link}>{navTab}</a></li> </Link>
        // <li onClick ={setTab} key ={navTab}><a href= {link}>{navTab}</a></li>
    )
}
