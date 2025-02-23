import React from "react";

interface AppointmentsIconProps {
  size?: number;
  viewBoxSize?: number;
  transform?: string;
  showCircle?: boolean;
  color?: string;
}

export default function AppointmentsIcon({
  size = 51,
  viewBoxSize = 51,
  transform = "",
  showCircle = false,
  color = undefined,
}: AppointmentsIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {showCircle && (
        <circle
          fill="currentColor"
          cx={viewBoxSize / 2}
          cy={viewBoxSize / 2}
          r={viewBoxSize / 2}
        />
      )}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M40.8 6.8H45.9C47.2526 6.8 48.5498 7.33732 49.5062 8.29376C50.4627 9.25019 51 10.5474 51 11.9V45.9C51 47.2526 50.4627 48.5498 49.5062 49.5062C48.5498 50.4627 47.2526 51 45.9 51H5.1C3.7474 51 2.45019 50.4627 1.49376 49.5062C0.53732 48.5498 0 47.2526 0 45.9L0 11.9C0 10.5474 0.53732 9.25019 1.49376 8.29376C2.45019 7.33732 3.7474 6.8 5.1 6.8H10.2V0H13.6V6.8H37.4V0H40.8V6.8ZM20.4 27.2H10.2V23.8H20.4V27.2ZM40.8 23.8H30.6V27.2H40.8V23.8ZM20.4 37.4H10.2V34H20.4V37.4ZM30.6 37.4H40.8V34H30.6V37.4Z"
        fill={color ? color : (showCircle ? "#14676B" : "white")}
        transform={transform}
      />
    </svg>
  );
}
