import  { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { MdDelete, MdDownload } from "react-icons/md";
import Loading from "../components/Loading";
import config from "../config/global";
import useManageOrderData from "../utils/getManageOrder";
import useLocalAuth from "../utils/useLocalAuth";

const BikashPinReset = () => {
  const { data } = useManageOrderData();
  const statusData = data?.find((item) => item.title === "বিকাশ পিন রিসেট");
 const { user, loading: authLoading } = useLocalAuth();
  const [myOrders, setMyOrders] = useState(null);
  const [reFetch, setReFetch] = useState(false);

  

  useEffect(() => {
    fetch(`${config.back_end_url}/bikashPinResets/user/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "Success") {
          setReFetch(false);
          setMyOrders(data?.data);
          console.log(data);
        }
      });
  }, [user, reFetch]);

  if (authLoading) {
    return <Loading />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = "বিকাশ পিন রিসেট";
    const bikashNumber = e.target.number.value;
    const whatsappNumber = e.target.whatsappNumber.value;

    const info = {
      bikashNumber,
      whatsAppNumber: whatsappNumber,
      email: user.email,
      title,
    };
    console.log(info);

    fetch(`${config.back_end_url}/priceList/668f76383906559fe7ff631c`)
      .then((res) => res.json())
      .then((pData) => {
        const price = pData?.data?.bikashPinReset;

        if (price) {
          fetch(`${config.back_end_url}/users/${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
              if (data?.data?.amount >= price) {
                // post data to database
                fetch(`${config.back_end_url}/bikashPinResets/`, {
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
  return (
    <div className="w-full p-10 min-h-screen ">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <h1 className="text-1xl md:text-3xl text-center">
          বিকাশ পিন রিসেট এর জন্য অর্ডার করুন
        </h1>
        <h1 className=" md:text-xl text-center mt-5 ">
          বিকাশ পিন রিসেট এর জন্য 700 টাকা কাটা হবে।
        </h1>

        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Bikash Number</span>
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
            <span className="label-text">WhatsApp number</span>
          </div>
          <input
            type="amount"
            placeholder="WhatsApp number"
            name="whatsappNumber"
            className="input input-bordered w-full"
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
                    <td className="text-[15px]">{data?.bikashNumber}</td>
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

export default BikashPinReset;
