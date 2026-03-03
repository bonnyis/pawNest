import { Outlet } from "react-router-dom";
import Header from "@/shared/ui/headers/Header";
import Footer from "@/shared/ui/footer/Footer";
// home Layout
const HomeLayout = () => {
  return (
    <article className={" min-h-screen relative"}>
      <section className="main">
        <Header />
        <Outlet />
        <Footer />
      </section>
    </article>
  );
};

export default HomeLayout;
