import React from "react";
import {changeDateFormatLong} from "../utils/dateUtils";

export default function LoginPanel() {
  return (
    <div className="login-container">
      <button className="logout-btn" type="submit">
        LOG OUT
      </button>
      <p>Hello, Ania!</p>
      <p>
        Today is <b>{changeDateFormatLong(new Date())}</b>
      </p>
    </div>
  );
}
