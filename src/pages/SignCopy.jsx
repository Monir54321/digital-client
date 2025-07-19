/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import MyOrdersUi from "../components/MyOrdersUi/MyOrdersUi";
import config from "../config/global";
import useManageOrderData from "../utils/getManageOrder";
import useLocalAuth from "../utils/useLocalAuth";

const SignCopy = () => {
  const { data } = useManageOrderData();
  const statusData = data?.find((item) => item.title === "সাইন কপি");
 const { user, loading: authLoading } = useLocalAuth();
  const [myOrders, setMyOrders] = useState(null);
  const [reFetch, setReFetch] = useState(false);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    fetch(`${config.back_end_url}/priceList/668f76383906559fe7ff631c`)
      .then((response) => response.json())
      .then((pData) => {
        setPrice(parseFloat(pData?.data?.signCopy));
      });
  }, []);

  useEffect(() => {
    if (user?.email) {
      fetch(`${config.back_end_url}/signCopy/user/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "Success") {
            setReFetch(false);
            setMyOrders(data?.data);
            console.log(data);
          } else {
            toast.error("Failed to fetch orders");
          }
        })
        .catch((error) => {
          toast.error("Error fetching orders");
          console.error("Error fetching orders:", error);
        });
    }
  }, [user, reFetch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = "সাইন কপি";
    const selectedType = e.target.selectType.value;
    const number = e.target.nidVoterForm.value;
    const nameDob = e.target.NAMEDOB.value;

    if (!selectedType || !number || !nameDob) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const info = {
      selectedType,
      number,
      nameDob,
      title,
      email: user.email,
    };

    fetch(`${config.back_end_url}/priceList/668f76383906559fe7ff631c`)
      .then((res) => res.json())
      .then((pData) => {
        const price = pData?.data?.signCopy;
        if (price) {
          fetch(`${config.back_end_url}/users/${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
              if (data?.data?.amount >= price) {
                // Post data to database
                fetch(`${config.back_end_url}/signCopy`, {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(info),
                })
                  .then((res) => res.json())
                  .then((rData) => {
                    if (rData.status === "Success") {
                      setReFetch(true);
                      toast.success(rData.message);
                      e.target.reset(); // Reset the form
                    } else {
                      toast.error(rData.message);
                    }
                  })
                  .catch((error) => {
                    toast.error("Failed to submit order.");
                    console.error("Error submitting order:", error);
                  });
              } else {
                toast.error("Please recharge to proceed with this order.");
              }
            })
            .catch((error) => {
              toast.error("Error fetching user data");
              console.error("Error fetching user data:", error);
            });
        } else {
          toast.error("Price information not found.");
        }
      })
      .catch((error) => {
        toast.error("Error fetching price data");
        console.error("Error fetching price data:", error);
      });
  };

  if (authLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full p-10 min-h-screen ">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <h1 className="text-1xl md:text-3xl text-center">
          সাইন কপি অর্ডার করুন।
        </h1>
        <h1 className="md:text-xl text-center mt-5 ">
          সাইন কপির জন্য {price} টাকা কাটা হবে।
        </h1>

        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Select Type:</span>
          </div>
          <select name="selectType" className="select select-bordered ">
            <option value="nid">NID No</option>
            <option value="form">Form No</option>
            <option value="birthCertificate">Birth Certificate No</option>
            <option value="voter">Voter No</option>
          </select>
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">আইডি/ভোটার/ফর্ম নাম্বার*</span>
          </div>
          <input
            type="text"
            placeholder="আইডি/ভোটার/ফর্ম নাম্বারঃ"
            name="nidVoterForm"
            className="input input-bordered w-full"
            required
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">NAME/DOB</span>
          </div>
          <input
            type="text"
            placeholder="NAME/DOB"
            name="NAMEDOB"
            className="input input-bordered w-full"
            required
          />
        </label>

        <button
          className="btn w-full mt-4 btn-primary text-white"
          disabled={authLoading || statusData?.status === "inactive"}
        >
          {authLoading ? (
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

export default SignCopy;
