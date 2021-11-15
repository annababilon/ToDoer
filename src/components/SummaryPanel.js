import React from "react";
import { changeDateFormatLong } from "../utils/dateUtils";

export default function SummaryPanel({ todosAmount }) {

  return (
    <div className="summary-panel">
      <p>Hello, Ania!</p>
      <p>
        Today is <b>{changeDateFormatLong(new Date())}</b>
      </p>
      <p className= "task-amount-summary">
        You have <b>{todosAmount}</b> tasks to do{" "}
      </p>
    </div>
  );
}
