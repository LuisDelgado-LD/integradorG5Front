import { Outlet } from "react-router-dom";
import Header from "../../Components/Header";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <Navbar />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;