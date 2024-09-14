import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { MdOutlineFileCopy } from "react-icons/md";
import Loading from "../components/Loading";
import config from "../config/global";
import auth from "../firebase/firebase.config";
import useManageOrderData from "../utils/getManageOrder";

const BikashInfo = () => {
  const { data } = useManageOrderData();
  const statusData = data?.find((item) => item.title === "বিকাশ ইনফো");
  const [user, loading] = useAuthState(auth);
  const [myOrders, setMyOrders] = useState(null);
  const [reFetch, setReFetch] = useState(false);

  const [price, setPrice] = useState(0);

  useEffect(() => {
    fetch(`${config.back_end_url}/priceList/668f76383906559fe7ff631c`)
      .then((response) => response.json())
      .then((pData) => {
        setPrice(parseFloat(pData?.data?.bikashInfo));
      });
  }, []);

  useEffect(() => {
    fetch(`${config.back_end_url}/bikashInfoOrders/user/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "Success") {
          setReFetch(false);
          setMyOrders(data?.data);
          console.log(data);
        }
      });
  }, [user, reFetch]);

  if (loading) {
    return <Loading />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const title = "বিকাশ ইনফো";
    const bikashNumber = form.number.value;
    const description = form.description.value;

    const info = {
      bikashNumber,
      description,
      email: user?.email,
      title,
    };

    try {
      const token = await user.getIdToken();
      if (price) {
        const userData = await fetch(
          `${config.back_end_url}/users/${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in headers
            },
          }
        ).then((res) => res.json());

        if (userData?.data?.amount >= price) {
          const rData = await fetch(`${config.back_end_url}/bikashInfoOrders/`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include the token in headers
            },
            body: JSON.stringify(info),
          }).then((res) => res.json());

          if (rData.status === "Success") {
            setReFetch(true);
            toast.success(rData.message);

            console.log(rData);
            form.reset(); // Reset form after submission
          } else {
            toast.error(rData.message);
            console.log(rData);
          }
        } else {
          toast.error("Please recharge to proceed this order");
        }
      }
    } catch (error) {
      console.error("Error during submission:", error);
      toast.error("Failed to send your request");
    }
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

  return (
    <div className="w-full p-10 min-h-screen my-10">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <h1 className="text-1xl md:text-3xl text-center">
          বিকাশ ইনফো অর্ডার করুন
        </h1>
        <h1 className=" md:text-xl text-center mt-5 ">
          বিকাশ ইনফোর জন্য {price} টাকা কাটা হবে।
        </h1>

        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Bikash Number</span>
          </div>
          <input
            type="number"
            required
            placeholder="number"
            name="number"
            className="input input-bordered w-full"
          />
        </label>

        <label className="form-control w-full  mt-3">
          <div className="label">
            <span className="label-text">
              বিকাশ ইনফো সম্পর্কে বিস্তারিত লিখুনঃ(যদি কিছু বলার থাকে)
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
                    <td className="text-[15px]">{data?.bikashNumber}</td>
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

export default BikashInfo;
