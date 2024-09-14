import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaBars, FaUserCircle } from "react-icons/fa";

import { Link } from "react-router-dom";
import config from "../config/global";
import auth from "../firebase/firebase.config";
import Loading from "./Loading";

const Navbar = () => {
  const [user, loading] = useAuthState(auth);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch(`${config.back_end_url}/users/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data?.data);
      });
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-between items-center bg-gray-100 px-4 py-2 shadow-md print:hidden">
      <div className="flex items-center">
        <label htmlFor="my-drawer-2" className="cursor-pointer lg:hidden">
          <FaBars className="w-6 h-6 text-blue-700" />
        </label>
      </div>

      <div className="dropdown dropdown-left flex items-center gap-4 print:hidden">
        <p className="text-lg font-bold p-2 text-white bg-blue-500 rounded-lg">
          {userData?.amount}
        </p>
        <div tabIndex={0} role="button" className="avatar">
          <div className="w-12 h-12">
            {/* <img
              className=" shadow-md rounded-full"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            /> */}
            <FaUserCircle className=" shadow-md rounded-full   w-10 h-10 mt-1" />
          </div>
        </div>

        <ul
          tabIndex={0}
          className="dropdown-content menu text-white rounded-[10px] w-40 p-2 bg-gray-800 shadow z-10"
        >
          <li>
            <a>Profile</a>
          </li>
          <li>
            <a>Settings</a>
          </li>
          <li onClick={() => signOut(auth)}>
            <Link to={"/"}>Log Out</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
