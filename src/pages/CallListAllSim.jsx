import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import MyOrdersUi from "../components/MyOrdersUi/MyOrdersUi";
import config from "../config/global";
import auth from "../firebase/firebase.config";
import useManageOrderData from "../utils/getManageOrder";

const CallListAllSim = () => {
  const { data } = useManageOrderData();
  const statusData = data?.find((item) => item.title === "কল লিস্ট অল সিম");
  const [user, loading] = useAuthState(auth);
  const [myOrders, setMyOrders] = useState(null);
  const [reFetch, setReFetch] = useState(false);

  const [price, setPrice] = useState(0);

  useEffect(() => {
    fetch(`${config.back_end_url}/priceList/668f76383906559fe7ff631c`)
      .then((response) => response.json())
      .then((pData) => {
        setPrice(pData?.data?.callListOrder);
      });
  }, []);

  useEffect(() => {
    fetch(`${config.back_end_url}/callListOrders/user/${user?.email}`)
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

    const title = "কল লিস্ট";
    const number = e.target.number.value;
    const description = e.target.description.value;

    const info = {
      number,
      description,
      email: user.email,
      title,
    };

    fetch(`${config.back_end_url}/priceList/668f76383906559fe7ff631c`)
      .then((res) => res.json())
      .then((pData) => {
        const price = pData?.data?.callListOrder;

        if (price) {
          fetch(`${config.back_end_url}/users/${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
              if (data?.data?.amount >= price) {
                // post data to database

                // post data to database
                fetch(`${config.back_end_url}/callListOrders/`, {
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
                      console.log(data);
                      e.target.reset();
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

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="w-full p-10 min-h-screen ">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <h1 className="text-1xl md:text-3xl text-center">
          কল লিস্ট অর্ডার করুন
        </h1>
        <h1 className=" md:text-xl text-center mt-5 ">
          কল লিস্টের জন্য {price} টাকা কাটা হবে।
        </h1>

        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">কল লিস্টের জন্য নাম্বার দেন *</span>
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
              কল লিস্ট সম্পর্কে বিস্তারিত লিখুনঃ(যদি কিছু বলার থাকে)
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

      {myOrders && <MyOrdersUi myOrders={myOrders} />}
    </div>
  );
};

export default CallListAllSim;
