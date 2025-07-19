import mapLogo from "../assets/map-logo.jpg";
import flowerLogo from "../assets/flower-logo.png";
import mackImg from "../assets/Mack.png";
import signImg from "../assets/sign.png";
import duddronImg from "../assets/duddron.png";

const Nid1016575092 = () => (
  <div
    style={{ background: "#fff", minHeight: "100vh", padding: 0, margin: 0 }}
    onContextMenu={(e) => e.preventDefault()}
  >
    <main className="w-full">
      <div>
        <main className="w-full">
          <div
            className="container w-full py-12 lg:flex lg:items-start"
            style={{ paddingTop: 0 }}
          >
            <div className="w-full lg:pl-6">
              <div className="flex items-center justify-center">
                <div className="w-full">
                  <div
                    className="flex items-start gap-x-2 bg-transparent mx-auto w-fit"
                    id="nid_wrapper"
                    style={{ transform: "scale(1)", marginTop: 10 }}
                  >
                    <div
                      id="nid_front"
                      className="w-full border-[1.999px] border-black"
                    >
                      <header className="px-1.5 flex items-start gap-x-2 justify-between relative">
                        <img
                          className="w-[38px] absolute top-1.5 left-[4.5px]"
                          src={mapLogo}
                          alt="map logo"
                        />
                        <div className="w-full h-[60px] flex flex-col justify-center">
                          <h3
                            style={{ fontSize: 20 }}
                            className="text-center font-medium tracking-normal pl-11 bn leading-5"
                          >
                            <span
                              style={{ marginTop: 1, display: "inline-block" }}
                            >
                              গণপ্রজাতন্ত্রী বাংলাদেশ সরকার
                            </span>
                          </h3>
                          <p
                            className="text-[#007700] text-right tracking-[-0rem] leading-3"
                            style={{
                              fontSize: 11.46,
                              fontFamily: "arial",
                              marginBottom: -0.02,
                            }}
                          >
                            Government of the People&apos;s Republic of
                            Bangladesh
                          </p>
                          <p
                            className="text-center font-medium pl-10 leading-4"
                            style={{ paddingTop: 0 }}
                          >
                            <span
                              className="text-[#ff0002]"
                              style={{ fontSize: 10, fontFamily: "arial" }}
                            >
                              National ID Card
                            </span>
                            <span
                              style={{
                                marginLeft: -2,
                                fontSize: 13,
                                fontFamily: "arial",
                              }}
                            >
                              /
                            </span>
                            <span
                              className="bn ml-1"
                              style={{ marginLeft: -2, fontSize: 13.33 }}
                            >
                              জাতীয় পরিচয় পত্র
                            </span>
                          </p>
                        </div>
                      </header>
                      <div
                        className="w-[101%] -ml-[0.5%] border-b-[1.9999px] border-black"
                        style={{ width: "100%", marginLeft: 0 }}
                      ></div>
                      <div className="pt-[3.8px] pr-1 pl-[2px] bg-center w-full flex justify-between gap-x-2 pb-5 relative">
                        <div className="absolute inset-x-0 top-[2px] mx-auto z-10 flex items-start justify-center">
                          <img
                            style={{
                              background: "transparent",
                              width: 116,
                              height: 116,
                              marginLeft: 15,
                            }}
                            className="ml-[20px] w-[125px] h-[116px]"
                            src={flowerLogo}
                            alt="flower logo"
                          />
                        </div>
                        <div className="relative z-50">
                          <img
                            style={{ marginTop: -2 }}
                            id="userPhoto"
                            className="w-[68.2px] h-[78px]"
                            alt="user"
                            src={mackImg}
                          />
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: 68,
                            }}
                            className="signeture"
                          >
                            <img
                              style={{
                                marginTop: 3,
                                width: "100%",
                                maxHeight: 42,
                              }}
                              src={signImg}
                              alt="sign"
                            />
                          </span>
                        </div>
                        <div className="w-full relative z-50">
                          <div style={{ height: 5 }}></div>
                          <div
                            className="flex flex-col gap-y-[10px]"
                            style={{ marginTop: 1 }}
                          >
                            <div>
                              <p
                                className="space-x-4 leading-3"
                                style={{ paddingLeft: 1 }}
                              >
                                <span
                                  className="bn"
                                  style={{ fontSize: 16.53 }}
                                >
                                  নাম:
                                </span>
                                <span
                                  className=""
                                  style={{
                                    fontSize: 16.6,
                                    paddingLeft: 3,
                                    WebkitTextStroke: "0.4px black",
                                  }}
                                  id="nameBn"
                                >
                                  মোছাঃ জাহানারা বেগম
                                </span>
                              </p>
                            </div>
                            <div style={{ marginTop: 1 }}>
                              <p
                                className="space-x-2 leading-3"
                                style={{
                                  marginBottom: -1.4,
                                  marginTop: 1.4,
                                  paddingLeft: 1,
                                }}
                              >
                                <span style={{ fontSize: 10 }}>Name: </span>
                                <span
                                  style={{ fontSize: 12.73, paddingLeft: 1 }}
                                  id="nameEn"
                                >
                                  Mst Jahanara Begum
                                </span>
                              </p>
                            </div>
                            <div style={{ marginTop: 1 }}>
                              <p
                                className="bn space-x-3 leading-3"
                                style={{ paddingLeft: 1 }}
                              >
                                <span
                                  id="fatherOrHusband"
                                  style={{ fontSize: 14 }}
                                >
                                  পিতা:{" "}
                                </span>
                                <span
                                  style={{
                                    fontSize: 14,
                                    transform: "scaleX(0.724)",
                                  }}
                                  id="card_father_name"
                                >
                                  মোঃ আব্দুল লতিব
                                </span>
                              </p>
                            </div>
                            <div style={{ marginTop: 1 }}>
                              <p
                                className="bn space-x-3 leading-3"
                                style={{ marginTop: -2.5, paddingLeft: 1 }}
                              >
                                <span style={{ fontSize: 14 }}>মাতা: </span>
                                <span
                                  style={{
                                    fontSize: 14,
                                    transform: "scaleX(0.724)",
                                  }}
                                  id="card_mother_name"
                                >
                                  মোছাঃ মেহের নেছা
                                </span>
                              </p>
                            </div>
                            <div
                              className="leading-4"
                              style={{ fontSize: 12, marginTop: -1.2 }}
                            >
                              <p style={{ marginTop: -2 }}>
                                <span>Date of Birth: </span>
                                <span
                                  id="card_date_of_birth"
                                  className="text-[#ff0000]"
                                  style={{ marginLeft: -1 }}
                                >
                                  01 Jan 1983
                                </span>
                              </p>
                            </div>
                            <div
                              className="-mt-0.5 leading-4"
                              style={{ fontSize: 12, marginTop: -5 }}
                            >
                              <p style={{ marginTop: -2 }}>
                                <span>ID NO: </span>
                                <span
                                  className="text-[#ff0000] font-bold"
                                  id="card_nid_no"
                                >
                                  1016575092
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      id="nid_back"
                      className="w-full border-[1.999px] border-[#000]"
                    >
                      <header className="h-[32px] flex items-center px-2 tracking-wide text-left">
                        <p
                          className="bn"
                          style={{
                            lineHeight: "13px",
                            fontSize: 11.33,
                            letterSpacing: 0.05,
                            marginBottom: 0,
                          }}
                        >
                          এই কার্ডটি গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের সম্পত্তি।
                          কার্ডটি ব্যবহারকারী ব্যতীত অন্য কোথাও পাওয়া গেলে
                          নিকটস্থ পোস্ট অফিসে জমা দেবার জন্য অনুরোধ করা হলো।
                        </p>
                      </header>
                      <div
                        className="w-[101%] -ml-[0.5%] border-b-[1.999px] border-black"
                        style={{ width: "100%", marginLeft: 0 }}
                      ></div>
                      <div
                        className="px-1 pt-[3px] h-[66px] grid grid-cols-12 relative"
                        style={{ fontSize: 12 }}
                      >
                        <div
                          className="col-span-1 bn px-1 leading-[11px]"
                          style={{ fontSize: 11.73, letterSpacing: -0.12 }}
                        >
                          ঠিকানা:
                        </div>
                        <div
                          className="col-span-11 px-2 text-left bn leading-[11px]"
                          id="card_address"
                          style={{ fontSize: 11.73, letterSpacing: -0.14 }}
                        >
                          বাসা/হোল্ডিং: -, গ্রাম/রাস্তা: মাইজখলা, মাইজখলা,
                          ডাকঘর: দোয়ারাবাজার - ৩০৭০, দোয়ারাবাজার, সুনামগঞ্জ
                        </div>
                        <div className="col-span-12 mt-auto flex justify-between">
                          <p
                            className="bn flex items-center font-medium"
                            style={{ marginBottom: -5, paddingLeft: 0 }}
                          >
                            <span style={{ fontSize: 11.6 }}>রক্তের গ্রুপ</span>
                            <span
                              style={{
                                display: "inline-block",
                                marginLeft: 3,
                                marginRight: 3,
                              }}
                            >
                              <span>
                                <span
                                  style={{
                                    display: "inline-block",
                                    fontSize: 11,
                                    fontFamily: "arial",
                                    marginTop: 2,
                                    marginBottom: 3,
                                  }}
                                >
                                  /
                                </span>
                              </span>
                            </span>
                            <span style={{ fontSize: 9 }}>Blood Group:</span>
                            <b
                              style={{
                                fontSize: 9.33,
                                marginBottom: -1.7,
                                display: "inline-block",
                              }}
                              className="text-[#ff0000] mx-1 font-bold sans w-5"
                              id="card_blood"
                            ></b>
                            <span style={{ fontSize: 10.66 }}>
                              {" "}
                              জন্মস্থান:{" "}
                            </span>
                            <span
                              className="ml-1"
                              id="card_birth_place"
                              style={{ fontSize: 10.66 }}
                            >
                              সুনামগঞ্জ
                            </span>
                          </p>
                          <div
                            className="text-gray-100 absolute -bottom-[2px] w-[30.5px] h-[13px] -right-[2px] overflow-hidden"
                            style={{ marginRight: 1, marginBottom: 1 }}
                          >
                            <img src={duddronImg} alt="duddron" />
                            <span
                              className="hidden absolute inset-0 m-auto bn items-center text-[#fff] z-50"
                              style={{ fontSize: 10.66 }}
                            >
                              <span className="pl-[0.2px]">মূদ্রণ:</span>
                              <span className="block ml-[3px]">০১</span>
                            </span>
                            <div className="hidden w-full h-full absolute inset-0 m-auto border-[20px] border-black z-30"></div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="w-[101%] -ml-[0.5%] border-b-[1.999px] border-black"
                        style={{ width: "100%", marginLeft: 0 }}
                      ></div>
                      <div className="py-1 pl-2 pr-1">
                        <img
                          className="w-[78px] ml-[18px] -mb-[3px]"
                          style={{ marginBottom: 3, height: 27.3 }}
                          src={signImg}
                          alt="sign"
                        />
                        <div className="flex justify-between items-center -mt-[5px]">
                          <p className="bn" style={{ fontSize: 14 }}>
                            প্রদানকারী কর্তৃপক্ষের স্বাক্ষর
                          </p>
                          <span
                            className="pr-4 bn"
                            style={{ fontSize: 12, paddingTop: 1 }}
                          >
                            প্রদানের তারিখ:{" "}
                            <span
                              style={{ marginLeft: 5 }}
                              className="ml-2.5"
                              id="card_date"
                            >
                              ১৫/০২/২০২৫
                            </span>
                          </span>
                        </div>
                        <div
                          id="barcode"
                          className="w-full h-[39px] mt-1"
                          alt="NID Card Generator"
                          style={{
                            marginTop: 1.5,
                            height: 42,
                            marginLeft: -3,
                            width: "101.5%",
                          }}
                        >
                          {/* Barcode would be rendered here by JS in the original HTML */}
                          <canvas
                            width="418"
                            height="216"
                            style={{ width: "100%", height: "100%" }}
                          ></canvas>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <footer></footer>
        </main>
        <div className="Toastify"></div>
      </div>
    </main>
  </div>
);

export default Nid1016575092;
