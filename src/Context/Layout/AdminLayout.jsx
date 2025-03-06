import { Outlet, Link } from "react-router-dom";
import Header from "../../Components/Header";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer"; 

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Header />
      <Navbar />

      <main className="admin-content">
        <h1>Panel de Administración</h1>
        <nav className="admin-nav">
          <Link to="/administrador">Gestión de Maestro</Link>
          <Link to="/administrador/gestion-de-usuario">Gestión de Usuarios</Link>
        </nav>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default AdminLayout;