import Navbar from "shared/components/nav-bar/nav-bar";

const MainLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default MainLayout;
