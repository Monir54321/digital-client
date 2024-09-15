// /* eslint-disable react/no-unescaped-entities */
// import { useEffect } from "react";
// import {
//   useAuthState,
//   useSignInWithEmailAndPassword,
//   useSignInWithGoogle,
// } from "react-firebase-hooks/auth";
// import { Link, useNavigate } from "react-router-dom";
// import logo from "../assets/logo.png";

// import toast from "react-hot-toast";
// import { FcGoogle } from "react-icons/fc";
// import auth from "../firebase/firebase.config";

// const LogIn = () => {
//   const { aUser } = useAuthState(auth);
//   const [signInWithEmailAndPassword, user] =
//     useSignInWithEmailAndPassword(auth);
//   const navigate = useNavigate();

//   const [signInWithGoogle, gUser] = useSignInWithGoogle(auth);

//   useEffect(() => {
//     if (user || gUser || aUser) {
//       return navigate("/dashboard");
//     }
//   }, [user, gUser, aUser, navigate]);

//   const handleGoogleLogin = () => {
//     signInWithGoogle();
//   };

//   const handleLogIn = async (e) => {
//     e.preventDefault();

//     const email = e?.target?.email?.value;
//     const password = e?.target?.password?.value;

//     if (email && password) {
//       await signInWithEmailAndPassword(email, password);
//       toast.success("Logged in successfully");
//     }

//     if (user) {
//       // toast.success("Logged in successfully");
//       navigate("/dashboard");
//     }
//   };
//   return (
//     <div className="min-h-screen m-5 md:m-10">
//       <form
//         onSubmit={handleLogIn}
//         className="flex justify-center items-center min-h-screen"
//       >
//         <div className="flex flex-col w-[800px] gap-5 md:m-10 bg-[#ffffff] shadow-md p-5 h-fit">
//           <img className="w-28 mx-auto" src={logo} alt="" />
//           <h2 className="text-center text-xl font-semibold ">Welcome back!</h2>

//           <label className="input input-bordered flex items-center gap-2">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 16 16"
//               fill="currentColor"
//               className="w-4 h-4 opacity-70"
//             >
//               <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
//               <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
//             </svg>
//             <input
//               type="text"
//               className="grow"
//               name="email"
//               placeholder="Email"
//             />
//           </label>
//           <label className="input input-bordered flex items-center gap-2">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 16 16"
//               fill="currentColor"
//               className="w-4 h-4 opacity-70"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             <input
//               type="password"
//               className="grow"
//               name="password"
//               placeholder="Password"
//             />
//           </label>
//           <p>
//             <span className="text-slate-950 text-[18px]">
//               Don't have an account?
//             </span>{" "}
//             <Link className="text-blue-700 font-bold" to={"/signup"}>
//               SignUp
//             </Link>
//           </p>

//           <button className="btn w-full  btn-primary text-white">Login</button>
//           <div onClick={() => handleGoogleLogin()} className="btn w-full">
//             <div className="flex items-center gap-2">
//               <FcGoogle size={24} />
//               <p>Google</p>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default LogIn;

/* eslint-disable react/no-unescaped-entities */
import { useEffect } from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import auth from "../firebase/firebase.config";

const LogIn = () => {
  const [aUser] = useAuthState(auth);
  const [signInWithEmailAndPassword, user] =
    useSignInWithEmailAndPassword(auth);
  const navigate = useNavigate();

  const [signInWithGoogle, gUser] = useSignInWithGoogle(auth);

  useEffect(() => {
    if (user || gUser || aUser) {
      return navigate("/dashboard");
    }
  }, [user, gUser, aUser, navigate]);

  const handleGoogleLogin = () => {
    signInWithGoogle();
  };

  const handleLogIn = async (e) => {
    e.preventDefault();

    const email = e?.target?.email?.value;
    const password = e?.target?.password?.value;

    if (email && password) {
      await signInWithEmailAndPassword(email, password);
      toast.success("Logged in successfully");
    }

    if (user) {
      // toast.success("Logged in successfully");
      navigate("/dashboard");
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
          <div onClick={() => handleGoogleLogin()} className="btn w-full">
            <div className="flex items-center gap-2">
              <FcGoogle size={24} />
              <p>Google</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
