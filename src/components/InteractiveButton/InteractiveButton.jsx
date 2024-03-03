
import React, { memo, useId } from "react";
import MoonLoader from "react-spinners/MoonLoader";

const InteractiveButton = memo(
  ({
    loading = false,
    disabled,
    children,
    type = "button",
    className,
    loaderclasses,
    onClick,
    color = "#ffffff",
  }) => {
    const override = {
      borderColor: "#ffffff",
    };
    const id = useId();
    return (
      <button
        type={type}
        disabled={disabled}
        className={`flex items-center justify-center gap-5 ${className}`}
        onClick={onClick}
      >
        <>
          <MoonLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={20}
            className={loaderclasses}
            // aria-label="Loading Spinner"
            data-testid={id}
          />

          <span>{children}</span>
        </>
      </button>
    );
  }
);

export default InteractiveButton;
