import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineFileCopy } from "react-icons/md";
import Loading from "../components/Loading";
import config from "../config/global";
import useManageOrderData from "../utils/getManageOrder";
import useLocalAuth from "../utils/useLocalAuth";

const Biometric = () => {
  const { data } = useManageOrderData();
  const statusData = data?.find((item) => item.title === "Biometric");
const { user, loading: authLoading } = useLocalAuth();
  const [myOrders, setMyOrders] = useState(null);
  const [reFetch, setReFetch] = useState(false);
  const [bioPrice, setBioPrice] = useState(null);

  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    fetch(`${config.back_end_url}/priceList/668f76383906559fe7ff631c`)
      .then((res) => res.json())
      .then((data) => {
        setBioPrice(data?.data);
      });
  }, []);

  useEffect(() => {
    fetch(`${config.back_end_url}/biometricOrders/user/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "Success") {
          setReFetch(false);
          setMyOrders(data?.data);
        }
      });
  }, [user, reFetch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("selected price", selectedItem);
    const title = "বায়োমেট্রিক";
    const selectType = e.target.selectType.value;
    const biometricNumber = e.target.biometricNumber.value;

    const info = {
      selectType,
      biometricNumber,
      email: user.email,
      title,
      amount: selectedItem,
    };

    fetch(`${config.back_end_url}/users/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.amount >= selectedItem) {
          fetch(`${config.back_end_url}/biometricOrders/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(info),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("response", data);
              if (data.status == "success") {
                setReFetch(true);
                toast.success(data.message);
                console.log(data);
              }
            });
        } else {
          toast.error("Please recharge to proceed this order");
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

  if (authLoading) {
    return <Loading />;
  }
  return (
    <div className="w-full p-10 min-h-screen ">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <h1 className="text-1xl md:text-3xl text-center">
          বায়োমেট্রিক অর্ডার করুন।
        </h1>

        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Select Type:</span>
          </div>
          <select
            name="selectType"
            className="select select-bordered "
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
            required
          >
            <option value="" disabled>
              select your choice
            </option>
            <option
              name="banglalink"
              value={bioPrice?.banglalinkBiometricOrder}
            >
              Banglalink Biometric ({bioPrice?.banglalinkBiometricOrder})
            </option>
            <option name="grameen" value={bioPrice?.grameenBiometricOrder}>
              Grameen Biometric ({bioPrice?.grameenBiometricOrder})
            </option>
            <option name="robi" value={bioPrice?.robiBiometricOrder}>
              Robi Biometric ({bioPrice?.robiBiometricOrder})
            </option>
            <option name="airtel" value={bioPrice?.airtelBiometricOrder}>
              Airtel Biometric ({bioPrice?.airtelBiometricOrder})
            </option>
            <option name="teletalk" value={bioPrice?.teletalkBiometricOrder}>
              Teletalk biometric ( {bioPrice?.teletalkBiometricOrder})
            </option>
          </select>
        </label>

        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">বায়োমেট্রিক নাম্বার লিখুন*</span>
          </div>
          <input
            type="number"
            placeholder="Biometric number"
            name="biometricNumber"
            className="input input-bordered w-full"
            required
          />
        </label>

        <p className="text-2xl font-semibold text-red-600 mt-4">
          {selectedItem &&
            `আপনার অ্যাকাউন্ট থেকে ${selectedItem} টাকা কাটা হবে`}
        </p>

        <button
          className="btn w-full mt-4 btn-primary text-white flex justify-center items-center"
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
                    <td className="text-[15px]">{data?.biometricNumber}</td>
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

export default Biometric;
