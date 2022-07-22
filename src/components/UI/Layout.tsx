const Layout: React.FC<{
  children: any;
}> = ({ children }) => {
  return (
    <main key="main" className="main-content">
      {children}
    </main>
  );
};

export default Layout;
