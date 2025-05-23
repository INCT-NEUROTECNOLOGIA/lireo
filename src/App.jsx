import { Routes, Route } from "react-router-dom";
import TextReader from "./features/lireFlow/components/TextReader.tsx";
import Header from "./features/generalUi/components/Header.tsx";
import AboutUs from "./features/AboutUs/components/AboutUs.tsx";
import Instructions from "./features/lireFlow/components/Instructions.tsx";
import "./features/generalUi/layout/pageStyle.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<TextReader />} />
        <Route path="/sobre-nos" element={<AboutUs />} />
        <Route path="/instrucoes" element={<Instructions />} /> 
      </Routes>
    </>
  );
}

export default App;
