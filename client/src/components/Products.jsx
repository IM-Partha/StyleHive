import React from "react";

/// Add_one///
import image1 from "../assets/Add_one/imgi_55_D-AM-MHP-1.0-S11-TOPBRANDS-h&m-upto50-03042025.jpg";
import image2 from "../assets/Add_one/imgi_56_D-AM-MHP-1.0-TOPBRANDS-uspa-min40-03042025.jpg";
import image3 from "../assets/Add_one/imgi_57_D-AM-MHP-1.0-TOPBRANDS-puma-min40-03042025.jpg";
import image4 from "../assets/Add_one/imgi_58_D-AM-MHP-1.0-TOPBRANDS-adidas-min30-03042025.jpg";
import image5 from "../assets/Add_one/imgi_59_D-AM-MHP-1.0-TOPBRANDS-thebearhouse-5080-03042025.jpg";
import image6 from "../assets/Add_one/imgi_60_D-AM-MHP-1.0-TOPBRANDS-louisphilippe-min30-03042025.jpg";
/// Add_two///
import image7 from "../assets/Add_foure/imgi_106_D-AM-WHP-1.0-S19-TRENDSCAROUSEL-P1-AVAASA-DNMX-MIN50-080425.jpg";
import image8 from "../assets/Add_foure/imgi_107_D-AM-WHP-1.0-S19-TRENDSCAROUSEL-P3-AZORTE-ALTHEORY-OUTRYT-MIN50-080425.jpg";
import image9 from "../assets/Add_foure/imgi_109_D-AM-WHP-1.0-S19-TRENDSCAROUSEL-P5-YOUSTA-STARTING299-080425.jpg";
import image10 from "../assets/Add_foure/imgi_111_D-AM-WHP-1.0-S19-TRENDSCAROUSEL-P7-DNMX-TEAMSPIRIT-STARTING199-080425.jpg";
import image11 from "../assets/Add_foure/imgi_227_D-AM-WHP-1.0-S19-TRENDSCAROUSEL-P4-AVAASA-FUSION-STARTING199-080425.jpg";
// Add_three///
import image12 from "../assets/Add_three/imgi_54_D-AM-WHP-1.0-S13-AJIOEXCLUSIVE-P1-GAP-SUPERDRY-MIN40-080425.jpg";
import image13 from "../assets/Add_three/imgi_55_D-AM-WHP-1.0-S13-AJIOEXCLUSIVE-P2-AZORTE-OUTRYT-SVRNAA-MIN50-080425.jpg";
import image14 from "../assets/Add_three/imgi_56_D-AM-WHP-1.0-S13-AJIOEXCLUSIVE-P3-SHEIN-UNDER999-080425.jpg";
import image15 from "../assets/Add_three/imgi_57_D-AM-WHP-1.0-S13-AJIOEXCLUSIVE-P3-SAM-FRYEROSE-MIN50-080425.jpg";
import image16 from "../assets/Add_three/imgi_59_D-AM-WHP-1.0-S13-AJIOEXCLUSIVE-P5-ASOS-MIN30-080425.jpg";

const Products = () => {
  const Add_one = [
    { id: 1, image: image1, link: "/allproducts" },
    { id: 2, image: image2, link: "/allproducts" },
    { id: 3, image: image3, link: "/allproducts" },
    { id: 4, image: image4, link: "/allproducts" },
    { id: 5, image: image5, link: "/allproducts" },
    { id: 6, image: image6, link: "/allproducts" },
  ];
  const Add_two = [
    { id: 1, image: image7, link: "/allproducts" },
    { id: 2, image: image8, link: "/allproducts" },
    { id: 3, image: image9, link: "/allproducts" },
    { id: 4, image: image10, link: "/allproducts" },
    { id: 5, image: image11, link: "/allproducts" },
  ];

  const Add_three = [
    { id: 1, image: image12, link: "/allproducts" },
    { id: 2, image: image13, link: "/allproducts" },
    { id: 3, image: image14, link: "/allproducts" },
    { id: 4, image: image15, link: "/allproducts" },
    { id: 5, image: image16, link: "/allproducts" },
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };
  const duplicatedImages = [...Add_one, ...Add_one];
  const duplicatedImagestwo = [...Add_two, ...Add_two];
  const duplicatedImagesthree = [...Add_three, ...Add_three];
  return (
    <div>
      <div className="p-4 sm:p-6 md:p-10 overflow-hidden">
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Sunshine Brands
        </h1>

        {/* First Slider (Left to Right) */}
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-scroll-left whitespace-nowrap">
            {duplicatedImages.map((item, index) => (
              <a key={index} href={item.link} className="flex-shrink-0 mx-4">
                <img
                  src={item.image}
                  alt={`Brand ${index + 1}`}
                  className="w-64 h-auto rounded-lg hover:scale-105 transition-transform duration-300"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 md:p-10 overflow-hidden">
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Absolute Summer Staples
        </h1>

        {/* Second Slider (Right to Left) */}
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-scroll-right whitespace-nowrap">
            {duplicatedImagestwo.map((item, index) => (
              <a key={index} href={item.link} className="flex-shrink-0 mx-4">
                <img
                  src={item.image}
                  alt={`Brand ${index + 1}`}
                  className="w-64 h-auto rounded-lg hover:scale-105 transition-transform duration-300"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 md:p-10 overflow-hidden">
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Gear Up For New Brands
        </h1>

        {/* Third Slider (Right to Left) */}
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-scroll-left whitespace-nowrap">
            {duplicatedImagesthree.map((item, index) => (
              <a key={index} href={item.link} className="flex-shrink-0 mx-4">
                <img
                  src={item.image}
                  alt={`Brand ${index + 1}`}
                  className="w-64 h-auto rounded-lg hover:scale-105 transition-transform duration-300"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
