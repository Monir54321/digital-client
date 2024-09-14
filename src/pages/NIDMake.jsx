import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { PropagateLoader } from "react-spinners";
import writeImage from "../assets/Mack.png";
import Loading from "../components/Loading";
import config from "../config/global";
import auth from "../firebase/firebase.config";
import getBanglaDate from "../utils/bangladate";
import useManageOrderData from "../utils/getManageOrder";
import useGetPrice from "../utils/getPriceData";
import useUserData from "../utils/getUserData";
import validateInfo from "../utils/infoValidation";
import { uploadFile } from "../utils/uploadFileFromFrontend";
import NationalIDCard from "./NationalIDCard";

const NIDMake = () => {
  const { data } = useManageOrderData();
  const statusData = data?.find((item) => item.title === "সাইন কপি টু এনআইডি");
  const [isRedirect, setIsRedirect] = useState(false);
  const [pdfUploadLoading, setPdfUploadLoading] = useState(false);
  const [user, loading] = useAuthState(auth);

  const { data: userData } = useUserData(user?.email);

  const [imageLoading, setImageLoading] = useState(false);
  // const [myOrders, setMyOrders] = useState(null);

  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [responseData, setResponseData] = useState(null);

  const [imageUrls, setImageUrls] = useState({
    nidImg: "", // Fixed the closing backtick
    signatureImg: "", // Added the closing backtick
  });

  const today = getBanglaDate();

  const { price, priceLoading } = useGetPrice("nidMake");

  const [info, setInfo] = useState({
    title: "এনআইডি কার্ড",
    signatureImg: "",
    nidImg: "",
    nameBangla: "",
    nameEnglish: "",
    idNumber: "",
    pinNumber: "",
    fatherNameBangla: "",
    motherName: "",
    birthLocation: "",
    dateOfBirth: "",
    bloodGroup: null,
    location: "",
    email: user.email,
    applyDate: today,
  });

  const handleFileChange = async (event, fieldName) => {
    setImageLoading(true);
    const { files } = event.target;
    if (files?.length) {
      const file = files[0];
      const uploadFileResponse = await uploadFile(file, fieldName);
      if (uploadFileResponse?.success) {
        setImageLoading(false);
        setImageUrls((prevState) => ({
          ...prevState,
          [uploadFileResponse.fieldName]: uploadFileResponse.imageUrl,
        }));
      }
    }
  };

  const handleSignCopyUpload = async (e) => {
    e.preventDefault();
    setPdfUploadLoading(true);
    const file = e.target.files[0];
    if (!file) {
      setError("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf_file", file);

    try {
      const response = await axios.post(
        `${config.back_end_url}/upload-pdf`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResponseData(response.data);
      setPdfUploadLoading(false);
    } catch (error) {
      setError("Error uploading file.");
      console.error("Error uploading file:", error);
    }
  };

  useEffect(() => {
    if (responseData) {
      setImageUrls({
        nidImg: responseData.photo || "",
        signatureImg: responseData.sign || "",
      });

      setInfo((prevState) => ({
        ...prevState,
        nameBangla: responseData?.nameBen || prevState.nameBangla,
        birthLocation: responseData?.birth_place || prevState.birthLocation,
        dateOfBirth: responseData?.birth || prevState.dateOfBirth || null,
        bloodGroup: responseData?.blood || prevState.bloodGroup,
        location: responseData?.address || prevState.location,
        nameEnglish: responseData?.nameEng || prevState.nameEnglish,
        fatherNameBangla: responseData?.father || prevState.fatherNameBangla,
        motherName: responseData?.mother || prevState.motherName,
        idNumber: responseData?.national_id || prevState.idNumber,
        pinNumber: responseData?.pin || prevState.pinNumber,
        nidImg: responseData.photo || prevState.nidImg,
        signatureImg: responseData.sign || prevState.signatureImg,
      }));
    }
  }, [responseData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userData?.amount < price) {
      return toast.error("you don't have enough balance");
    }
    setIsLoading(true);

    const form = e.target;

    // Collect form data
    const formData = {
      nameBangla: form.nameBangla.value || info.nameBangla,
      nameEnglish: form.nameEnglish.value || info.nameEnglish,
      idNumber: form.idNumber.value || info.idNumber,
      pinNumber: form.pinNumber.value || info.pinNumber,
      fatherNameBangla: form.fatherNameBangla.value || info.fatherNameBangla,
      motherName: form.motherName.value || info.motherName,
      birthLocation: form.birthLocation.value || info.birthLocation,
      dateOfBirth: form.dateOfBirth.value || info.dateOfBirth,
      bloodGroup: form.bloodGroup.value || info.bloodGroup,
      location: form.location.value || info.location,
      nidImg: imageUrls.nidImg || info.nidImg,
      signatureImg: imageUrls.signatureImg || info.signatureImg,
    };

    setInfo((prevState) => ({
      ...prevState,
      ...formData,
    }));
    setIsRedirect(true);
    setIsLoading(false);
    // Fetch user data to check amount
  };

  if (loading || priceLoading) {
    return <Loading />;
  }

  if (isRedirect && validateInfo(info)) {
    return <NationalIDCard info={info} invokeApiTitle="nidMake" />;
  }

  return (
    <div className="w-full p-10 min-h-screen ">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="border-gray-800 border-2 border-dotted rounded-md my-5  md:w-[300px]  ">
          <label className="cursor-pointer ">
            <img
              className="w-20 h-20 md:w-28 md:h-28 mx-auto"
              width={15}
              height={15}
              src={writeImage}
              alt="Sign Copy"
            />
            <input
              className="hidden"
              accept="application/pdf"
              onChange={(e) => handleSignCopyUpload(e)}
              type="file"
              name="nidImage"
              id="nidImage"
            ></input>
            {pdfUploadLoading && (
              <div className="w-full h-full flex flex-col justify-center items-center gap-2 my-1">
                <h1 className="text-base font-semibold text-orange-700">
                  Sign Copy Uploading....
                </h1>
                <PropagateLoader />
              </div>
            )}
            <div className="label ">
              <span className="label-text text-sm text-center block w-full pb-2 px-1">
                সাইন কপি আপলোড করুন
              </span>
            </div>
          </label>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 w-full">
          <label className="">
            <div className="label">
              <span className="label-text">NID Image</span>
            </div>
            <div className=" flex items-center">
              <input
                accept="image/*"
                className="file-input file-input-bordered w-full "
                onChange={(e) => handleFileChange(e, "nidImg")}
                type="file"
                name="nidImg"
                id="nidImg"
              />
              <div
                className={`w-14 h-12 ml-4 border-2 border-gray-300 rounded ${
                  imageUrls.nidImg ? "" : "bg-white"
                }`}
              >
                {imageUrls.nidImg ? (
                  <img
                    src={responseData?.photo || imageUrls.nidImg}
                    alt="NID Preview"
                    className="object-cover w-full h-full rounded"
                  />
                ) : (
                  <span className="text-gray-400 text-sm"></span>
                )}
              </div>
            </div>
          </label>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 w-full">
          <label className="">
            <div className="label">
              <span className="label-text ">Signature</span>
            </div>

            <div className="flex items-center">
              <input
                accept="image/*"
                className="file-input file-input-bordered w-full"
                onChange={(e) => handleFileChange(e, "signatureImg")}
                type="file"
                name="signatureImg"
                id="signatureImg"
              />
              <div
                className={`w-14 h-12 ml-4 border-2 border-gray-300 rounded ${
                  imageUrls.signatureImg ? "" : "bg-white"
                }`}
              >
                {imageUrls.signatureImg ? (
                  <img
                    src={imageUrls.signatureImg}
                    alt="signature Preview"
                    className="object-cover w-full h-full rounded"
                  />
                ) : (
                  <span className="text-gray-400 text-sm"></span>
                )}
              </div>
            </div>
          </label>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 w-full">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">নামঃ (বাংলা)</span>
            </div>
            <input
              type="text"
              placeholder="নামঃ (বাংলা)"
              name="nameBangla"
              defaultValue={responseData?.nameBen}
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">নামঃ (ইংরেজী)</span>
            </div>
            <input
              type="text"
              placeholder="নামঃ (ইংরেজী)"
              name="nameEnglish"
              className="input input-bordered w-full"
              defaultValue={responseData?.nameEng}
            />
          </label>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 w-full">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">আইডি নাম্বার</span>
            </div>
            <input
              type="text"
              placeholder="আইডি নাম্বারঃ"
              name="idNumber"
              className="input input-bordered w-full"
              defaultValue={responseData?.national_id}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">পিন নাম্বার</span>
            </div>
            <input
              type="text"
              placeholder="পিন নাম্বারঃ"
              name="pinNumber"
              className="input input-bordered w-full"
              defaultValue={responseData?.pin}
            />
          </label>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 w-full">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">পিতার নাম</span>
            </div>
            <input
              type="text"
              placeholder="পিতার নাম"
              name="fatherNameBangla"
              className="input input-bordered w-full"
              defaultValue={responseData?.father}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">মাতার নাম</span>
            </div>
            <input
              type="text"
              placeholder="মাতার নাম"
              name="motherName"
              className="input input-bordered w-full"
              defaultValue={responseData?.mother}
            />
          </label>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 w-full">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">জন্ম স্থান:</span>
            </div>
            <input
              type="text"
              placeholder="জন্ম স্থান"
              name="birthLocation"
              className="input input-bordered w-full"
              defaultValue={responseData?.birth_place}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">জন্ম তারিখ</span>
            </div>
            <input
              type="text"
              placeholder="জন্ম তারিখঃ:"
              name="dateOfBirth"
              className="input input-bordered w-full"
              defaultValue={responseData?.birth}
            />
          </label>
        </div>

        <div className="grid  gap-3 md:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 w-full">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">প্রধানের তারিখঃ</span>
            </div>
            <input
              type="text"
              placeholder=""
              readOnly
              defaultValue={today}
              name="applyDate"
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">রক্তের গ্রপ</span>
            </div>
            <input
              type="text"
              placeholder="রক্তের গ্রপঃ"
              name="bloodGroup"
              className="input input-bordered w-full"
              defaultValue={responseData?.blood}
            />
          </label>
        </div>

        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">ঠিকানাঃ</span>
          </div>
          <textarea
            type="text"
            placeholder="ঠিকানা: বাসা/হোল্ডিং: (Holding), গ্রাম/রাস্তা: (গ্রাম, মৌজা), ডাকঘর: (Post Office - Postal Code), উপজেলা, সিটি কর্পোরেশন/পৌরসভা, জেলা"
            name="location"
            className="input input-bordered w-full h-24"
            defaultValue={responseData?.address}
          />
          <div className="label">
            <span className="label-text">
              Full Address: ঠিকানা: বাসা/হোল্ডিং: (Holding), গ্রাম/রাস্তা:
              (গ্রাম, মৌজা), ডাকঘর: (Post Office - Postal Code), উপজেলা, সিটি
              কর্পোরেশন/পৌরসভা, জেলা
            </span>
          </div>
        </label>
        <button
          className="btn w-full mt-4 btn-primary text-white flex justify-center items-center"
          disabled={loading || isLoading || statusData?.status === "inactive"}
        >
          {loading || isLoading ? (
            <>
              <span className="loading loading-spinner text-white bg-primary"></span>
            </>
          ) : (
            `Submit ${price} Tk`
          )}
        </button>
      </form>
    </div>
  );
};

export default NIDMake;
