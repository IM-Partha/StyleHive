import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LeftSidebar from '../components/LeftSidebar';
import CategorySidebar from '../components/CategorySidebar';
import Maincontent from '../components/Maincontetnt';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-1">
        <aside className="w-64 bg-gray-100">
          <CategorySidebar />
        </aside>

        <main className="flex-1 p-4 bg-white">
          <Maincontent /> {/* ✅ Use your Maincontent component here */}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
