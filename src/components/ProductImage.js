import React from "react";
import share from "../assests/svg/share.svg";

const ProductImage = ({ position, image, title, onShare, url }) => {
  return (
    <div className="w-full h-full relative">
      <a href={url} className="w-full overflow-hidden flex justify-center items-center">
        <img
          className={`${
            position % 10 === 2 || position % 10 === 7 ? "h-[300px]" : "h-[180px]"
          }  w-full object-cover`}
          src={image[0].src}
          alt={title}
        />
      </a>
      <div className="absolute bottom-2 right-1" onClick={onShare}>
        <img src={share} alt="Share" />
      </div>
    </div>
  );
};

export default ProductImage;
