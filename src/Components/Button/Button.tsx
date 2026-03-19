import React from "react";
import "./button.css";

type ButtonProps = {
  borderColor?: string;
  label: string;
  hoverColor: string;
  onClick: () => void;
  active?: boolean;
};

export const CustomButton: React.FC<ButtonProps> = ({
  borderColor,
  label,
  onClick,
  hoverColor,
  active,
}) => {
  return (
    <button
      className={`custom-button ${active ? "active" : ""}`}
      style={{
        borderColor,
        backgroundColor: active ? hoverColor : undefined,
        color: active ? "#000" : undefined,
        ["--hover-color" as any]: hoverColor
      }}
      onClick={onClick}
    >
      {label}
    </button>
  );
};