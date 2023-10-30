import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const images = [
  'https://d33wubrfki0l68.cloudfront.net/dd23708ebc4053551bb33e18b7174e73b6e1710b/dea24/static/images/wallpapers/shared-colors@2x.png',
  'https://d33wubrfki0l68.cloudfront.net/49de349d12db851952c5556f3c637ca772745316/cfc56/static/images/wallpapers/bridge-02@2x.png',
  'https://d33wubrfki0l68.cloudfront.net/594de66469079c21fc54c14db0591305a1198dd6/3f4b1/static/images/wallpapers/bridge-01@2x.png',
];

const Slide = ({ image }) => (
  <motion.img
    src={image}
    alt="Slide"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    style={{
      width: '100vw', // Adjust width as needed
      height: '500px', // Adjust height as needed
      objectFit: 'cover', // Use 'cover' to fit as an object
    }}
  />
);

const ImageCarousel = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const handleNext = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImage((prevImage) =>
      prevImage === 0 ? images.length - 1 : prevImage - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div className='flex flex-row'>
      <button onClick={handlePrev}></button>
      <Slide image={images[currentImage]} />
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default ImageCarousel;
