import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from "../../../components/Navbar/Navbar";
import Footer from '../../../components/Footer/Footer';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet /> {/* Renders the child routes */}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
