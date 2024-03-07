import React from "react";
import PropTypes from "prop-types";

const shapes = {
  circle: "rounded-[50%]",
  round: "rounded-[10px]",
};
const variants = {
  fill: {
    white_A700: "bg-white-A700 shadow-xs text-black-900_03",
    blue_gray_100_03: "bg-blue_gray-100_03 text-black-900_03",
    blue_gray_100_01: "bg-blue_gray-100_01 shadow-xs text-white-A700",
    cyan_700_01: "bg-cyan-700_01 text-white-A700",
    light_blue_400: "bg-light_blue-400 text-white-A700",
    red_A400_01: "bg-red-A400_01 text-gray-100_01",
    red_A700: "bg-red-A700",
  },
  outline: {
    black_900_03: "border-black-900_03 border border-solid text-black-900_03",
  },
  gradient: {
    cyan_700_01_light_blue_400: "bg-gradient shadow-xs text-white-A700",
    amber_600_01_deep_orange_400: "bg-gradient1 text-white-A700",
  },
};
const sizes = {
  sm: "h-[31px] px-[19px] text-[11px]",
  "7xl": "h-[110px] px-[34px] text-[28px]",
  "5xl": "h-[72px] px-7 text-2xl",
  "3xl": "h-[60px] px-[35px] text-base",
  "2xl": "h-[51px] px-[35px] text-[17px]",
  md: "h-[34px] px-[17px] text-[15px]",
  xs: "h-[23px] px-1",
  "4xl": "h-[60px] px-[35px] text-[26px]",
  "6xl": "h-[90px] px-[35px] text-[28px]",
  xl: "h-[44px] px-3",
  lg: "h-[39px] px-[21px] text-lg",
};

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape = "round",
  variant = "gradient",
  size = "lg",
  color = "red_A700",
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex items-center justify-center text-center cursor-pointer ${(shape && shapes[shape]) || ""} ${(size && sizes[size]) || ""} ${(variant && variants[variant]?.[color]) || ""}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  shape: PropTypes.oneOf(["circle", "round"]),
  size: PropTypes.oneOf(["sm", "7xl", "5xl", "3xl", "2xl", "md", "xs", "4xl", "6xl", "xl", "lg"]),
  variant: PropTypes.oneOf(["fill", "outline", "gradient"]),
  color: PropTypes.oneOf([
    "white_A700",
    "blue_gray_100_03",
    "blue_gray_100_01",
    "cyan_700_01",
    "light_blue_400",
    "red_A400_01",
    "red_A700",
    "black_900_03",
    "cyan_700_01_light_blue_400",
    "amber_600_01_deep_orange_400",
  ]),
};

export { Button };
