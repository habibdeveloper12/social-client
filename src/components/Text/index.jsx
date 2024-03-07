import React from "react";

const sizes = {
  "5xl": "text-[26px] font-normal",
  "6xl": "text-3xl font-normal",
  "7xl": "text-4xl font-normal",
  "8xl": "text-[44px] font-medium",
  "2xl": "text-xl font-normal",
  "3xl": "text-[22px] font-normal",
  "4xl": "text-2xl font-normal",
  xs: "text-[4px] font-normal",
  lg: "text-sm font-normal",
  s: "text-[5px] font-normal",
  xl: "text-base font-normal",
  "9xl": "text-[46px] font-normal",
  "10xl": "text-[50px] font-normal",
  md: "text-[8px] font-normal",
};

const Text = ({ children, className = "", as, size = "xl", ...restProps }) => {
  const Component = as || "p";

  return (
    <Component className={`text-white-A700 font-poppins ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Text };
