import React, { useState, useEffect } from 'react';
import image1 from '../assets/banner/image1.gif';
import image2 from '../assets/banner/image2.jpg';
import image3 from '../assets/banner/image3.jpg';
import image4 from '../assets/banner/image4.jpg';
import image5 from '../assets/banner/image5.gif';
import image6 from '../assets/banner/image6.jpg';
import image7 from '../assets/banner/image7.jpg';
import image8 from '../assets/banner/image8.jpg';
import image9 from '../assets/banner/image9.jpg';
import image10 from '../assets/banner/image10.jpg';

const slides = [
  { id: 1, image: image1 },
  { id: 2, image: image2 },
  { id: 3, image: image3 },
  { id: 4, image: image4 },
  { id: 5, image: image5 },
  { id: 6, image: image6 },
  { id: 7, image: image7 },
  { id: 8, image: image8 },
  { id: 9, image: image9 },
  { id: 10, image: image10 },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mt-20px w-screen overflow-hidden h-36 xs:h-40 sm:h-56 md:h-72 lg:h-96">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={`Slide ${slide.id}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default Banner;
