import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../firebase/firebase.config";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import Loading from "../components/Loading";
import logo from "../assets/logo.png";

const SignUp = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (gUser) {
      navigate("/dashboard");
    }
  }, [gUser, navigate]);

  useEffect(() => {
    if (gLoading) {
      return <Loading />;
    }
  }, []);

  const handleGoogleLogin = () => {
    signInWithGoogle();
  };

  // Function to handle signup via custom backend
  const handleCustomSignup = async (name, email, password) => {
    console.log({ data: name, email, password });
    try {
      const response = await fetch(
        "https://digital-server1.onrender.com/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            confirmPassword: password,
          }),
        }
      );
      const data = await response.json();
      if (data.status === "Success") {
        toast.success("Registered Successfully (Custom API)");
        navigate("/dashboard");
      } else {
        toast.error(data.message || "Registration failed (Custom API)");
      }
    } catch (err) {
      toast.error("Error connecting to server");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const email = e?.target?.email?.value;
    const password = e?.target?.password?.value;
    const confirmPassword = e?.target?.confirmPassword?.value;
    const name = e?.target?.name?.value;

    if (password !== confirmPassword) {
      toast.error("Password did not match");
      return;
    }

    if (email && password && name) {
      // Call custom signup function
      await handleCustomSignup(name, email, password);
      // Optionally, you can keep the Firebase signup as well, or comment it out if not needed
      // await createUserWithEmailAndPassword(email, password);
      // toast.success("Registered Successfully (Firebase)");
      // await updateProfile({ displayName: name });
    }
  };
  return (
    <form
      onSubmit={handleSignUp}
      className="flex justify-center items-center min-h-screen"
    >
      <div className="flex flex-col  gap-5 w-[800px] md:m-10 bg-[#ffffff] shadow-md p-5 h-fit">
        <img className="w-28 mx-auto" src={logo} lt="" />
        <h2 className="text-center text-xl font-semibold">
          Create new Account
        </h2>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow"
            name="name"
            placeholder="Your Name"
          />
        </label>
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
            placeholder="Your Email"
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
            name="confirmPassword"
            placeholder="Confirm password"
          />
        </label>

        <p>
          <span className="text-slate-950 text-[18px]">
            Already have an account?
          </span>{" "}
          <Link className="text-blue-700 font-bold" to={"/"}>
            LogIn
          </Link>
        </p>

        <button type="submit" className="btn btn-primary text-white">
          Register
        </button>
        <div onClick={() => handleGoogleLogin()} className="btn w-full">
          <div className="flex items-center gap-2">
            <FcGoogle size={24} />
            <p>Google</p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
