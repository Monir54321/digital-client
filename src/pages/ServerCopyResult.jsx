/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import config from "../config/global";
import auth from "../firebase/firebase.config";
import "./ServerCopyResult.css";

const ServerCopyResult = ({ nidData }) => {
  const nidInformation = nidData || {};

  console.log("nidInformation", nidInformation);

  const {
    nameBangla: name, // Renaming nameBangla to name
    nameEnglish: nameEn, // Renaming nameEnglish to nameEn
    spouseName: spouse,
    occupation, // Renaming spouseName to spouse
    gender,
    bloodGroup,
    dateOfBirth,
    fatherName: father, // Renaming fatherName to father
    motherName: mother, // Renaming motherName to mother
    pin,
    nationalId,
    religion,
    voterNumber: voter_no, // Renaming voterNumber to voter_no
    voterSlNo: sl_no, // Renaming voterSlNo to sl_no
    voterAreaCode,
    photo,
    permanentDivision: division, // Renaming permanentDivision to division
    permanentDistrict: district, // Renaming permanentDistrict to district
    permanentUpozila: upozila, // Renaming permanentUpozila to upozila
    permanentUnionOrWard: unionOrWard, // Renaming permanentUnionOrWard to unionOrWard
    permanentPostOffice: postOffice, // Renaming permanentPostOffice to postOffice
    permanentPostalCode: postalCode, // Renaming permanentPostalCode to postalCode
    permanentAdditionalMouzaOrMoholla: additionalMouzaOrMoholla, // Renaming permanentAdditionalMouzaOrMoholla to additionalMouzaOrMoholla
    permanentAdditionalVillageOrRoad: additionalVillageOrRoad, // Renaming permanentAdditionalVillageOrRoad to additionalVillageOrRoad
    permanentHomeOrHoldingNo: homeOrHoldingNo, // Renaming permanentHomeOrHoldingNo to homeOrHoldingNo
    permanentRegion: region, // Renaming permanentRegion to region
    presentDivision: presentDivision, // Mapping present address fields
    presentDistrict: presentDistrict,
    presentUpozila: presentUpozila,
    presentUnionOrWard: presentUnionOrWard,
    presentPostOffice: presentPostOffice,
    presentPostalCode: presentPostalCode,
    presentAdditionalMouzaOrMoholla: presentAdditionalMouzaOrMoholla,
    presentAdditionalVillageOrRoad: presentAdditionalVillageOrRoad,
    presentHomeOrHoldingNo: presentHomeOrHoldingNo,
    presentRegion: presentRegion,
    presentVillageOrRoad,
    presentMouzaOrMoholla,
    presentWardForUnionPorishod,
    permanentVillageOrRoad,
    permanentMouzaOrMoholla,
  } = nidInformation;

  // Now you can create the fullAddress fields if needed

  const permanentFullAddress = `${
    homeOrHoldingNo ? `বাসা/হোল্ডিং: ${homeOrHoldingNo},` : ""
  } 
${additionalVillageOrRoad ? `গ্রাম/রাস্তা: ${additionalVillageOrRoad},` : ""} 
${additionalMouzaOrMoholla ? `মৌজা/মহল্লা: ${additionalMouzaOrMoholla},` : ""} 
${unionOrWard ? `ইউনিয়ন/ওয়ার্ড: ${unionOrWard},` : ""} 
${postOffice ? `পোস্ট অফিস: ${postOffice},` : ""} 
${postalCode ? `পোস্ট কোড: ${postalCode},` : ""} 
${upozila ? `উপজেলা: ${upozila},` : ""} 
${district ? `জেলা: ${district},` : ""} 
${division ? `বিভাগ: ${division}` : ""}`;

  //   const permanentFullAddress = `${
  //     homeOrHoldingNo ? `বাসা/হোল্ডিং: ${homeOrHoldingNo},` : ""
  //   }
  // ${permanentVillageOrRoad ? `গ্রাম/রাস্তা: ${permanentVillageOrRoad},` : ""}
  // ${permanentMouzaOrMoholla ? `মৌজা/মহল্লা: ${permanentMouzaOrMoholla},` : ""}
  // ${unionOrWard ? `ইউনিয়ন/ওয়ার্ড: ${unionOrWard},` : ""}
  // ${postOffice ? `পোস্ট অফিস: ${postOffice},` : ""}
  // ${postalCode ? `পোস্ট কোড: ${postalCode},` : ""}
  // ${upozila ? `উপজেলা: ${upozila},` : ""}
  // ${district ? `জেলা: ${district},` : ""}
  // ${division ? `বিভাগ: ${division}` : ""}`;

  const presentFullAddress = `${
    presentHomeOrHoldingNo ? `বাসা/হোল্ডিং: ${presentHomeOrHoldingNo},` : ""
  } 
${
  presentAdditionalVillageOrRoad
    ? `গ্রাম/রাস্তা: ${presentAdditionalVillageOrRoad},`
    : ""
} 
${
  presentAdditionalMouzaOrMoholla
    ? `মৌজা/মহল্লা: ${presentAdditionalMouzaOrMoholla},`
    : ""
} 
${
  presentUnionOrWard
    ? `ইউনিয়ন/ওয়ার্ড: ${presentUnionOrWard}-${presentWardForUnionPorishod},`
    : ""
} 
${presentPostOffice ? `পোস্ট অফিস: ${presentPostOffice},` : ""} 
${presentPostalCode ? `পোস্ট কোড: ${presentPostalCode},` : ""} 
${presentUpozila ? `উপজেলা: ${presentUpozila},` : ""} 
${presentDistrict ? `জেলা: ${presentDistrict},` : ""} 
${presentDivision ? `বিভাগ: ${presentDivision}` : ""}`;

  const [user] = useAuthState(auth);

  const [price, setPrice] = useState(0);

  const [qrImage, setQrImage] = useState("");

  useEffect(() => {
    const generateQRCode = () => {
      QRCode.toDataURL(`${nationalId} ${dateOfBirth} ${nameEn}`)
        .then((url) => {
          setQrImage(url);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    generateQRCode(); // Call the QR code generation function
  }, [nationalId, dateOfBirth, nameEn]);

  useEffect(() => {
    fetch(`${config.back_end_url}/priceList/668f76383906559fe7ff631c`)
      .then((response) => response.json())
      .then((pData) => {
        setPrice(parseFloat(pData?.data?.serverCopy));
      });
  }, []);

  useEffect(() => {
    const checkAndSubmitData = async () => {
      try {
        if (price && nidData) {
          const userResponse = await fetch(
            `${config.back_end_url}/users/${user?.email}`
          );
          const userData = await userResponse.json();

          if (userData?.data?.amount < price) {
            return toast.error("You don't have enough money to purchase");
          } else if (userData?.data?.amount >= price) {
            const serverCopyResponse = await fetch(
              `${config.back_end_url}/serverCopys/`,
              {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  title: "সার্ভার কপি",
                  email: user?.email,
                }),
              }
            );

            const serverCopyData = await serverCopyResponse.json();
          }
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
        console.error("Error:", error);
      }
    };

    checkAndSubmitData(); // Call the function within the useEffect
  }, [price, nidData, user?.email]); // Add relevant dependencies

  useEffect(() => {
    if (nidData && qrImage && nationalId) {
      const originalTitle = document.title;
      document.title = `Server Copy - ${nationalId}`;

      // Use requestAnimationFrame to ensure the title is updated before printing
      setTimeout(() => {
        window.print();
        document.title = originalTitle;
      }, 500);
    }
  }, [nidData, qrImage, nationalId]);

  return (
    <div className="print:-mt-20 print:scale-100">
      <div className="background">
        <div style={{ position: "relative" }}>
          <img
            className="crane"
            src="https://servarcopyhd.xyz/images/cbimagex1.png"
            alt="Crane"
            height="1500px"
            width="1070px"
          />
          <div
            style={{
              position: "absolute",
              left: "30%",
              top: "8%",
              fontSize: "16px",
              color: "rgb(255, 224, 0)",
            }}
          >
            <b>National Identity Registration Wing (NIDW)</b>
          </div>
          <div
            style={{
              position: "absolute",
              left: "37%",
              top: "11%",
              fontSize: "14px",
              color: "rgb(255, 47, 161)",
            }}
          >
            <b>Select Your Search Category</b>
          </div>
          <div
            style={{
              position: "absolute",
              left: "45%",
              top: "12.8%",
              fontSize: "12px",
              color: "rgb(8, 121, 4)",
            }}
          >
            Search By NID / Voter No.
          </div>
          <div
            style={{
              position: "absolute",
              left: "45%",
              top: "14.3%",
              fontSize: "12px",
              color: "rgb(7, 119, 184)",
            }}
          >
            Search By Form No.
          </div>
          <div
            style={{
              position: "absolute",
              left: "30%",
              top: "16.9%",
              fontSize: "12px",
              color: "rgb(252, 0, 0)",
            }}
          >
            <b>NID or Voter No*</b>
          </div>
          <div
            style={{
              position: "absolute",
              left: "45%",
              top: "16.9%",
              fontSize: "12px",
              color: "rgb(143, 143, 143)",
            }}
          >
            NID
          </div>
          <div
            style={{
              position: "absolute",
              left: "63.7%",
              top: "17.3%",
              fontSize: "11px",
              color: "#ffffff",
            }}
          >
            Submit
          </div>
          <div
            style={{
              position: "absolute",
              left: "89.6%",
              top: "11.75%",
              fontSize: "11px",
              color: "#ffffff",
            }}
          >
            Home
          </div>
          <div
            style={{
              position: "absolute",
              left: "37%",
              top: "27.3%",
              fontSize: "18px",
              color: "rgb(7, 7, 7)",
            }}
          >
            <b>জাতীয় পরিচিতি তথ্য</b>
          </div>
          <div
            style={{
              position: "absolute",
              left: "37%",
              top: "30.0%",
              fontSize: "18px",
              color: "rgb(7, 7, 7)",
            }}
          >
            জাতীয় পরিচয় পত্র নম্বর
          </div>
        </div>

        <div
          id="nid_no"
          style={{
            position: "absolute",
            left: "55%",
            top: "30.2%",
            fontSize: "16px",
            color: "rgb(7, 7, 7)",
          }}
        >
          {nationalId}
        </div>

        <div
          style={{
            position: "absolute",
            left: "37%",
            top: "32.8%",
            fontSize: "18px",
            color: "rgb(7, 7, 7)",
          }}
        >
          পিন নম্বর
        </div>

        <div
          id="nid_father"
          style={{
            position: "absolute",
            left: "55%",
            top: "32.8%",
            width: "auto",
            fontSize: "16px",
            color: "rgb(7, 7, 7)",
          }}
        >
          {pin}
        </div>

        <div
          style={{
            position: "absolute",
            left: "37%",
            top: "35.4%",
            fontSize: "18px",
            color: "rgb(7, 7, 7)",
          }}
        >
          ভোটার নম্বর
        </div>
        <div
          id="nid_mother"
          style={{
            position: "absolute",
            left: "55%",
            top: "35.4%",
            fontSize: "18px",
            color: "rgb(7, 7, 7)",
          }}
        >
          {voter_no}
        </div>
        <div
          style={{
            position: "absolute",
            left: "37%",
            top: "38.1%",
            fontSize: "18px",
            color: "rgb(7, 7, 7)",
          }}
        >
          সিরিয়াল নম্বর
        </div>
        <div
          id="spouse"
          style={{
            position: "absolute",
            left: "55%",
            top: "38.1%",
            fontSize: "16px",
            color: "rgb(7, 7, 7)",
          }}
        >
          {sl_no}
        </div>
        <div
          style={{
            position: "absolute",
            left: "37%",
            top: "40.7%",
            fontSize: "18px",
            color: "rgb(7, 7, 7)",
          }}
        >
          {/* ভোটার অঞ্চল */}
          জন্মস্থান
        </div>
        <div
          id="voter_area"
          style={{
            position: "absolute",
            left: "55%",
            top: "40.7%",
            fontSize: "18px",
            color: "rgb(7, 7, 7)",
          }}
        >
          {presentDistrict}
        </div>
        <div
          style={{
            position: "absolute",
            left: "37%",
            top: "43.5%",
            fontSize: "18px",
            color: "rgb(7, 7, 7)",
          }}
        >
          <b>ব্যক্তিগত তথ্য</b>
        </div>
        <div
          style={{
            position: "absolute",
            left: "37%",
            top: "46.3%",
            fontSize: "18px",
            color: "rgb(7, 7, 7)",
            marginTop: "1px",
          }}
        >
          নাম (বাংলা)
        </div>
        <div
          id="name_bn"
          style={{
            position: "absolute",
            fontWeight: "bold",
            left: "55%",
            top: "46.3%",
            fontSize: "18px",
            color: "rgb(7, 7, 7)",
          }}
        >
          {name}
        </div>
        <div
          style={{
            position: "absolute",
            left: "37%",
            top: "48.9%",
            fontSize: "18px",
            color: "rgb(7, 7, 7)",
          }}
        >
          নাম (ইংরেজি)
        </div>

        <div
          id="name_en"
          style={{
            position: "absolute",
            left: "55%",
            top: "48.9%",
            fontSize: "16px",
            color: "rgb(7, 7, 7)",
          }}
        >
          {nameEn}
        </div>
        <div
          style={{
            position: "absolute",
            left: "37%",
            top: "51.6%",
            fontSize: "18px",
            color: "rgb(7, 7, 7)",
          }}
        >
          জন্ম তারিখ
        </div>
        <div
          id="dob"
          style={{
            position: "absolute",
            left: "55%",
            top: "51.6%",
            fontSize: "16px",
            color: "rgb(7, 7, 7)",
          }}
        >
          {dateOfBirth}
        </div>
        <div
          style={{
            position: "absolute",
            left: "37%",
            top: "54.3%",
            fontSize: "18px",
            color: "rgb(7, 7, 7)",
          }}
        >
          পিতার নাম
        </div>
        <div
          id="fathers_name"
          style={{
            position: "absolute",
            left: "55%",
            top: "54.3%",
            fontSize: "18px",
            color: "rgb(7, 7, 7)",
          }}
        >
          {father}
        </div>
        <div
          style={{
            position: "absolute",
            left: "37%",
            top: "57.0%",
            fontSize: "18px",
            color: "rgb(7, 7, 7)",
          }}
        >
          মাতার নাম
        </div>
        <div
          id="mothers_name"
          style={{
            position: "absolute",
            left: "55%",
            top: "57.0%",
            fontSize: "18px",
            color: "rgb(7, 7, 7)",
          }}
        >
          {mother}
        </div>
        <div
          style={{
            position: "absolute",
            left: "37%",
            top: "59.7%",
            fontSize: "18px",
            color: "rgb(7, 7, 7)",
          }}
        >
          স্বামী/স্ত্রীর নাম
        </div>
        <div
          id="blood"
          style={{
            position: "absolute",
            left: "55%",
            top: "59.7%",
            fontSize: "18px",
            color: "black",
          }}
        >
          {spouse || ""}
        </div>
        <div
          style={{
            position: "absolute",
            left: "37%",
            top: "62.5%",
            fontSize: "18px",
            color: "rgb(7, 7, 7)",
          }}
        >
          <b>অন্যান্য তথ্য</b>
        </div>
        <div
          style={{
            position: "absolute",
            left: "37%",
            top: "65.5%",
            fontSize: "18px",
            color: "rgb(7, 7, 7)",
          }}
        >
          লিঙ্গ
        </div>
        <div
          id="gender"
          style={{
            position: "absolute",
            left: "55%",
            top: "65.4%",
            fontSize: "18px",
            color: "rgb(7, 7, 7)",
          }}
        >
          {gender}
        </div>
        <div
          style={{
            position: "absolute",
            left: "37%",
            top: "68.2%",
            fontSize: "18px",
            color: "rgb(7, 7, 7)",
          }}
        >
          পেশা
        </div>
        <div
          id="mobile_no"
          style={{
            position: "absolute",
            left: "55%",
            top: "68.2%",
            fontSize: "16px",
            color: "rgb(7, 7, 7)",
          }}
        >
          {occupation}
        </div>
        {bloodGroup ? (
          <>
            <div
              style={{
                position: "absolute",
                left: "37%",
                top: "70.9%",
                fontSize: "18px",
                color: "rgb(7, 7, 7)",
              }}
            >
              রক্তের গ্রুপ
            </div>
            <div
              id="blood_grp"
              style={{
                position: "absolute",
                left: "55%",
                top: "70.9%",
                fontSize: "18px",
                color: "red",
              }}
            >
              {bloodGroup}
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                position: "absolute",
                left: "37%",
                top: "70.9%",
                fontSize: "18px",
                color: "rgb(7, 7, 7)",
              }}
            >
              ভোটার এরিয়া কোড
            </div>
            <div
              id="blood_grp"
              style={{
                position: "absolute",
                left: "55%",
                top: "70.9%",
                fontSize: "18px",
                color: "rgb(7, 7, 7)",
              }}
            >
              {voterAreaCode}
            </div>
          </>
        )}
        <div
          style={{
            position: "absolute",
            left: "37%",
            top: "73.5%",
            fontSize: "18px",
            color: "rgb(7, 7, 7)",
          }}
        >
          {/* জন্মস্থান */}
          ধর্ম
        </div>
        <div
          id="birth_place"
          style={{
            position: "absolute",
            left: "55%",
            top: "73.5%",
            fontSize: "16px",
            color: "rgb(7, 7, 7)",
          }}
        >
          {religion || "Islam"}
        </div>

        <div
          style={{
            position: "absolute",
            left: "37%",
            top: "76.3%",
            width: "auto",
            fontSize: "18px",
            color: "rgb(7, 7, 7)",
          }}
        >
          <b>বর্তমান ঠিকানা</b>
        </div>
        <div
          id="present_addr"
          style={{
            position: "absolute",
            left: "37%",
            top: "78.6%",
            width: "48%",
            fontSize: "16px",
            color: "rgb(7, 7, 7)",
          }}
        >
          {presentFullAddress}
        </div>

        <div
          style={{
            position: "absolute",
            left: "37%",
            top: "85.3%",
            width: "auto",
            fontSize: "18px",
            color: "rgb(7, 7, 7)",
          }}
        >
          <b>স্থায়ী ঠিকানা</b>
        </div>

        <div
          id="permanent_addr"
          style={{
            position: "absolute",
            left: "37%",
            top: "87.6%",
            width: "48%",
            fontSize: "16px",
            color: "rgb(7, 7, 7)",
          }}
        >
          {permanentFullAddress}
        </div>

        <div
          style={{
            position: "absolute",
            top: "93.5%",
            width: "100%",
            textAlign: "center",
            fontSize: "14px",
            color: "rgb(255, 0, 0)",
          }}
        >
          উপরে প্রদর্শিত তথ্যসমূহ জাতীয় পরিচয়পত্র সংশ্লিষ্ট, ভোটার তালিকার সাথে
          সরাসরি সম্পর্কযুক্ত নয়।
        </div>
        <div
          style={{
            position: "absolute",
            top: "95%",
            width: "100%",
            fontSize: "16px",
            textAlign: "center",
            color: "rgb(3, 3, 3)",
          }}
        >
          This is Software Generated Report From Bangladesh Election Commission,
          Signature & Seal Aren't Required.
        </div>

        <div
          style={{
            position: "absolute",
            left: "19%",
            top: "25.7%",
            width: "auto",
            fontSize: "12px",
            color: "rgb(3, 3, 3)",
          }}
        >
          <img
            id="photo"
            src={photo}
            // height="140px"
            // width="1px"
            style={{ borderRadius: "10px", width: "125px", height: "140px" }}
            alt="NID Image"
            // className='w-full'
          />
        </div>

        <div
          style={{
            position: "absolute",
            // left: "21%",
            left: "20.2%",
            top: "38.5%",
            width: "auto",
            fontSize: "12px",
            color: "rgb(3, 3, 3)",
          }}
        >
          <img
            src={qrImage}
            style={{ height: "135px", width: "170px", marginLeft: "-25px" }}
            alt="QR Code"
          />
        </div>

        <div
          id="name_en2"
          style={{
            position: "absolute",
            fontWeight: "bold",
            left: "17%",
            top: "36.1%",
            height: "32px",
            width: "161px",
            fontSize: "13px",
            color: "rgb(7, 7, 7)",
            margin: 0,
            padding: 0,
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <b>{nameEn}</b>
        </div>
      </div>
    </div>
  );
};

export default ServerCopyResult;
