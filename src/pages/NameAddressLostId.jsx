import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import auth from "../firebase/firebase.config";
import useManageOrderData from "../utils/getManageOrder";

const NameAddressLostId = () => {
  const { data } = useManageOrderData();
  const statusData = data?.find(
    (item) => item.title === "নাম ঠিকনা (হারানো আইডি)"
  );
  const [user, loading, error] = useAuthState(auth);
  const [myOrders, setMyOrders] = useState(null);

  // useEffect(() => {
  //     fetch(`http://localhost:5000/nameaddresslostid/user/${user?.email}`)
  //     .then(res => res.json())
  //     .then(data => {
  //         setMyOrders(data?.data)
  //         console.log(data);
  //     })
  // },[user])

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = "";
    const name = e?.target?.name?.value;
    const fatherName = e?.target?.fatherName?.value;
    const motherName = e?.target?.motherName?.value;
    const husbandWifeName = e?.target?.husbandWifeName?.value;
    const birthCertificate = e?.target?.birthCertificate?.value;
    const bivag = e?.target?.bivag?.value;
    const jela = e?.target?.jela?.value;
    const upazila = e?.target?.upazila?.value;
    const unionPowrosovaSityCorporation =
      e?.target?.unionPowrosovaSityCorporation?.value;
    const wordernumber = e?.target?.ordernumber?.value;
    const dakghar = e?.target?.dakghar?.value;
    const gram = e?.target?.gram?.value;
    const fatherNIDNumber = e?.target?.fatherNIDNumber?.value;
    const motherNIDNumber = e?.target?.motherNIDNumber?.value;
    const voterNID = e?.target?.voterNID?.value;

    const data = {
      title,
      name,
      fatherName,
      motherName,
      husbandWifeName,
      birthCertificate,
      bivag,
      jela,
      upazila,
      unionPowrosovaSityCorporation,
      wordernumber,
      dakghar,
      gram,
      fatherNIDNumber,
      motherNIDNumber,
      voterNID,
      email: user.email,
    };

    console.log(data);

    // post data to database
    fetch("http://localhost:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "Success") {
          toast.success(data.message);
          console.log(data);
        } else {
          toast.error(data.message);
          console.log(data);
        }
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full p-10 min-h-screen ">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <h1 className="text-1xl md:text-3xl text-center">
          আইডি কার্ড এর জন্য অর্ডার করুন
        </h1>
        <h1 className=" md:text-xl text-center mt-5 ">
          আইডি কার্ড এর জন্য 200 টাকা কাটা হবে ।
        </h1>

        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">নিজ নাম</span>
          </div>
          <input
            type="text"
            placeholder="নিজ নাম"
            name="name"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">পিতার নাম</span>
          </div>
          <input
            type="text"
            placeholder="পিতার নাম"
            name="fatherName"
            className="input input-bordered w-full"
          />
        </label>

        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">মাতার নাম</span>
          </div>
          <input
            type="text"
            placeholder="মাতার নাম"
            name="motherName"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">স্বামী/স্ত্রী নাম</span>
          </div>
          <input
            type="text"
            placeholder="স্বামী/স্ত্রী নাম"
            name="husbandWifeName"
            className="input input-bordered w-full"
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">জন্ম সনদ যদি থাকে</span>
          </div>
          <input
            type="file"
            name="birthCertificate"
            className="file-input file-input-bordered w-full"
          />
        </label>

        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">বিভাগ</span>
          </div>
          <input
            type="text"
            placeholder="বিভাগ"
            name="bivag"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">জেলা</span>
          </div>
          <input
            type="text"
            placeholder="জেলা"
            name="jela"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">উপজেলা</span>
          </div>
          <input
            type="text"
            placeholder="উপজেলা"
            name="upazila"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">ইউনিয়ন/পৌরসভা/সিটি করপোরেশন</span>
          </div>
          <input
            type="text"
            placeholder="ইউনিয়ন/পৌরসভা/সিটি করপোরেশন"
            name="unionPowrosovaSityCorporation"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">ওয়ার্ড নং</span>
          </div>
          <input
            type="text"
            placeholder="ওয়ার্ড নং"
            name="ordernumber"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">ডাকঘর</span>
          </div>
          <input
            type="text"
            placeholder="ডাকঘর"
            name="dakghar"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">গ্রাম</span>
          </div>
          <input
            type="text"
            placeholder="গ্রাম"
            name="gram"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">পিতার এনআইডি নং যদি থাকে</span>
          </div>
          <input
            type="text"
            placeholder="পিতার এনআইডি নং যদি থাকে"
            name="fatherNIDNumber"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">মাতার এনআইডি নং যদি থাকে</span>
          </div>
          <input
            type="text"
            placeholder="মাতার এনআইডি নং যদি থাকে"
            name="motherNIDNumber"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">সাথে ভোটার হওয়া একজনের এনআইডি</span>
          </div>
          <input
            type="file"
            placeholder="সাথে ভোটার হওয়া একজনের এনআইডি"
            name="voterNID"
            className="file-input input-bordered w-full"
          />
        </label>

        <button
          className="btn w-full mt-4 btn-primary text-white flex justify-center items-center"
          disabled={loading || statusData?.status === "inactive"}
        >
          {loading ? (
            <>
              <span className="loading loading-spinner text-white bg-primary"></span>
            </>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default NameAddressLostId;
