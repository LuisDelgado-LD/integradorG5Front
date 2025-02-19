import { Outlet } from "react-router-dom";
import Header from "../../Components/Header";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import useScrollVisibility from "../../Hooks/useScrollVisibility";

const Layout = () => {
  const scrollPosition = useScrollVisibility();

  return (
    <div className="layout">
      <Header />
      <Navbar />
      <main className="content" style={{ marginTop: scrollPosition > 150 ? "180px" : "220px" }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;