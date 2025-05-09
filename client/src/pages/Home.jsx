import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Maincontent from "../components/Maincontetnt";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-1">
        <main className="flex-1 p-4 bg-white">
          <Maincontent />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
