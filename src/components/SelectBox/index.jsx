import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const shapes = {
  round: "rounded-[15px]",
};
const variants = {
  fill: {
    blue_gray_100_33: "bg-blue_gray-100_33 text-black-900_03",
  },
  outline: {
    white_A700: "border-white-A700 border border-solid text-white-A700",
  },
};
const sizes = {
  sm: "h-[80px] px-[35px] text-[25px]",
  xs: "h-[50px] px-[33px] text-base",
};

const SelectBox = React.forwardRef(
  (
    {
      children,
      className = "",
      options = [],
      isSearchable = false,
      isMulti = false,
      indicator,
      shape = "round",
      size = "sm",
      variant = "fill",
      color = "blue_gray_100_33",
      ...restProps
    },
    ref,
  ) => {
    return (
      <>
        <Select
          ref={ref}
          options={options}
          className={`${className} flex ${(shape && shapes[shape]) || ""} ${(size && sizes[size]) || ""} ${(variant && variants[variant]?.[color]) || ""}`}
          isSearchable={isSearchable}
          isMulti={isMulti}
          components={{
            IndicatorSeparator: () => null,
            ...(indicator && { DropdownIndicator: () => indicator }),
          }}
          styles={{
            container: (provided) => ({
              ...provided,
              zIndex: 0,
            }),
            control: (provided) => ({
              ...provided,
              backgroundColor: "transparent",
              border: "0 !important",
              boxShadow: "0 !important",
              minHeight: "auto",
              width: "100%",
              "&:hover": {
                border: "0 !important",
              },
            }),
            input: (provided) => ({
              ...provided,
              color: "inherit",
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isSelected && "#fa0037",
              color: state.isSelected && "#f6f7f9",
              "&:hover": {
                backgroundColor: "#fa0037",
                color: "#f6f7f9",
              },
            }),
            valueContainer: (provided) => ({
              ...provided,
              padding: 0,
            }),
            placeholder: (provided) => ({
              ...provided,
              margin: 0,
            }),
            menuPortal: (base) => ({ ...base, zIndex: 999999 }),
          }}
          menuPortalTarget={document.body}
          closeMenuOnScroll={(event) => {
            return event.target.id === "scrollContainer";
          }}
          {...restProps}
        />
        {children}
      </>
    );
  },
);

SelectBox.propTypes = {
  className: PropTypes.string,
  options: PropTypes.array,
  isSearchable: PropTypes.bool,
  isMulti: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.string,
  indicator: PropTypes.node,
  shape: PropTypes.oneOf(["round"]),
  size: PropTypes.oneOf(["sm", "xs"]),
  variant: PropTypes.oneOf(["fill", "outline"]),
  color: PropTypes.oneOf(["blue_gray_100_33", "white_A700"]),
};

export { SelectBox };
