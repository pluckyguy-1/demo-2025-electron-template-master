import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import CreateMember from "./CreateMember";
import UpdateMember from "./UpdateMember";

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create" element={<CreateMember />} />
        <Route path="/update" element={<UpdateMember />} />
      </Routes>
    </Router>
  );
}

ReactDOM.render(<Main />, document.getElementById("root"));