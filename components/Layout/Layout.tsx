import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

export type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
