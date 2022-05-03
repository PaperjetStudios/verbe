import Footer from "./Footer/Footer";
import Header from "./Header/Header";

export type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header /> {children} <Footer />
    </>
  );
};

export default Layout;

/*

      <Header />
      {children}
      <Footer />*/
