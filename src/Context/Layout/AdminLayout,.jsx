import { Outlet } from "react-router-dom";
import Header from "../../Components/Header";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Header />
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;