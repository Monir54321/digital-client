import React, { useState } from "react";
import OrderServices from "../components/orders/OrderServices";

const Orders = () => {
  const [status, setStatus] = useState("");
  return (
    <div className="p-4">
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">Select One</span>
        </div>
        <select
          onChangeCapture={(e) => setStatus(e.target.value)}
          className="select select-bordered "
        >
          {/* <option name="signCopy">সাইন কপি</option> */}
          <option disabled>select</option>
          <option name="orderNIds">এনআইডি কার্ড অর্ডার</option>
          <option name="nidMake">এনআইডি মেক</option>
          {/* <option name="servercopytonidmake">সার্ভার কপি to এনআইডি মেক</option> */}
          <option name="biometric">বায়োমেট্রিক</option>
          {/* <option name="servercopy">সার্ভার কপি</option> */}
          <option name="calllistsim">কল লিস্ট অল সিম</option>
          {/* <option name="saftytika">সুরক্ষা টিকা</option> */}
          {/* <option name="birthcertificateonline">জন্ম নিবন্ধন (Online)</option> */}
          {/* <option name="birthcertificateFix">নিবন্ধন নাম কারেকশন</option> */}
          <option name="bikashinfo">বিকাশ ইনফো</option>
          <option name="nogodinfo">নগদ ইনফো</option>
          {/* <option name="bikashpinreset">বিকাশ পিন রিসেট</option> */}
          <option name="signCopy">সাইন কপি</option>
          {/* <option name="nameaddress">নাম ঠিকনা (হারানো আইডি)</option> */}
        </select>
      </label>

      {status ? (
        <OrderServices
          prop={
            (status == "এনআইডি কার্ড অর্ডার" && "orderNIds") ||
            (status == "বায়োমেট্রিক" && "biometricOrders") ||
            (status == "কল লিস্ট অল সিম" && "callListOrders") ||
            (status == "সুরক্ষা টিকা" && "saftyTikas") ||
            (status == "নিবন্ধন নাম কারেকশন" && "birthCertificateFixs") ||
            (status == "বিকাশ ইনফো" && "bikashInfoOrders") ||
            (status == "নগদ ইনফো" && "nogodInfoOrders") ||
            (status == "বিকাশ পিন রিসেট" && "bikashPinResets") ||
            (status == "সাইন কপি" && "signCopy")
          }
        />
      ) : (
        <OrderServices prop="orderNIds" />
      )}
    </div>
  );
};

export default Orders;
