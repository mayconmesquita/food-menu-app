import React from "react";
import Navigation from "./src/screens/navigation";
import { StatusBar } from "expo-status-bar";

const App = () => {
  return (
    <>
      <StatusBar style="auto" />
      <Navigation />
    </>
  );
};

export default App;
