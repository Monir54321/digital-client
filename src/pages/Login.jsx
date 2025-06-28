/* eslint-disable react/no-unescaped-entities */
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import toast from "react-hot-toast";

const LogIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("login_token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // Function to handle login via custom backend
  const handleCustomLogin = async (email, password) => {
    try {
      const response = await fetch(
        "https://digital-server1.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      console.log("✅ Full backend response:", data);

      const token = data?.data?.token;
      const userObj = data?.data?.user; // assuming backend returns user info

      if (data?.status === "Success" && token && userObj) {
        console.log("🧠 Saving token and user to localStorage...");
        localStorage.setItem("login_token", token);
        localStorage.setItem("user", JSON.stringify(userObj));

        const stored = localStorage.getItem("login_token");
        console.log("🧾 Token in localStorage:", stored);

        toast.success("Logged in successfully");
        navigate("/dashboard");
      } else {
        toast.error(data?.message || "Login failed");
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      toast.error("Error connecting to server");
    }
  };

  const handleLogIn = async (e) => {
    e.preventDefault();

    const email = e?.target?.email?.value;
    const password = e?.target?.password?.value;

    if (email && password) {
      // Call custom login function
      await handleCustomLogin(email, password);
    }
  };

  return (
    <div className="min-h-screen m-5 md:m-10">
      <form
        onSubmit={handleLogIn}
        className="flex justify-center items-center min-h-screen"
      >
        <div className="flex flex-col w-[800px] gap-5 md:m-10 bg-[#ffffff] shadow-md p-5 h-fit">
          <img className="w-28 mx-auto" src={logo} alt="" />
          <h2 className="text-center text-xl font-semibold ">Welcome back!</h2>

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow"
              name="email"
              placeholder="Email"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              name="password"
              placeholder="Password"
            />
          </label>
          <p>
            <span className="text-slate-950 text-[18px]">
              Don't have an account?
            </span>{" "}
            <Link className="text-blue-700 font-bold" to={"/signup"}>
              SignUp
            </Link>
          </p>

          <button className="btn w-full  btn-primary text-white">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
