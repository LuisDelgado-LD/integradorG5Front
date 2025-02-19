import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Context/Layout/layout";
import Home from "./Routes/Home.jsx";
import Registro from "./Routes/Registro.jsx";
import Detail from "./Routes/Detail.jsx";
import PalacioPeludo from "./Routes/PalacioPeludo.jsx";
import RefugioConfortable from "./Routes/RefugioConfortable.jsx";
import CuevaAcogedora from "./Routes/CuevaAcogedora.jsx";
import Galeria2 from "./Routes/Galeria2.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/PalacioPeludo" element={<PalacioPeludo />} />
          <Route path="/RefugioConfortable" element={<RefugioConfortable />} />
          <Route path="/CuevaAcogedora" element={<CuevaAcogedora />} />
          <Route path="/Galeria2" element={<Galeria2 />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;