import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Context/Layout/layout";
import Home from "./Routes/Home.jsx";
import Habitaciones from "./Routes/Habitaciones.jsx";
import Registro from "./Routes/Registro.jsx";
import Galeria2 from "./Routes/Galeria2.jsx";
import Administrador from "./Routes/Administrador.jsx";
import Login from "./Routes/Login.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/habitacion/:id" element={<Habitaciones />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/Galeria/:id" element={<Galeria2 />} />
          <Route path="/administrador" element={<Administrador />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;