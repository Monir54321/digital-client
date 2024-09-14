import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { MdDelete, MdDownload } from "react-icons/md";
import Loading from "../components/Loading";
import config from "../config/global";
import auth from "../firebase/firebase.config";
import useManageOrderData from "../utils/getManageOrder";

const BirthCertificateFix = () => {
  const { data } = useManageOrderData();
  const statusData = data?.find(
    (item) => item.title === "নাম ঠিকনা (হারানো আইডি)"
  );
  const [user, loading, error] = useAuthState(auth);
  const [myOrders, setMyOrders] = useState(null);
  const [reFetch, setReFetch] = useState(false);

  if (loading) {
    return <Loading />;
  }
  useEffect(() => {
    fetch(`${config.back_end_url}/birthCertificateFixs/user/${user?.email}`)
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
    const title = "নাম ঠিকনা (হারানো আইডি)";
    const birthCertificateNumber = e.target.birthCertificateNumber.value;
    const birthDate = e.target.birthDate.value;
    const newBanglaName = e.target.newBanglaName.value;
    const newEnglishName = e.target.newEnglishName.value;
    const description = e.target.description.value;

    const info = {
      title,
      birthCertificateNumber: birthCertificateNumber,
      dateOfBirth: birthDate,
      newBengaliName: newBanglaName,
      newEnglishName: newEnglishName,
      description,
      email: user.email,
    };

    console.log(info);

    fetch(`${config.back_end_url}/users/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.amount >= 900) {
          // post data to database
          fetch(`${config.back_end_url}/birthCertificateFixs/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(info),
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.status == "Success") {
                setReFetch(true);
                toast.success(result.message);
                e.target.reset();
                console.log(result);
              } else {
                toast.error(result.message);
                console.log(result);
              }
            });
        } else {
          toast.error("Please recharge to proceed this order");
        }
      });

    // if youser dosen't have money toast for recharge
  };
  return (
    <div className="w-full p-10 min-h-screen ">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <h1 className="text-1xl md:text-3xl text-center">নিবন্ধন নাম সংশোধন</h1>
        <h1 className=" md:text-xl text-center mt-5 ">
          নাম সংশোধনের জন্য 900 টাকা কাটা হবে।
        </h1>

        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">জন্ম নিবন্ধন নাম্বার*</span>
          </div>
          <input
            type="text"
            placeholder="জন্ম নিবন্ধন নাম্বার"
            name="birthCertificateNumber"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">জন্ম তারিখঃ mm/dd/yyyy*</span>
          </div>
          <input
            type="text"
            placeholder="জন্ম তারিখঃ"
            name="birthDate"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">চাহিত বাংলা নাম*</span>
          </div>
          <input
            type="text"
            placeholder="চাহিত বাংলা নাম"
            name="newBanglaName"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">চাহিত ইংরেজী নাম*</span>
          </div>
          <input
            type="text"
            placeholder="চাহিত ইংরেজী নাম"
            name="newEnglishName"
            className="input input-bordered w-full"
          />
        </label>

        <label className="form-control w-full  mt-3">
          <div className="label">
            <span className="label-text">
              জন্ম নিবন্ধন নাম সংশোধন সম্পর্কে বিস্তারিত লিখুনঃ(যদি কিছু বলার
              থাকে)
            </span>
          </div>
          <textarea
            type="text"
            placeholder="Description"
            name="description"
            className="input input-bordered w-full h-24"
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
                  <td>NO</td>
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
                    <td className="text-[15px]">
                      {data?.birthCertificateNumber}
                    </td>
                    <td className="text-[15px]">{data?.status}</td>
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
                    <td className="text-[15px]">REASON</td>
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

export default BirthCertificateFix;
