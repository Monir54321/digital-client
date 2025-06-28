import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import {
  FaAddressCard,
  FaFingerprint,
  FaMoneyCheckAlt,
  FaPhoneAlt,
  FaRegAddressCard,
  FaSearchengin,
  FaUserEdit,
  FaWhatsapp,
} from "react-icons/fa";
import { FaFilePen } from "react-icons/fa6";
import { IoMdCard } from "react-icons/io";
import { MdAddLocationAlt } from "react-icons/md";
import { PiFilesFill } from "react-icons/pi";
import { Link, Outlet, Navigate } from "react-router-dom";
import bikashIcon from "../assets/bikash_icon.png";
import logo from "../assets/logo.png";
import nogodIcon from "../assets/nogod_icon.png";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import config from "../config/global";
import useLocalAuth from "../utils/useLocalAuth";

const DashboardLayout = () => {
  const { user, loading: authLoading } = useLocalAuth();
  const [userData, setUserData] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      const token = localStorage.getItem("login_token");
      if (token) {
        // Fetch user data from backend using the token
        fetch(`${config.back_end_url}/users/${user.email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setUserData(data?.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [user]);

  if (authLoading || loading) {
    return <Loading />;
  }

  // If no token, redirect to login
  const token = localStorage.getItem("login_token");
  if (!token) {
    return <Navigate to="/" replace />;
  }

  const handleLinkClick = () => {
    setDrawerOpen(false);
  };

  return (
    <div>
      <div className={`drawer lg:drawer-open ${drawerOpen ? "open" : ""}`}>
        <input
          id="my-drawer-2"
          type="checkbox"
          className="drawer-toggle"
          checked={drawerOpen}
          onChange={() => setDrawerOpen(!drawerOpen)}
        />
        <div className="drawer-content flex flex-col">
          <div className="print:hidden">
            <Navbar />
          </div>
          <Outlet />
        </div>
        <div className="drawer-side z-30">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
            onClick={() => setDrawerOpen(false)}
          ></label>
          <ul className="menu bg-[#F8FAFC] text-black shadow-md  border-r-4 min-h-full w-[260px] md:w-[280px]">
            {/* Sidebar content here */}
            <Link className="" to={"/dashboard"}>
              <img className="h-[80px] md:h-[130px]" src={logo} alt="" />
            </Link>
            {userData?.role === "master" && (
              <li className="mt-2 text-[15px] font-sans text-gray-500">
                <Link to={"/dashboard/orders"} onClick={handleLinkClick}>
                  <FaMoneyCheckAlt width={16} height={16} />
                  Orders
                </Link>
              </li>
            )}
            {userData?.role === "master" && (
              <li className="mt-2 text-[15px] font-sans text-gray-500">
                <Link to={"/dashboard/manageUsers"} onClick={handleLinkClick}>
                  <FaUserEdit width={16} height={16} />
                  Manage Users
                </Link>
              </li>
            )}
            {userData?.role === "master" && (
              <li className="mt-2 text-[15px] font-sans text-gray-500">
                <Link to={"/dashboard/priceList"} onClick={handleLinkClick}>
                  <FaMoneyCheckAlt width={16} height={16} />
                  Update Price List
                </Link>
              </li>
            )}
            {userData?.role === "master" && (
              <li className="mt-2 text-[15px] font-sans text-gray-500">
                <Link
                  to={"/dashboard/manage-order-button"}
                  onClick={handleLinkClick}
                >
                  <FaMoneyCheckAlt width={16} height={16} />
                  Manage Order Button
                </Link>
              </li>
            )}
            <li className="mt-2 text-[15px] font-sans text-gray-500">
              <Link to={"/dashboard/nidMake"} onClick={handleLinkClick}>
                <FaAddressCard width={16} height={16} />
                সাইন কপি টু এনআইডি
              </Link>
            </li>
            <li className="mt-2 text-[15px] font-sans text-gray-500">
              <Link to={"/dashboard/signCopy"} onClick={handleLinkClick}>
                <FaFilePen width={16} height={16} />
                সাইন কপি
              </Link>
            </li>
            <li className="mt-2 text-[15px] font-sans text-gray-500">
              <Link to={"/dashboard/nidCard"} onClick={handleLinkClick}>
                <FaRegAddressCard width={16} height={16} />
                এনআইডি কার্ড
              </Link>
            </li>
            <li className="mt-2 text-[15px] font-sans text-gray-500">
              <Link to={"/dashboard/servercopy"} onClick={handleLinkClick}>
                <FaRegAddressCard width={16} height={16} />
                সার্ভার কপি
              </Link>
            </li>
            <li className="mt-2 text-[15px] font-sans text-gray-500">
              <Link
                to={"/dashboard/servercopy-channel-two"}
                onClick={handleLinkClick}
              >
                <FaRegAddressCard width={16} height={16} />
                সার্ভার কপি channel 2
              </Link>
            </li>

            <li className="mt-2 w-full text-[15px] font-sans text-gray-500">
              <Link
                to={"/dashboard/servercopytonidmake"}
                onClick={handleLinkClick}
              >
                <FaRegAddressCard width={16} height={16} />
                অটো এনআইডি
              </Link>
            </li>
            <li className="mt-2 text-[15px] font-sans text-gray-500">
              <Link to={"/dashboard/biometric"} onClick={handleLinkClick}>
                <FaFingerprint width={16} height={16} />
                বায়োমেট্রিক
              </Link>
            </li>
            <li className="mt-2 text-[15px] font-sans text-gray-500">
              <Link to={"/dashboard/locationTrack"} onClick={handleLinkClick}>
                <MdAddLocationAlt width={16} height={16} />
                লোকেশন ট্র্যাক
              </Link>
            </li>
            <li className="mt-2 text-[15px] font-sans text-gray-500">
              <Link to={"/dashboard/calllistsim"} onClick={handleLinkClick}>
                <FaPhoneAlt width={16} height={16} />
                কল লিস্ট অল সিম
              </Link>
            </li>
            <li className="mt-2 text-[15px] font-sans text-gray-500">
              <Link to={"/dashboard/bikashinfo"} onClick={handleLinkClick}>
                <img src={bikashIcon} className="w-5 h-5" />
                বিকাশ ইনফো
              </Link>
            </li>
            <li className="mt-2 text-[15px] font-sans text-gray-500">
              <Link to={"/dashboard/nogodinfo"} onClick={handleLinkClick}>
                <img src={nogodIcon} className="w-5 h-5" />
                নগদ ইনফো
              </Link>
            </li>
            <li className="mt-2 text-[15px] font-sans text-gray-500">
              <Link to={"/dashboard/nameaddress"} onClick={handleLinkClick}>
                <FaSearchengin width={16} height={16} />
                নাম ঠিকনা (হারানো আইডি)
              </Link>
            </li>
            <li className="mt-2 text-[15px] font-sans text-gray-500">
              <Link to={"/dashboard/filelist"} onClick={handleLinkClick}>
                <PiFilesFill width={16} height={16} />
                ফাইল লিস্ট
              </Link>
            </li>
            <li className="mt-2 text-[15px] font-sans text-gray-500">
              <Link to={"/dashboard/recharge"} onClick={handleLinkClick}>
                <IoMdCard width={16} height={16} />
                রিচার্জ
              </Link>
            </li>
            <li className="mt-2 text-[15px] font-sans text-gray-500">
              <a
                href="https://chat.whatsapp.com/L7aVoQFgKXxAeSBbTj0ful"
                target="_blank"
              >
                <FaWhatsapp width={16} height={16} />
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default DashboardLayout;
