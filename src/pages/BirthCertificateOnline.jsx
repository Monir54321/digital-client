import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { MdDelete, MdDownload } from "react-icons/md";
import Loading from "../components/Loading";
import config from "../config/global";
import auth from "../firebase/firebase.config";
import useManageOrderData from "../utils/getManageOrder";

const BirthCertificateOnline = () => {
  const { data } = useManageOrderData();
  const statusData = data?.find((item) => item.title === "জন্ম নিবন্ধন");
  const [user, loading, error] = useAuthState(auth);
  const [myOrders, setMyOrders] = useState(null);
  const [reFetch, setReFetch] = useState(false);

  if (loading) {
    return <Loading />;
  }
  useEffect(() => {
    fetch(`${config.back_end_url}/onlineBirthCertificates/user/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "Success") {
          setReFetch(false);
          setMyOrders(data?.data);
          console.log(data);
        }
      });
  }, [user, reFetch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = "আইডি কার্ড";
    const banglaName = e.target.banglaName.value;
    const englishName = e.target.englishName.value;
    const childNumber = e.target.childNumber.value;
    const gender = e.target.gender.value;
    const mobile = e.target.mobile.value;
    const dateOfBirth = e.target.dateOfBirth.value;
    const bivag = e.target.bivag.value;
    const jela = e.target.jela.value;
    const upazila = e.target.upazila.value;
    const unionPowrosovaSityCorporation =
      e.target.unionPowrosovaSityCorporation.value;
    const wordernumber = e.target.ordernumber.value;
    const dakghar = e.target.dakghar.value;
    const postOffice = e.target.postOffice.value;
    const gram = e.target.gram.value;
    const village = e.target.village.value;
    const fatherNameBangla = e.target.fatherNameBangla.value;
    const fatherNameEnglish = e.target.fatherNameEnglish.value;
    const fatherNIDNumber = e.target.fatherNIDNumber.value;
    const fatherBirthCertificate = e.target.fatherBirthCertificate.value;
    const motherNameBangla = e.target.motherNameBangla.value;
    const motherNameEnglish = e.target.motherNameEnglish.value;
    const motherNIDNumber = e.target.motherNIDNumber.value;
    const motherBirthCertificate = e.target.motherBirthCertificate.value;
    const birthLocation = e.target.birthLocation.value;
    const permanentLocation = e.target.permanentLocation.value;
    const whatsAppNumber = e.target.whatsAppNumber.value;

    const info = {
      title,
      bengaliName: banglaName,
      englishName: englishName,
      bornSerialNumber: childNumber,
      gender: gender,
      mobile,
      dateOfBirth,
      bivag,
      jela,
      upojela: upazila,
      powrosova: unionPowrosovaSityCorporation,
      wordNumber: wordernumber,
      dakghor: dakghar,
      postOffice,
      gram,
      villageEnglish: village,
      fatherNameBengali: fatherNameBangla,
      fatherNameEnglish: fatherNameEnglish,
      fatherNIDNumber,
      fatherBirthCertificateNumber: fatherBirthCertificate,
      motherNameBengali: motherNameBangla,
      motherNameEnglish,
      motherNIDNumber,
      motherBirthCertificateNumber: motherBirthCertificate,
      bornLocation: birthLocation,
      permanentAddressBangla: permanentLocation,
      whatsAppNumber,
      email: user.email,
    };
    console.log(info);

    fetch(`${config.back_end_url}/users/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.amount >= 200) {
          // post data to database
          // post data to database
          fetch(`${config.back_end_url}/onlineBirthCertificates/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(info),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.status == "Success") {
                setReFetch(true);
                toast.success(data.message);
                e.target.reset();
                console.log(data);
              } else {
                toast.error(data.message);
                console.log(data);
              }
            });
        } else {
          toast.error("Please recharge to proceed this order");
        }
      });
  };
  return (
    <div className="w-full p-10 min-h-screen ">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <h1 className="text-1xl md:text-3xl text-center">
          আইডি কার্ড অর্ডার করুন
        </h1>
        <h1 className=" md:text-xl text-center mt-5 ">
          আইডি কার্ড এর জন্য 200 টাকা কাটা হবে ।
        </h1>

        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">নাম বাংলা</span>
          </div>
          <input
            type="text"
            placeholder="নাম বাংলাঃ"
            name="banglaName"
            className="input input-bordered w-full"
          />
        </label>

        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Name English</span>
          </div>
          <input
            type="text"
            placeholder="Name english"
            name="englishName"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">বাবা-মায়ের কততম সন্তান</span>
          </div>
          <input
            type="text"
            placeholder="বাবা-মায়ের কততম সন্তানঃ"
            name="childNumber"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">লিঙ্গ</span>
          </div>
          <input
            type="text"
            placeholder="লিঙ্গঃ"
            name="gender"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">মোবাইল</span>
          </div>
          <input
            type="text"
            placeholder="মোবাইলঃ"
            name="mobile"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Date of birth</span>
          </div>
          <input
            type="text"
            placeholder="Date of birth:"
            name="dateOfBirth"
            className="input input-bordered w-full"
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
            <span className="label-text">Post Office</span>
          </div>
          <input
            type="text"
            placeholder="Post Office"
            name="postOffice"
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
            <span className="label-text">Village </span>
          </div>
          <input
            type="text"
            placeholder="Village "
            name="village"
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
            name="fatherNameBangla"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Father Name</span>
          </div>
          <input
            type="text"
            placeholder="Father Name"
            name="fatherNameEnglish"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Father NID Number:</span>
          </div>
          <input
            type="text"
            placeholder="Father NID Number"
            name="fatherNIDNumber"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Father Birth Certificate</span>
          </div>
          <input
            type="text"
            placeholder="Father Birth Certificate"
            name="fatherBirthCertificate"
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
            name="motherNameBangla"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Mother Name</span>
          </div>
          <input
            type="text"
            placeholder="Mother Name"
            name="motherNameEnglish"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Mother NID Number:</span>
          </div>
          <input
            type="text"
            placeholder="Mother NID Number"
            name="motherNIDNumber"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Mother Birth Certificate</span>
          </div>
          <input
            type="text"
            placeholder="Mother Birth Certificate"
            name="motherBirthCertificate"
            className="input input-bordered w-full"
          />
        </label>

        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">জন্ম স্থান:</span>
          </div>
          <input
            type="text"
            placeholder="জন্ম স্থান"
            name="birthLocation"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">স্থায়ী ঠিকানা</span>
          </div>
          <input
            type="text"
            placeholder="স্থায়ী ঠিকানা"
            name="permanentLocation"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">আবেদনকারীর whatsapp নাম্বার</span>
          </div>
          <input
            type="text"
            placeholder="আবেদনকারীর whatsapp নাম্বার"
            name="whatsAppNumber"
            className="input input-bordered w-full"
          />
        </label>
        <button
          className="btn w-full mt-4 btn-primary text-white"
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

      <div className="mt-10">
        {myOrders && (
          <div className="overflow-x-auto">
            <table className="table table-xs table-pin-rows table-pin-cols">
              <thead>
                <tr>
                  <td>SERVICE</td>

                  <td>STATUS</td>
                  <td>CANCELLATION REASON</td>
                  <td>DATE</td>
                  <td>DOWNLOAD</td>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {myOrders?.map((data) => (
                  <tr key={data._id}>
                    <td className="text-[15px]">{data?.title}</td>

                    <td className="text-[15px]">{data?.status}</td>
                    <td className="text-[15px]">REASON</td>
                    <td className="text-[15px]">
                      {data?.createdAt?.split("T")[0]}
                    </td>
                    <td className="text-[15px] flex flex-row w-full">
                      {data?.status == "Processing" || "Pending" ? (
                        <button
                          onClick={() =>
                            alert(
                              "You can't delete until successfully delivering this service"
                            )
                          }
                        >
                          <MdDelete
                            className="w-5 h-5 font-semibold text-blue-600"
                            width={16}
                            height={16}
                          />
                        </button>
                      ) : (
                        <button onClick={() => handleDeleteOrder(data?._id)}>
                          <MdDelete
                            className="w-5 h-5 font-semibold text-blue-600"
                            width={16}
                            height={16}
                          />
                        </button>
                      )}

                      {data?.title == "boi" ? (
                        ""
                      ) : (
                        <button>
                          <MdDownload
                            className="w-5 h-5 font-semibold text-blue-600 ml-5"
                            width={16}
                            height={16}
                          />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BirthCertificateOnline;
