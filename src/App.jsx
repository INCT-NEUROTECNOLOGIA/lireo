import { Routes, Route } from 'react-router-dom';
import TextReader from './features/lireFlow/components/TextReader.tsx';
import Header from './features/generalUi/components/Header.tsx';
import Footer from './features/generalUi/components/Footer.tsx';
import InitialPage from './features/initialPage/components/InitialPage.jsx';
import UserGuide from './utils/components/UserGuide.tsx';
import { userGuideTextLireFlow } from './features/lireFlow/userGuide/text/TextUserGuide.ts';
import { userGuideTextLireGrow } from './features/lireGrow/userGuide/text/TextUserGuide.ts';
import { userGuideTextLireMorph } from './features/lireMorph/userGuide/text/TextUserGuide.ts';
import AboutUs from './features/AboutUs/components/AboutUs.tsx';
import LireGrow from './features/lireGrow/components/LireGrow.tsx';
import LireMorph from './features/lireMorph/components/LireMorph.tsx';
import LireFix from './features/lireFix/LireFix.tsx';
import './features/generalUi/layout/pageStyle.css';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<InitialPage />} />
        <Route path="/lireFlow" element={<TextReader />} />
        <Route path="/lireGrow" element={<LireGrow />} />
        <Route path="/lireMorph" element={<LireMorph />} />
        <Route path="/lireFix" element={<LireFix />} />
        <Route
          path="/lireFlow/guia-do-usuario"
          element={<UserGuide userGuideText={userGuideTextLireFlow} />}
        />
        <Route
          path="/lireGrow/guia-do-usuario"
          element={<UserGuide userGuideText={userGuideTextLireGrow} />}
        />
        <Route
          path="/lireMorph/guia-do-usuario"
          element={<UserGuide userGuideText={userGuideTextLireMorph} />}
        />
        <Route path="/sobre-nos" element={<AboutUs />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
