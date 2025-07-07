import React from "react";
import Header from "../ui/Header";
import Footer from "../Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="p-6 max-w-4xl mx-auto mt-6 min-h-[calc(100vh-128px)]">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
