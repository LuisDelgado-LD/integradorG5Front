import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Context/Layout/layout.jsx";
import AdminLayout from "./Context/Layout/AdminLayout.jsx";
import Home from "./Routes/Home.jsx";
import Habitaciones from "./Routes/Habitaciones.jsx";
import Registro from "./Routes/Registro.jsx";
import Galeria2 from "./Routes/Galeria2.jsx";
import Administrador from "./Routes/Administrador.jsx";
import GestionCaracteristicas from "./Routes/GestionCaracteristicas.jsx";
import UserManagement from "./Routes/UserManagement.jsx";
import Login from "./Routes/Login.jsx";
import PrivateRoute from "./Routes/PrivateRoute"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="habitacion/:id" element={<Habitaciones />} />
          <Route path="registro" element={<Registro />} />
          <Route path="galeria/:id" element={<Galeria2 />} />
          <Route path="login" element={<Login />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/administrador" element={<AdminLayout />}>
            <Route index element={<Administrador />} />
            <Route path="/administrador/gestion-caracteristicas" element={<GestionCaracteristicas />} />
            <Route path="gestion-de-usuario" element={<UserManagement />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
