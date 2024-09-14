import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../components/Loading";
import auth from "../firebase/firebase.config";
import useManageOrderData from "../utils/getManageOrder";

const LocationTrack = () => {
  const { data } = useManageOrderData();
  const statusData = data?.find((item) => item.title === "লোকেশন ট্র্যাক");
  const [user, loading, error] = useAuthState(auth);
  const [myOrders, setMyOrders] = useState(null);
  const [reFetch, setReFetch] = useState(false);
  const [bioPrice, setBioPrice] = useState(null);

  if (loading) {
    return <Loading />;
  }

  //   useEffect(() => {
  //     fetch("http://localhost:5000/priceList/668f76383906559fe7ff631c")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setBioPrice(data?.data);
  //         console.log(data.data);
  //       });
  //   }, []);

  //   useEffect(() => {
  //     fetch(`http://localhost:5000/biometricOrders/user/${user?.email}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.status == "Success") {
  //           setReFetch(false);
  //           setMyOrders(data?.data);
  //           console.log(data);
  //         }
  //       });
  //   }, [user, reFetch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = "লোকেশন ট্র্যাক";

    const locationTrackNumber = e.target.phoneNumber.value;
    const description = e.target.description.value;

    const info = {
      locationTrackNumber,
      description,
      email: user.email,
      title,
    };
    console.log(info);

    // fetch(`http://localhost:5000/users/${user.email}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data?.data?.amount >= 99) {
    //       // post data to database
    //       // post data to database
    //       fetch("http://localhost:5000/biometricOrders/", {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(info),
    //       })
    //         .then((res) => res.json())
    //         .then((data) => {
    //           if (data.status == "Success") {
    //             setReFetch(true);
    //             toast.success(data.message);
    //             console.log(data);
    //           } else {
    //             toast.error(data.message);
    //             console.log(data);
    //           }
    //         });
    //     } else {
    //       toast.error("Please recharge to proceed this order");
    //     }
    //   });
  };
  return (
    <div className="w-full p-10 min-h-screen">
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <h1 className="text-1xl md:text-3xl text-center">লোকেশন ট্র্যাক করুন</h1>
      <h1 className="md:text-xl text-center mt-5">
        লোকেশন ট্র্যাক এর জন্য 500 টাকা কাটা হবে ।
      </h1>
  
      {/* New wrapper div to align p tags left */}
      <div className="w-full">
        <p className="text-left">লোকেশনের জন্য অবশ্যই এক্টিভ দিন</p>
        <p className="text-left">সিম অফ থাকলে লাস্ট লোকেশন আসবে</p>
      </div>
  
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Phone number</span>
        </div>
        <input
          type="number"
          placeholder="Phone number"
          name="phoneNumber"
          className="input input-bordered w-full"
        />
      </label>
  
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Description</span>
        </div>
  
        <textarea
          className="textarea textarea-bordered"
          placeholder="Description"
          name="description"
        ></textarea>
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

export default LocationTrack;
