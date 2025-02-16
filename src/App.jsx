import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Context/Layout/layout";
import Home from "./Routes/Home.jsx";
import Registro from "./Routes/Registro.jsx";
import Detail from "./Routes/Detail.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
