import React from "react";
import ReactDOM from "react-dom/client";
import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/ErrorPage.jsx";
import "./index.css";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import PrivateAdminRoute from "./layouts/PrivateAdminRoute.jsx";
import PrivateRoute from "./layouts/PrivateRoute.jsx";
import BikashInfo from "./pages/BikashInfo.jsx";
import BikashPinReset from "./pages/BikashPinReset.jsx";
import Biometric from "./pages/Biometric.jsx";
import BirthCertificateFix from "./pages/BirthCertificateFix.jsx";
import BirthCertificateOnline from "./pages/BirthCertificateOnline.jsx";
import BkashError from "./pages/BkashError.jsx";
import BkashSuccess from "./pages/BkashSuccess.jsx";
import CallListAllSim from "./pages/CallListAllSim.jsx";
import FileList from "./pages/FileList.jsx";
import LocationTrack from "./pages/LocationTrack.jsx";
import LogIn from "./pages/Login.jsx";
import ManageOrderButton from "./pages/ManageOrderButton.jsx";
import ManageUsers from "./pages/ManageUsers.jsx";
import NameAddressLostId from "./pages/NameAddressLostId.jsx";
import NIDMake from "./pages/NIDMake.jsx";
import NIDOrder from "./pages/NIDOrder.jsx";
import NogodInfo from "./pages/NogodInfo.jsx";
import Orders from "./pages/Orders.jsx";
import PriceList from "./pages/PriceList.jsx";
import Recharge from "./pages/Recharge.jsx";
import SaftyTika from "./pages/SaftyTika.jsx";
import ServerCopy from "./pages/ServerCopy.jsx";
import ServerCopyResult from "./pages/ServerCopyResult.jsx";
import ServerCopyToNID from "./pages/ServerCopyToNID.jsx";
import SignCopy from "./pages/SignCopy.jsx";
import SignUp from "./pages/SignUp.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <LogIn />,
      },
      {
        path: "/error",
        element: <BkashError />,
      },
      {
        path: "/success",
        element: <BkashSuccess />,
      },
      {
        path: "/servercopyresult",
        element: <ServerCopyResult />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/payment-success",
        element: (
          <div>
            <h2 className="text-3xl text-center">Payment Success</h2>
            <Link
              className="text-xl text-center mx-auto w-full block mt-4 text-blue-600"
              to={"/dashboard"}
            >
              Dashboard
            </Link>
          </div>
        ),
      },
      {
        path: "/payment-fail",
        element: (
          <div>
            <h2 className="text-3xl text-center">Payment Failed</h2>
            <Link
              className="text-xl text-center mx-auto w-full block text-blue-600"
              to={"/dashboard"}
            >
              {" "}
              Dashboard
            </Link>
          </div>
        ),
      },
    ],
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard/orders",
        element: (
          <PrivateAdminRoute>
            <Orders />
          </PrivateAdminRoute>
        ),
      },
      {
        path: "/dashboard/manageUsers",
        element: (
          <PrivateAdminRoute>
            <ManageUsers />
          </PrivateAdminRoute>
        ),
      },
      {
        path: "/dashboard/priceList",
        element: (
          <PrivateAdminRoute>
            <PriceList />
          </PrivateAdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-order-button",
        element: (
          <PrivateAdminRoute>
            <ManageOrderButton />
          </PrivateAdminRoute>
        ),
      },
      {
        path: "/dashboard/",
        element: (
          <PrivateRoute>
            <NIDMake />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/nidMake",
        element: (
          <PrivateRoute>
            <NIDMake />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/filelist",
        element: (
          <PrivateRoute>
            <FileList />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/servercopy",
        element: (
          <PrivateRoute>
            <ServerCopy />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/servercopytonidmake",
        element: (
          <PrivateRoute>
            <ServerCopyToNID />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/biometric",
        element: (
          <PrivateRoute>
            <Biometric />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/locationTrack",
        element: (
          <PrivateRoute>
            <LocationTrack />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/nidCard",
        element: (
          <PrivateRoute>
            <NIDOrder />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/recharge",
        element: (
          <PrivateRoute>
            <Recharge />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/bikashpinreset",
        element: (
          <PrivateRoute>
            <BikashPinReset />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/nogodinfo",
        element: (
          <PrivateRoute>
            <NogodInfo />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/bikashinfo",
        element: (
          <PrivateRoute>
            <BikashInfo />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/nameaddress",
        element: (
          <PrivateRoute>
            <NameAddressLostId />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/birthcertificateFix",
        element: (
          <PrivateRoute>
            <BirthCertificateFix />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/calllistsim",
        element: (
          <PrivateRoute>
            <CallListAllSim />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/signCopy",
        element: (
          <PrivateRoute>
            <SignCopy />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/saftytika",
        element: (
          <PrivateRoute>
            <SaftyTika />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/birthcertificateonline",
        element: (
          <PrivateRoute>
            <BirthCertificateOnline />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
