import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "./Context/Layout/layout.jsx";
import AdminLayout from "./Context/Layout/AdminLayout.jsx";
import Home from "./Routes/Home.jsx";
import Habitaciones from "./Routes/Habitaciones.jsx";
import Registro from "./Routes/Registro.jsx";
import Galeria2 from "./Routes/Galeria2.jsx";
import Administrador from "./Routes/Administrador.jsx";
import GestionMaestro from './Routes/GestionMaestro'
import GestionCaracteristicas from "./Routes/GestionCaracteristicas.jsx";
import UserManagement from "./Routes/UserManagement.jsx";
import Login from "./Routes/Login.jsx";
import PrivateRoute from "./Routes/PrivateRoute"; 

function App() {
  const [usuario, setUsuario] = useState(null);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("usuario")) || null;
    setUsuario(storedUser);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={!usuario ? <Layout /> : <Navigate to={usuario.rol === "admin" ? "/administrador" : "/home"} />} >
          <Route index element={<Home />} />
          <Route path="habitacion/:id" element={<Habitaciones />} />
          <Route path="galeria/:id" element={<Galeria2 />} />
          <Route path="registro" element={<Registro />} />
          <Route path="login" element={!usuario ? <Login setUsuario={setUsuario} /> : <Navigate to={usuario.rol === "admin" ? "/administrador" : "/home"} />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/administrador" element={<AdminLayout />}>
            <Route index element={<Administrador />} />
            <Route path="gestion-caracteristicas" element={<GestionCaracteristicas />} />
            <Route path="gestion-maestro" element={<GestionMaestro />} />
            <Route path="gestion-de-usuario" element={<UserManagement />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;