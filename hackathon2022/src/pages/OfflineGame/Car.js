import React from "react";

const Car = React.forwardRef(({ categry, color, x, y }, ref) => {
  return (
    <div
      ref={ref}
      className={categry}
      style={{ backgroundColor: color, top: y || "auto", left: x || 0 }}
    ></div>
  );
});

export default Car;
