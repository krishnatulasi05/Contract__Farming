import React from "react";
import "./Back.css";

const Back = () => {
  return (
    <div className="back-overlay">
      <a href="javascript:history.back()" className="back-link">
        &larr; Back
      </a>
    </div>
  );
};

export default Back;
