import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import MyOrdersUi from "../components/MyOrdersUi/MyOrdersUi";
import config from "../config/global";
import auth from "../firebase/firebase.config";
import useManageOrderData from "../utils/getManageOrder";

const NameAddressLostId = () => {
  const { data } = useManageOrderData();
  const statusData = data?.find(
    (item) => item.title === "নাম ঠিকনা (হারানো আইডি)"
  );
  const [user, loading] = useAuthState(auth);
  const [reFetch, setReFetch] = useState(false);
  const [myOrders, setMyOrders] = useState(null);


  const [price, setPrice] = useState(0);

  useEffect(() => {
    fetch(`${config.back_end_url}/priceList/668f76383906559fe7ff631c`)
      .then((response) => response.json())
      .then((pData) => {
        setPrice(parseFloat(pData?.data?.nameAddressesLostId));
      });
  }, []);

  useEffect(() => {
    if (user?.email) {
      fetch(`${config.back_end_url}/nameAddressesLostId/user/${user.email}`)
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
    const name = e.target.message.value;

    const nameAddressesLostIdData = {
      title: "নাম ঠিকনা (হারানো আইডি)",
      name,
      email: user.email,
    };

    fetch(`${config.back_end_url}/priceList/668f76383906559fe7ff631c`)
      .then((res) => res.json())
      .then((pData) => {
        const price = pData?.data?.nameAddressesLostId;
        if (price) {
          fetch(`${config.back_end_url}/users/${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
              if (data?.data?.amount >= price) {
                // Post data to database
                fetch(`${config.back_end_url}/nameAddressesLostId`, {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(nameAddressesLostIdData),
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
          আইডি কার্ড এর জন্য {price} টাকা কাটা হবে ।
        </h1>

        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">নিজ নাম</span>
          </div>
          <textarea
            className="border border-gray-300 rounded-lg p-4 w-full h-auto resize-none shadow-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            rows={20}
            placeholder="enter your information in details"
            name="message"
            defaultValue={`
নাম ঠিকানা লিখে দেন
নিজ- *নাম: 
•জন্ম তারিখ:
*পিতার নাম: 
*মাতার নাম: 
•স্বামী/স্ত্রীর নাম:
•জন্ম নিবন্ধন নং:
*বিভাগ: 
*জেলা: 
*উপজেলা:
*ইউনিয়ন/সিটি/পৌরসভা: 
•ওয়ার্ড নং/ভোটার এরিয়া নং: 
•বাসা/হোল্ডিং:
*গ্ৰাম/রাস্তা:
একই এলাকার আইডি: 
•পিতার আইডি নং: 
•মাতার আইডি নং: 
স্টার মার্ক করা তথ্য বাধ্যতামূলক
অথবা এডমিন সঙ্গে কথা বলেন
  `}
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

      {myOrders && <MyOrdersUi myOrders={myOrders} />}
    </div>
  );
};

export default NameAddressLostId;
