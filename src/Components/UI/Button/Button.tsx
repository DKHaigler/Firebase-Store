import React from "react";
import "./Button.css";

type ButtonProps = {
  borderColor?: string;
  label: string;
  hoverColor: string;
  onClick: () => void;
  active?: boolean;
  className?: string;
};

export const CustomButton: React.FC<ButtonProps> = ({
  borderColor,
  label,
  onClick,
  hoverColor,
  active,
  className,
}) => {
  return (
    <button
      className={`custom-button ${active ? "active" : ""} ${className ?? ""}`}
      style={{
        borderColor,
        backgroundColor: active ? hoverColor : undefined,
        color: active ? "#000" : undefined,
        ["--hover-color" as any]: hoverColor,
      }}
      onClick={onClick}
    >
      {label}
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
};