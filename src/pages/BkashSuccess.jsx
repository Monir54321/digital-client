import React from "react";
import { Link } from "react-router-dom";

const BkashSuccess = () => {
  return (
    <div>
      bkash Success
      <Link to={"/dashboard"}>Back to Dashboard</Link>
    </div>
  );
};

export default BkashSuccess;
