import { Routes, Route } from "react-router-dom";
import TextReader from "./features/lireFlow/components/TextReader.tsx";
import Header from "./features/generalUi/components/Header.tsx";
import Footer from "./features/generalUi/components/Footer.tsx";
import InitialPage from "./features/initialPage/components/InitialPage.jsx";
import UserGuideLireFlow from "./features/lireFlow/userGuide/components/UserGuide.tsx";
import UserGuideLireGrow from "./features/lireGrow/userGuide/components/UserGuide.tsx";
import AboutUs from "./features/AboutUs/components/AboutUs.tsx";
import LireGrow from "./features/lireGrow/components/LireGrow.tsx";
import "./features/generalUi/layout/pageStyle.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<InitialPage />} />
        <Route path="/lireFlow" element={<TextReader />} />
        <Route path="/lireGrow" element={<LireGrow />} />
        <Route
          path="/lireFlow/guia-do-usuario"
          element={<UserGuideLireFlow />}
        />
        <Route
          path="/lireGrow/guia-do-usuario"
          element={<UserGuideLireGrow />}
        />
        <Route path="/sobre-nos" element={<AboutUs />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
