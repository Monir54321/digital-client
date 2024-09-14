import React from "react";
import { Link } from "react-router-dom";

const BkashError = () => {
  const searchData = new URLSearchParams(window.location.search);
  console.log("searchData", searchData);
  const message = searchData.get("message");

  return (
    <div>
      bkash error : {message}
      <Link to={"/dashboard"}>Back to Dashboard</Link>
    </div>
  );
};

export default BkashError;
