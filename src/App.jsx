import { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
// import Card from './Components/Card'
import Face from "./Components/Face";
import Find from "./Components/Find";
import Weather from "./Components/Weather";
import News from "./Components/News";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Face />
      <Find />
      <Weather />
      <News country="in" category="general" />
    </>
  );
}

export default App;
