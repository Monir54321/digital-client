import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import config from "../config/global";
import useLocalAuth from "../utils/useLocalAuth";

const Recharge = () => {
  const [amount, setAmount] = useState(0);
  const { user, loading } = useLocalAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRecharge = async () => {
    try {
      // Validate amount
      if (!amount || amount < 50) {
        toast.error("Minimum recharge amount is 50 Taka");
        return;
      }

      // Debug: Log the request details
      console.log("Backend URL:", config.back_end_url);
      console.log("User email:", user?.email);
      console.log("Amount:", amount);
      console.log("Request payload:", {
        amount: Number(amount),
        email: user.email,
      });

      setIsProcessing(true);

      const { data } = await axios.post(
        `${config.back_end_url}/bkash/payment/create`,
        {
          amount: Number(amount),
          email: user.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000, // 10 second timeout
        }
      );

      console.log("Response data:", data);

      if (data?.status === "Success") {
        toast.success("Payment initiated successfully!");

        // Redirect to payment URL if provided
        if (data?.data && data.data.startsWith("http")) {
          window.location.href = data.data;
        } else {
          // If no payment URL, redirect to dashboard
          window.location.href = "https://smartshebav2.vercel.app/dashboard";
        }
      } else {
        toast.error(data?.message || "Payment initiation failed");
      }
    } catch (error) {
      console.log("Full error object:", error);
      console.log("Error response:", error?.response);
      console.log("Error request:", error?.request);
      console.log("Error message:", error?.message);
      console.log("Error config:", error?.config);

      // Handle different types of errors
      if (error.response) {
        // Server responded with error status
        console.log("Server error status:", error.response.status);
        console.log("Server error data:", error.response.data);

        const errorMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          `Server error: ${error.response.status}`;
        toast.error(errorMessage);
      } else if (error.request) {
        // Network error - request was made but no response received
        console.log("Network error - no response received");
        toast.error(
          "Cannot connect to server. Please check your internet connection and try again."
        );
      } else if (error.code === "ECONNABORTED") {
        // Timeout error
        console.log("Request timeout");
        toast.error("Request timed out. Please try again.");
      } else {
        // Other errors
        console.log("Other error:", error.message);
        toast.error(
          `Error: ${error.message || "Something went wrong. Please try again."}`
        );
      }
    } finally {
      setIsProcessing(false);
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
            <span className="label-text">Amount (Minimum: 50 Taka)</span>
          </div>
          <input
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            placeholder="Enter amount"
            name="amount"
            min="50"
            className="input input-bordered w-full"
            disabled={isProcessing}
          />
        </label>
        <button
          onClick={handleRecharge}
          className="btn w-full mt-4 btn-primary text-white"
          disabled={isProcessing || !amount || amount < 50}
        >
          {isProcessing ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Processing...
            </>
          ) : (
            "Pay Now"
          )}
        </button>

        {amount && amount < 50 && (
          <p className="text-red-500 text-sm mt-2">
            Minimum recharge amount is 50 Taka
          </p>
        )}
      </div>
    </div>
  );
};

export default Recharge;
