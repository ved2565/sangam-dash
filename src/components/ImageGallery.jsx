import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowCircleLeft, ArrowCircleRight, PauseCircle, PlayCircle } from "@phosphor-icons/react";

const images = [
  "https://d33wubrfki0l68.cloudfront.net/dd23708ebc4053551bb33e18b7174e73b6e1710b/dea24/static/images/wallpapers/shared-colors@2x.png",
  "https://d33wubrfki0l68.cloudfront.net/49de349d12db851952c5556f3c637ca772745316/cfc56/static/images/wallpapers/bridge-02@2x.png",
  "https://d33wubrfki0l68.cloudfront.net/594de66469079c21fc54c14db0591305a1198dd6/3f4b1/static/images/wallpapers/bridge-01@2x.png",
];

const Slide = ({ image }) => (
  <motion.img
    src={image}
    alt="Slide"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    style={{
      width: "100vw", // Adjust width as needed
      height: "450px", // Adjust height as needed
      objectFit: "cover", // Use 'cover' to fit as an object weight="duotone"
    }}
  />
);

const ImageCarousel = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImage((prevImage) =>
      prevImage === 0 ? images.length - 1 : prevImage - 1
    );
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  useEffect(() => {
    let interval;
    if (!isPaused) {
      interval = setInterval(() => {
        handleNext();
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [currentImage, isPaused]);

  return (
    <div className="flex flex-col">
      <Slide image={images[currentImage]} />
      <div className="flex items-center justify-around my-2">
        <button onClick={handlePrev}>
          <ArrowCircleLeft width={28} height={28}  weight="duotone"/>
        </button>
        <button onClick={handlePause}>
          {isPaused ? (
            <PlayCircle width={28} height={28}  weight="duotone"/>
          ) : (
            <PauseCircle width={28} height={28}  weight="duotone"/>
          )}
        </button>
        <button onClick={handleNext}>
          <ArrowCircleRight width={28} height={28}  weight="duotone"/>
        </button>
      </div>
    </div>
  );
};

export default ImageCarousel;