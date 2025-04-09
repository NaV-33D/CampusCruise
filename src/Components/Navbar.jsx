import React, { useState } from "react";
// import { assets } from '../assets/assets'
import logo from "../assets/logo.png";
import ham from "../assets/menu_icon.svg";
import cross from "../assets/cross_icon.svg";

const Navbar = () => {
  const [show, setshow] = useState(false);

  // useEffect(() => {
  //     if (show) {
  //         document.body.style.overflow = 'hidden'
  //     }
  // }, [show])

  return (
    // <div className='absolute top-0 left-0 w-full h-20 z-10 bg-[#010919]'>010714
    <div className="absolute top-0 left-0 w-full h-18 z-10 bg-[#010714]">
      <div
        className="container mx-auto flex justify-between 
            items-centre py-4 px-6 md:px-5 lg:px-12"
      >
        <img src={logo} className="h-10" />
        <ul className="hidden md:flex gap-10 text-white items-center font-medium text-lg">
          <a href="#Header" className="cursor-pointer hover:text-gray-400">
            Home
          </a>
          <a href="#FindBus" className="cursor-pointer hover:text-gray-400">
            Find
          </a>
          <a href="#Weather" className="cursor-pointer hover:text-gray-400">
            Weather
          </a>
          <a href="#News" className="cursor-pointer hover:text-gray-400">
            News
          </a>
          <a href="#SOS" className="cursor-pointer hover:text-gray-400">
            SOS
          </a>
        </ul>
        <button
          className="hidden md:block bg-white px-9 py-2
                rounded-full"
        >
          SignUp
        </button>
        <img
          onClick={() => setshow(true)}
          src={ham}
          className="md:hidden w-7 cursor-pointer"
        />
      </div>

      <div
        className={`md:hidden ${
          show ? "fixed w-full" : "h-0 w-0"
        } overflow-hidden h-auto pb-10 bg-gray-800 text-white transition-all`}
      >
        <div className="flex justify-end p-3 max-h-13 cursor-pointer">
          <img onClick={() => setshow(false)} src={cross} />
        </div>
        <ul className="flex flex-col items-center gap-2 mt-3 px-3 text-lg font-medium">
          <a
            onClick={() => setshow(false)}
            href="#Header"
            className="px-4 py-2 rounded-full inline-block"
          >
            Home
          </a>
          <a
            onClick={() => setshow(false)}
            href="#FindBus"
            className="px-4 py-2 rounded-full inline-block"
          >
            FindBus
          </a>

          <a
            onClick={() => setshow(false)}
            href="#News"
            className="px-4 py-2 rounded-full inline-block"
          >
            News
          </a>
          <a
            onClick={() => setshow(false)}
            href="#Weather"
            className="px-4 py-2 rounded-full inline-block"
          >
            Weather
          </a>
          <a
            onClick={() => setshow(false)}
            href="#SOS"
            className="px-4 py-2 rounded-full inline-block"
          >
            SOS
          </a>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
