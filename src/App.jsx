import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import IndexPage from "./Pages/IndexPage";
import Layout from "./Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
