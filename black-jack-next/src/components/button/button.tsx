"use client";

import {
  ButtonHTMLAttributes,
  PropsWithChildren,
  MouseEvent,
  useCallback,
} from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    PropsWithChildren {
  handleClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  children,
  handleClick,
  disabled,
  className = "",
  ...props
}: ButtonProps) => {
  const onHandleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (handleClick instanceof Function && !disabled) {
        handleClick(e);
      }
    },
    [handleClick, disabled]
  );

  return (
    <button
      {...props}
      onClick={onHandleClick}
      className={`
        w-full px-4 py-3 text-white font-bold rounded-md text-base
        transition-colors duration-150
        ${
          disabled
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        } 
        ${className}
      `}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
