import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Reserva from "../Pages/Reserva";
import Clientes from "../Pages/Clientes";
import Navbar from "../Components/Navbar";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Reserva" element={<Reserva />} />
        <Route path="/clientes" element={<Clientes />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;