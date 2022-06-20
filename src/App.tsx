import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { Home, Search, Tv } from "./Routes";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/search" element={<Search />} />
        <Route path="movies/:id" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
