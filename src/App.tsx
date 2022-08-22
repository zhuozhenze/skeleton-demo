import React from "react";
import ErrorBoundary from "./components/error-boundary";
import Router from "./router";
import "./App.css";
import "antd/dist/antd.css";

function App() {
  return (
    <ErrorBoundary>
      <Router />
    </ErrorBoundary>
  );
}

export default App;
