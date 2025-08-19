import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Toaster } from "react-hot-toast";

export default function Layout() {
  return (
    <>
      <Header />
      <main style={{ backgroundColor: "#141220" }}>
        <Outlet />
      </main>
      <Footer />
      <Toaster
        position="top-right"
        toastOptions={{
          style: { fontSize: 16 },
        }}
      />
    </>
  );
}
