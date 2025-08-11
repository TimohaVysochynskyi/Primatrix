import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { UIProvider } from "../../context/UIContext";

export default function Layout() {
  return (
    <UIProvider>
      <Header />
      <main style={{ backgroundColor: "#141220" }}>
        <Outlet />
      </main>
      <Footer />
    </UIProvider>
  );
}
