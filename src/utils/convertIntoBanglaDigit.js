// Function to convert English digits to Bangla digits
function convertToBanglaDigits(number) {
    const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return number.replace(/\d/g, (digit) => banglaDigits[digit]);
  }
  
  // Function to check if the number is in English and convert it if necessary
  function checkAndConvertPostalCode(postalCode) {
    const isEnglish = /^[0-9]+$/.test(postalCode); // Check if the postal code contains only English digits
  
    if (isEnglish) {
      return convertToBanglaDigits(postalCode); // Convert to Bangla if it's in English
    }
  
    return postalCode; // Return as is if it's already in Bangla
  }
  
  export default checkAndConvertPostalCode;