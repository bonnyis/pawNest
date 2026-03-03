import { Outlet } from "react-router-dom";
import Header from "@/shared/ui/headers/Header";
import Footer from "@/shared/ui/footer/Footer";
import SubHeader from "@/shared/ui/headers/SubHeader";
// defualt Layout
const DefaultLayout = () => {
  return (
    <article className={"min-h-screen relative"}>
      <section className="mx-auto w-full">
        <Header />
        {/* 서브 헤더 */}
        <SubHeader />
        <Outlet />
        <Footer />
      </section>
    </article>
  );
};

export default DefaultLayout;
