import React, { useState, useEffect } from 'react';
import image1 from '../assets/banner/1a28fa02ce9f2cd8.jpg';
import image2 from '../assets/banner/41f7d7fb8967dab4.jpg';
import image3 from '../assets/banner/930aee2e44bec5c3.jpg';
import image4 from '../assets/banner/11980ec333f6aa03.jpg';
import image5 from '../assets/banner/aada91fafb5bd3a5.jpg';

const slides = [
  { id: 1, image: image1 },
  { id: 2, image: image2 },
  { id: 3, image: image3 },
  { id: 4, image: image4 },
  { id: 5, image: image5 },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // change every 3 seconds

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div className="relative w-full overflow-hidden h-48 sm:h-56 md:h-72">
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
