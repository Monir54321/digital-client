import QRCode from "qrcode";
import React, { useState } from "react";

const ServerCopyQr = ({ nationalId, dateOfBirth, name }) => {
  const [qrImage, setQrImage] = useState("");
  {
    QRCode.toDataURL(`${nationalId} ${dateOfBirth} ${name}`)
      .then((url) => {
        setQrImage(url);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return (
    <>
      <img
        src={qrImage}
        style={{ height: "135px", width: "170px", marginLeft: "-25px" }}
        alt="QR Code"
      />
    </>
  );
};

export default ServerCopyQr;
