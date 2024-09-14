import axios from "axios";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../components/Loading";
import config from "../config/global";
import auth from "../firebase/firebase.config";

const Recharge = () => {
  const [amount, setAmount] = useState(0);
  const [user, loading] = useAuthState(auth);

  const handleRecharge = async () => {
    try {
      if (amount >= 50) {
        const { data } = await axios.post(
          `${config.back_end_url}/bkash/payment/create`,
          {
            amount: Number(amount),
            email: user.email,
          }
          // { withCredentials: true }
        );
        // console.log("bkash payment created successfully", data);//show the payment created response
        if (data?.status === "Success") {
          window.location.href = data?.data;
        }
      }
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full p-10 min-h-screen ">
      <div className="flex flex-col items-center md:w-[500px] mx-auto">
        <h2 className="text-center text-xl md:text-2xl">Recharge</h2>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Amount</span>
          </div>
          <input
            onChange={(e) => setAmount(e.target.value)}
            type="amount"
            placeholder="Amount"
            name="amount"
            className="input input-bordered w-full"
          />
        </label>
        <button
          onClick={handleRecharge}
          className="btn w-full  mt-4 btn-primary text-white"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Recharge;
