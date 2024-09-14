import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { MdOutlineFileCopy } from "react-icons/md";
import Loading from "../components/Loading";
import config from "../config/global";
import auth from "../firebase/firebase.config";
import useManageOrderData from "../utils/getManageOrder";

const NogodInfo = () => {
  const { data } = useManageOrderData();
  const statusData = data?.find((item) => item.title === "নগদ ইনফো");
  const [user, loading, error] = useAuthState(auth);
  const [myOrders, setMyOrders] = useState(null);
  const [reFetch, setReFetch] = useState(false);

  const [price, setPrice] = useState(0);

  useEffect(() => {
    fetch(`${config.back_end_url}/priceList/668f76383906559fe7ff631c`)
      .then((response) => response.json())
      .then((pData) => {
        setPrice(parseFloat(pData?.data?.nogodInfoOrder));
      });
  }, []);

  useEffect(() => {
    fetch(`${config.back_end_url}/nogodInfoOrders/user/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.status == "Success") {
          setReFetch(false);
          setMyOrders(data?.data);
          console.log(data);
        }
      });
  }, [user, reFetch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = "নগদ ইনফো";
    const nogodNumber = e.target.number.value;
    const description = e.target.description.value;

    const info = {
      nogodNumber,
      description,
      email: user.email,
      title,
    };

    fetch(`${config.back_end_url}/priceList/668f76383906559fe7ff631c`)
      .then((res) => res.json())
      .then((pData) => {
        const price = pData?.data?.nogodInfoOrder;

        if (price) {
          fetch(`${config.back_end_url}/users/${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
              if (data?.data?.amount >= price) {
                // post data to database
                fetch(`${config.back_end_url}/nogodInfoOrders/`, {
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
        }
      });
  };

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Failed to copy text.");
        console.error("Error copying text: ", err);
      });
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="w-full p-10 min-h-screen ">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <h1 className="text-1xl md:text-3xl text-center">
          নগদ ইনফো অর্ডার করুন
        </h1>
        <h1 className=" md:text-xl text-center mt-5 ">
          নগদ ইনফোর জন্য {price} টাকা কাটা হবে।
        </h1>

        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Nogod Number</span>
          </div>
          <input
            type="number"
            placeholder="number"
            name="number"
            className="input input-bordered w-full"
          />
        </label>

        <label className="form-control w-full  mt-3">
          <div className="label">
            <span className="label-text">
              নগদ ইনফো সম্পর্কে বিস্তারিত লিখুনঃ(যদি কিছু বলার থাকে)
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
                  <td>NO</td>
                  <td>STATUS</td>
                  <td className="text-center">ACTION</td>
                  <td>DATE</td>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {myOrders?.map((data) => (
                  <tr key={data._id}>
                    <td className="text-[15px]">{data?.nogodNumber}</td>
                    <td className="text-[15px]">{data?.status}</td>
                    <td className="text-[15px">
                      <div className="flex gap-4 items-center w-full h-full">
                        <div> {data?.reason || data?.pdf}</div>
                        <div>
                          {data?.status == "Success" && (
                            <div className="flex justify-center items-center w-full h-full">
                              <button onClick={() => handleCopy(data?.pdf)}>
                                <MdOutlineFileCopy
                                  className="w-5 h-5 font-semibold text-blue-600"
                                  width={16}
                                  height={16}
                                />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="text-[15px]">
                      {data?.createdAt?.split("T")[0]}
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

export default NogodInfo;
