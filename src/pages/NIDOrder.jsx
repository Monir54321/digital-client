import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import MyOrdersUi from "../components/MyOrdersUi/MyOrdersUi";
import config from "../config/global";
import auth from "../firebase/firebase.config";
import useManageOrderData from "../utils/getManageOrder";

const NIDOrder = () => {
  const [user, loading] = useAuthState(auth);
  const [myOrders, setMyOrders] = useState(null);
  const [reFetch, setReFetch] = useState(false);
  const { data } = useManageOrderData();
  const statusData = data?.find((item) => item.title === "এনআইডি কার্ড");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    fetch(`${config.back_end_url}/priceList/668f76383906559fe7ff631c`)
      .then((response) => response.json())
      .then((pData) => {
        setPrice(pData?.data?.nidOrder);
      });
  }, []);

  useEffect(() => {
    fetch(`${config.back_end_url}/orderNIds/user/${user?.email}`)
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

    const title = "এনআইডি কার্ড অর্ডার";
    const selectType = e.target.selectType.value;
    const nidVoterForm = e.target.nidVoterForm.value;
    const description = e.target.description.value;

    const info = {
      title,
      selectType,
      number: nidVoterForm,
      description,
      email: user.email,
    };
    console.log(info);

    fetch(`${config.back_end_url}/users/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.amount >= price) {
          fetch(`${config.back_end_url}/orderNIds/`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(info),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.status == "Success") {
                toast.success(data.message);
                console.log(data);
                setReFetch(true);
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full p-10 min-h-screen ">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <h1 className="text-1xl md:text-3xl text-center">
          এনআইডি কার্ড অর্ডার করুন।
        </h1>
        <h1 className=" md:text-xl text-center mt-5 ">
          এনআইডি কার্ডের জন্য {price} টাকা কাটা হবে।
        </h1>

        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Select Type:</span>
          </div>
          <select name="selectType" className="select select-bordered ">
            <option name="nid" defaultChecked={true}>
              NID No
            </option>
            <option name="form">form No</option>
            <option name="birthCertificate">Birth Certificate No</option>
            <option name="voter">Voter No</option>
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
          />
        </label>
        <label className="form-control w-full  mt-3">
          <div className="label">
            <span className="label-text">
              সাইন কপি সম্পর্কে বিস্তারিত লিখুনঃ(যদি কিছু বলার থাকে)
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
          className="btn w-full  mt-4 btn-primary text-white"
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

export default NIDOrder;
