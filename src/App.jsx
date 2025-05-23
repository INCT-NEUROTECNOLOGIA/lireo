import { Routes, Route } from "react-router-dom";
import TextReader from "./features/lireFlow/components/TextReader.tsx";
import Header from "./features/generalUi/components/Header.tsx";
import UserGuide from "./features/userGuide/components/userGuide.tsx";
import "./features/generalUi/layout/pageStyle.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<TextReader />} />
        <Route path="/guia-user" element={<UserGuide />} />
      </Routes>
    </>
  );
}

export default App;
