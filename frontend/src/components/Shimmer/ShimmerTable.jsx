import React from "react";

const ShimmerTable = ({
  mode = "light",
  row = 3,
  col = 1,
  border = 1,
  borderColor = "#cbd5e1",
  rounded = 0.25,
  rowGap = 16,
  colPadding = [10, 5, 10, 5],
}) => {
  const shimmerStyle = {
    background: `linear-gradient(90deg, rgba(243, 244, 246, 0.6) 25%, rgba(255, 255, 255, 1) 50%, rgba(243, 244, 246, 0.6) 75%)`,
    backgroundSize: "200% 100%",
    animation: "shimmer 2.5s infinite linear",
  };

  return (
    <div className="w-full space-y-3 px-2 py-4 bg-white">
      {Array.from({ length: row }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="flex"
          style={{ gap: `${rowGap}px` }}
        >
          {Array.from({ length: col }).map((_, colIndex) => (
            <div
              key={colIndex}
              className="shimmer-cell"
              style={{
                ...shimmerStyle,
                height: "30px",
                flex: 1,
                // border: `${border}px solid ${borderColor}`,
                borderRadius: `${rounded}rem`,
                padding: `${colPadding[0]}px ${colPadding[1]}px ${colPadding[2]}px ${colPadding[3]}px`,
                // boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            ></div>
          ))}
        </div>
      ))}
      <style>
        {`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}
      </style>
    </div>
  );
};

export default ShimmerTable;
