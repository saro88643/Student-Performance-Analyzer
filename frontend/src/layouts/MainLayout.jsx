import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflowX: "hidden" }}>
        <Navbar />
        <main style={{ padding: "32px", flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;