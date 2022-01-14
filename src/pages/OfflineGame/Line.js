import React from "react";

const Line = React.forwardRef(({ top }, ref) => {
  return <div ref={ref} className="lines" style={{ top: top }}></div>;
});

export default Line;
