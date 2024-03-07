import React from "react";
import PropTypes from "prop-types";

const shapes = {
  round: "rounded-sm",
};
const variants = {
  fill: {
    blue_gray_100_03: "bg-blue_gray-100_03 text-gray-800",
    white_A700: "border-black-900_33 border border-solid bg-white-A700 text-black-900_90_01",
  },
  outline: {
    gray_900: "border-gray-900 border-2 border-solid text-gray-900",
  },
};
const sizes = {
  xs: "h-[24px] w-[24px] pl-2.5 text-base",
};

const CheckBox = React.forwardRef(
  (
    {
      className = "",
      name = "",
      children,
      label = "",
      id = "checkbox_id",
      onChange,
      shape = "round",
      variant = "fill",
      size = "xs",
      color = "white_A700",
      ...restProps
    },
    ref,
  ) => {
    const handleChange = (e) => {
      if (onChange) onChange(e?.target?.checked);
    };

    return (
      <>
        <div className={className + " flex items-center justify-center gap-[5px] cursor-pointer"}>
          <input
            className={` ${(shape && shapes[shape]) || ""} ${(size && sizes[size]) || ""} ${(variant && variants[variant]?.[color]) || ""}`}
            ref={ref}
            type="checkbox"
            name={name}
            onChange={handleChange}
            id={id}
            {...restProps}
          />
          <label htmlFor={id}>{label}</label>
        </div>
        {children}
      </>
    );
  },
);

CheckBox.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  shape: PropTypes.oneOf(["round"]),
  size: PropTypes.oneOf(["xs"]),
  variant: PropTypes.oneOf(["fill", "outline"]),
  color: PropTypes.oneOf(["blue_gray_100_03", "white_A700", "gray_900"]),
};

export { CheckBox };
