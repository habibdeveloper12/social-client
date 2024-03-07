import React from "react";
import PropTypes from "prop-types";

const shapes = {
  round: "rounded-[15px]",
};
const variants = {
  tarFillBluegray10033: "bg-blue_gray-100_33",
};
const sizes = {
  xs: "h-[183px] p-7 text-xl",
};

const TextArea = React.forwardRef(
  (
    {
      className = "",
      name = "",
      placeholder = "",
      shape = "round",
      size = "xs",
      variant = "tarFillBluegray10033",
      onChange,
      ...restProps
    },
    ref,
  ) => {
    const handleChange = (e) => {
      if (onChange) onChange(e?.target?.value);
    };

    return (
      <textarea
        ref={ref}
        className={`${className} ${shapes[shape] || ""} ${sizes[size] || ""} ${variants[variant] || ""}`}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        {...restProps}
      />
    );
  },
);

TextArea.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  shape: PropTypes.oneOf(["round"]),
  size: PropTypes.oneOf(["xs"]),
  variant: PropTypes.oneOf(["tarFillBluegray10033"]),
};

export { TextArea };
