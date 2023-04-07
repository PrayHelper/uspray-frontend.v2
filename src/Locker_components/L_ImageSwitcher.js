import React, { useState } from 'react';

const ImageSwitcher = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(images[0]);

  const handleClick = () => {
    const currentIndex = images.indexOf(currentImage);
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentImage(images[nextIndex]);
  };

  return (
    <img src={currentImage} alt="image" onClick={handleClick} />
  );
};

export default ImageSwitcher;