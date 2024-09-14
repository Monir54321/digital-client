/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { MdDelete, MdDownload } from "react-icons/md";
import Loading from "../components/Loading";
import auth from "../firebase/firebase.config";
import useManageOrderData from "../utils/getManageOrder";

const SaftyTika = () => {
  const { data } = useManageOrderData();
  const statusData = data?.find((item) => item.title === "সুরক্ষা টিকা");
  const [user, loading] = useAuthState(auth);
  const [myOrders, setMyOrders] = useState(null);
  const [reFetch, setReFetch] = useState(false);

  if (loading) {
    return <Loading />;
  }

  useEffect(() => {
    fetch(`http://localhost:5000/saftyTikas/user/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setReFetch(false);
        setMyOrders(data?.data);
        console.log(data);
      });
  }, [user, reFetch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = "সুরক্ষা টিকা";
    const passportNumber = e.target.passportNumber.value;
    const otpPhoneNumber = e.target.otpPhoneNumber.value;
    const description = e?.target?.description?.value || "";

    const info = {
      passportNumber: passportNumber,
      phone: otpPhoneNumber,
      description,
      email: user.email,
      title,
    };
    console.log(info);

    fetch("http://localhost:5000/priceList/668f76383906559fe7ff631c")
      .then((res) => res.json())
      .then((pData) => {
        const price = pData?.data?.saftyTika;

        if (price) {
          fetch(`http://localhost:5000/users/${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
              if (data?.data?.amount >= price) {
                // post data to database
                // post data to database
                fetch("http://localhost:5000/saftyTikas/", {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(info),
                })
                  .then((res) => res.json())
                  .then((sData) => {
                    if (sData.status == "Success") {
                      setReFetch(true);
                      toast.success(sData.message);
                      e.target.reset();
                      console.log(sData);
                    } else {
                      toast.error(sData.message);
                      console.log(sData);
                    }
                  });
              }
            });
        }
      });
  };
  return (
    <div className="w-full p-10 min-h-screen ">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        {/* <h1 className='text-1xl md:text-3xl text-center'>আইডি কার্ড অর্ডার করুন</h1> */}
        <h1 className=" md:text-xl text-center mt-5 ">
          আইডি কার্ড এর জন্য 200 টাকা কাটা হবে ।
        </h1>

        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text"> পাসপোর্ট নাম্বার</span>
          </div>
          <input
            type="text"
            placeholder=" পাসপোর্ট নাম্বার"
            name="passportNumber"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">(OTP) ফোন নাম্বার:</span>
          </div>
          <input
            type="text"
            placeholder="(OTP) ফোন নাম্বার:"
            name="otpPhoneNumber"
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
                    <td className="text-[15px]">{data?.passportNumber}</td>
                    <td className="text-[15px]">{data?.status}</td>
                    <td className="text-[15px]">REASON</td>
                    <td className="text-[15px]">
                      {data?.createdAt?.split("T")[0]}
                    </td>
                    <td className="text-[15px] flex flex-row w-full">
                      {data?.status == "Success" && (
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
                      )}

                      {data?.title == "Success" && (
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

export default SaftyTika;
