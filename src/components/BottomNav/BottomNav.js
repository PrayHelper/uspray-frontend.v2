import { useState } from "react";
import { Link } from "react-router-dom";
import { BottomNavStyle } from "./style";


const BottomNav = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const handleClick = (index) => {
    setCurrentImage(index);
  };

  const images = [
    {
      id: 0,
      src: '../public/images/ic_home.svg',
      alt: 'home_icon',
    },
    {
      id: 1,
      src: '../public/images/ic_home_filled.svg',
      alt: 'filled_home_icon',
      add: 'locker'
    },
    {
      id: 2,
      src: '../public/images/ic_locker.svg',
      alt: 'locker_icon',
    },
  ];

  return (
    <BottomNavStyle>
      <div>
        <div>
          {images.map((image, index) => (
            <img
              key={image.id}
              src={image.src}
              alt={image.alt}
              className={currentImage === index ? index+1 : ''}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
        <Link to={`/${currentImage}`}></Link>
      </div>
    </BottomNavStyle>
  );
};

export default BottomNav;