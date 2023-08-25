import React from "react";
import DynamicHeatmap from "./DynamicHeatmap";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DynamicHeatmap />} />
    </Routes>
  );
}

export default App;
