const CryptoJS = require("crypto-js");

function generateSixDigitNumber() {
  const min = 100000; // Smallest 6-digit number
  const max = 999999; // Largest 6-digit number
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateOtp() {
  const otp = generateSixDigitNumber();
  const expirationTime = new Date().getTime() + 5 * 60 * 1000; // 5 minutes expiration
  return { otp, expirationTime };
}

function isOtpExpired(expirationTime) {
  const currentTime = new Date().getTime();
  return currentTime > expirationTime;
}

// Generate OTP
const { otp, expirationTime } = generateOtp();
<<<<<<< HEAD
<<<<<<< HEAD
console.log(
  `Generated OTP: ${otp}, Expiration Time: ${new Date(
    expirationTime
  ).toLocaleTimeString()}`
);
=======
=======
>>>>>>> bfda625c472e51baf8558974c2dfd6f936ad5ef5
// console.log(
//   `Generated OTP: ${otp}, Expiration Time: ${new Date(
//     expirationTime
//   ).toLocaleTimeString()}`
// );
<<<<<<< HEAD
>>>>>>> bfda625 (okdevelopment)
=======
>>>>>>> bfda625c472e51baf8558974c2dfd6f936ad5ef5

function encryptOtp(otpData, secret) {
  return CryptoJS.AES.encrypt(JSON.stringify(otpData), secret).toString();
}
function decryptOtp(encryptedData, secret) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secret);
  return bytes.toString(CryptoJS.enc.Utf8);
}
// Check if OTP is expired after some time
setTimeout(() => {
  if (isOtpExpired(expirationTime)) {
<<<<<<< HEAD
<<<<<<< HEAD
    console.log("OTP has expired.");
=======
    // console.log("OTP has expired.");
>>>>>>> bfda625 (okdevelopment)
=======
    // console.log("OTP has expired.");
>>>>>>> bfda625c472e51baf8558974c2dfd6f936ad5ef5
  } else {
    console.log("OTP is still valid.");
  }
}, 6 * 60 * 1000); // Check after 6 minutes

// Export the functions
module.exports = {
  generateSixDigitNumber,
  generateOtp,
  isOtpExpired,
  encryptOtp,
  decryptOtp,
};
