import React, { useState } from "react";
import NavTab from "./NavTab";
import { useLocation } from "react-router-dom";

export default function NavPanel({ navTabs }) {
  const location = useLocation().pathname;
  const [currentTab, setCurrentTab] = useState(location.slice(1));

  function changeCurrentTab(newTab) {
    setCurrentTab(newTab);
  }

  return (
    <div className="nav-panel">
      <ul>
        {navTabs.map((navTab) => {
          return (
            <NavTab
              key={navTab}
              navTab={navTab}
              changeCurrentTab={changeCurrentTab}
              isActive={navTab == currentTab}
            />
          );
        })}
      </ul>
    </div>
  );
}
