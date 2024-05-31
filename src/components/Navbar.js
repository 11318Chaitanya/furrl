import React from "react";
import bag from "../assests/svg/bag.svg";
import bookmark from "../assests/svg/bookmark.svg";

const Navbar = () => {
  return (
    <nav className="bg-white p-3">
      <div className="container mx-auto relative flex items-center justify-end">
        <div className="absolute left-1/2 transform -translate-x-1/2 text-black font-semibold text-xl">
          #Vibe Page
        </div>
        <div className="flex space-x-1">
          <a
            className="active:bg-gray-200 active:rounded-full p-1"
            href="https://furrl.in/wishlist"
          >
            <img src={bookmark} alt="Wishlist" />
          </a>
          <a
            className="active:bg-gray-200 active:rounded-full p-1"
            href="https://furrl.in/cart"
          >
            <img src={bag} alt="Cart" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
