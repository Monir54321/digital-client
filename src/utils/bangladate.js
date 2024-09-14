// utils/dateUtils.js
function convertToBengali(num) {
    const banglaNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().split('').map(n => banglaNumbers[n]).join('');
}

function addLeadingZero(num) {
    return num < 10 ? `0${num}` : num.toString();
}

function getBanglaDate() {
    const today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    const year = today.getFullYear();

    // Add leading zero if day or month is single digit
    day = addLeadingZero(day);
    month = addLeadingZero(month);

    const banglaDay = convertToBengali(day);
    const banglaMonth = convertToBengali(month);
    const banglaYear = convertToBengali(year);

    return `${banglaDay}/${banglaMonth}/${banglaYear}`;
}

export default getBanglaDate;
