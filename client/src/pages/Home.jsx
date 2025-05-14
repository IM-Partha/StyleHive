import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Maincontent from "../components/Maincontetnt";
import Banner from "../components/Banner";
import Products from "../components/Products";


const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Banner/>
      <Products/>
      <div className="flex flex-1">
        <main className="flex-1 p-4 bg-white">
          {/* <Maincontent /> */}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
