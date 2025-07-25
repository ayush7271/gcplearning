import React from 'react'
import { Route, Routes, useNavigate } from "react-router-dom";

 const Header = () => {
  const navigate=useNavigate()
  return (
    <div className="w-full h-[75px] bg-[#ffffff] fixed z-50">
      <div className="header w-full h-[65px] flex">
        <div className="cursor-pointer" onClick={()=>{navigate('/')}}>
          {" "}
          <img
            className="w-[130px] h-[38px] ml-[50px] mt-[15px]"
            src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_plus-535108.svg"
            alt=""
          />
        </div>
        <div className="w-[45%] h-[36px] border bg-[#ffffff] mt-[15px] ml-[50px] flex  rounded-sm ">
          <div className="ml-[15px] mt-[5px]">
            <svg
              width="24"
              height="24"
              class=""
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Search Icon</title>
              <path
                d="M10.5 18C14.6421 18 18 14.6421 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18Z"
                stroke="#717478"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M16 16L21 21"
                stroke="#717478"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>
          <input
            className="w-[89%] h-full border-collaps placeholder-gray-500 ml-[10px] focus:outline-none"
            placeholder="Search for Products, Brands and More"
            type="text"
          />
        </div>
        <div className="w-[40%] h-[42px] ml-[100px] mt-[8px] flex justify-between">
          <div className="w-[193px] h-[24px] flex mt-[14px] ml-[12px]">
            <div className="icon">
              <img
                src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/Store-9eeae2.svg"
                alt=""
              />
            </div>
            <div className="ml-[10px]">Become a Seller</div>
          </div>
          <div className="w-[94px] h-[24px] flex mt-[14px] ml-[10px]">
            <div className="sign_in">
              <img
                src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-815786.svg"
                alt=""
              />
            </div>
            <div className="ml-[10px] text-[#000] text-[16px]">Sign in</div>
          </div>
          <div className="w-[104px] h-[24px] flex mt-[14px] ml-[10px]">
            <div className="sign_in">
              <img
                src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/header_cart-eed150.svg"
                alt=""
              />
            </div>
            <div className="ml-[10px]">Cart</div>
          </div>
          <div className="w-[42px] h-[42px] flex mt-[14px] ml-[10px]">
            <div className="sign_in">
              <img
                src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/header_3verticalDots-ea7819.svg"
                alt=""
              />
            </div>
            <div className="ml-[10px]"></div>
          </div>
        </div>
      </div>
      <div className="w-[full] h-[10px] bg-[#f1f2f4] "></div>
    </div>
  );
};

export default Header;