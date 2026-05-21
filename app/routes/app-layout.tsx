import { Outlet } from "react-router";

import Footer from "~/components/layout/footer";
import Header from "~/components/layout/header";
import Spinner from "~/components/layout/spinner";
import Notice from "~/components/ui/notice";

export default function AppLayout() {
  return (
    <>
      <Spinner />
      <Header />
      <Outlet />
      <Footer />
      <Notice />
    </>
  );
}
