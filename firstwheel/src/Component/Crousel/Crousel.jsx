import React, { useEffect, useState } from 'react';

const images = [
  'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/8a2d69109e6ce150.jpg?q=20',
  'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/0ec99b461d4e3de8.jpg?q=20',
  'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/0ec99b461d4e3de8.jpg?q=20',
  'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/0ec99b461d4e3de8.jpg?q=20',
  'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/0ec99b461d4e3de8.jpg?q=20',


];

const Crousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 3000); // 3 seconds

    return () => clearInterval(interval); // Cleanup
  }, []);

  // Optional manual controls
  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % images.length);
  };

  return (
    <div className="relarive w-full overflow-hidden">
      {/* Slides container */}
      <div className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Slide ${index}`} className="min-w-full object-cover" />
        ))}
      </div>

      {/* Optional: Manual Controls */}
      {/* <button onClick={prevSlide} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 px-2 py-1 rounded">
        ‹
      </button>
      <button onClick={nextSlide} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 px-2 py-1 rounded">
        ›
      </button> */}
    </div>
  );
};

export default Crousel;
