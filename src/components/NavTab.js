import React from 'react'

export default function NavTab({navTab, setSelected}) {
    const link = `#${navTab.name}`;

    function setTab(tab) {
        setSelected(tab);
    }
    return (
        <li onClick ={setTab} key ={navTab}><a href= {`#${navTab}`}>{navTab}</a></li>
    )
}
