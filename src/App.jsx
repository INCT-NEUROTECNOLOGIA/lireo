import { Routes, Route } from "react-router-dom";
import TextReader from "./features/lireFlow/components/TextReader.tsx";
import AboutUs from "./features/AboutUs/components/AboutUs.tsx";
import Header from "./features/generalUi/components/Header.tsx";
import "./features/generalUi/layout/pageStyle.css";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<TextReader />} />
        <Route path="/sobre-nos" element={<AboutUs />} />
      </Routes>
    </>
  );
}

export default App;
