import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import GameScreen from "./pages/gameScreen";
import LeaderBoard from "./pages/leaderBoard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<GameScreen />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
