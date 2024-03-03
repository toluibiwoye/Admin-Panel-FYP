
  
import React, { useState } from "react";
// import classes from "./AddButton.module.css";

const AddButton = ({ onClick, children, showPlus = true, className }) => {
  const [animate, setAnimate] = useState(false);

  const onClickHandle = () => {
    if (onClick) {
      onClick();
    }
    setAnimate(true);
  };
  return (
    <button
      onAnimationEnd={() => setAnimate(false)}
      onClick={onClickHandle}
      className={`${ animate && "animate-wiggle" } relative flex h-[2.125rem] w-fit min-w-fit  items-center justify-center overflow-hidden rounded-md border border-primaryBlue bg-indigo-600 px-[.6125rem]  py-[.5625rem] font-['Inter'] text-sm font-medium leading-none text-white shadow-md shadow-indigo-600  ${ className }`}
    >
      {showPlus ? "+" : null} {children ? children : "Add New"}
    </button>
  );
};

export default AddButton;


