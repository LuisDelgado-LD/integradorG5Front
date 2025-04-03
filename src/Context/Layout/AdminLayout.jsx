import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../utils/globalContext";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import SoloEscritorio from "../../Components/SoloEscritorio";

const AdminLayout = () => {
  const { state } = useContext(GlobalContext);

  return (
    <SoloEscritorio>
      <div className="admin-layout">
        <Header />
        <main className="admin-content">
          <Outlet />
        </main>
        <Footer />
      </div>
    </SoloEscritorio>
  );
};

export default AdminLayout;