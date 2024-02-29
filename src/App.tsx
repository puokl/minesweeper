import "./App.css";
import { Route, Routes } from "react-router-dom";
import Missing from "./components/Missing";
import LandingPage from "./components/LandingPage";
import MinesweeperApp from "./components/MinesweeperApp";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<LandingPage />} />
        <Route path="easy" element={<MinesweeperApp difficulty="easy" />} />
        <Route path="medium" element={<MinesweeperApp difficulty="medium" />} />
        <Route path="hard" element={<MinesweeperApp difficulty="hard" />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
