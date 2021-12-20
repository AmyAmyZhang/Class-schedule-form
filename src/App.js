import React from "react";
import SelectClassForm from "./components/SelectClassForm";
import "./styles.scss";
import { formData } from "./db";

export default function App() {
  return (
    <div className="App">
      <h1> Please fill in the class selection form </h1>
      <SelectClassForm formData={formData} />
    </div>
  );
}
