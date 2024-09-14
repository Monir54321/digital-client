const validateInfo = (info) => {
  return info.nameBangla &&
    info.nameEnglish &&
    info.idNumber &&
    info.pinNumber &&
    info.fatherNameBangla &&
    info.motherName &&
    info.birthLocation &&
    info.location &&
    info.nidImg
    ? true
    : false;
};

export default validateInfo;
