// catch async
const catchAsync = require("../utils/catchAsync");
// jwt
const JWT = require("jsonwebtoken");
// app error
const AppError = require("./appError");
// crypto-js
const CryptoJS = require("crypto-js");
/* models */
<<<<<<< HEAD
const user_model = require("../Model/user_model");
=======
const user_model = require("../Model/vendor_model");
>>>>>>> bfda625 (okdevelopment)
// random digit
const {
  generateRandomString,
} = require("../functions/randomDigit/randomDigit_functions");
// success message
const { successMessage } = require("../functions/success/success_functions");
const signRefreshToken = (uniqueId) => {
<<<<<<< HEAD
  return JWT.sign({ uniqueId }, process.env.JWT_SEC);
=======
  return JWT.sign({ uniqueId }, process.env.JWT_SEC, {
    expiresIn: process.env.expirydateRefreshToken,
  });
>>>>>>> bfda625 (okdevelopment)
};
const signAccessToken = (id, uniqueId) => {
  return JWT.sign({ id, uniqueId }, process.env.JWT_SEC, {
    expiresIn: process.env.expirydateAccessToken,
  });
};
const generateAccessTokenRefreshToken = (userId) => {
  const uniqueId = generateRandomString(10);
  const refreshToken = signRefreshToken(uniqueId);
  const accessToken = signAccessToken(userId, uniqueId);
  return { refreshToken, accessToken };
};
// Verify token and admin
const verifyToken = (model) => async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return next(new AppError("you are not login", 400));
    }
    token = token.split(" ");
    token = token[1];
    const payload = JWT.verify(token, process.env.JWT_SEC);
    let user;
    for (let item of model) {
      user = await item.findOne({
        _id: payload.id,
      });
      if (user) {
        break;
      }
    }
    if (!user) {
      return next(new AppError("Invalid user", 401));
    }
    if (user.isBlock) {
      return next(new AppError("you are block", 401));
    }
    //console.log(user)
    const payloadunique = [];
    // Create an array of promises to verify each token
    const verifyTokenPromises = user.refreshToken.map((item) => {
      const payload = JWT.verify(item, process.env.JWT_SEC);
      payloadunique.push(payload.uniqueId);
    });

    // accessToken is Valid or not
    if (!payloadunique.includes(payload.uniqueId)) {
      return next(new AppError("Invalid Token", 401));
    }

    // Execute all promises in parallel
    await Promise.all(verifyTokenPromises);
    try {
      const verified = JWT.verify(token, process.env.JWT_SEC);
      user = { id: verified.id };
      req.user = user;
      next();
    } catch (error) {
      console.log(error);
      return next(new AppError("Invalid Token", 401));
    }
  } catch (error) {
    return next(new AppError(error, 401));
  }
};
<<<<<<< HEAD
// refreshToken
=======

// method POST
// route /api/v1/user/refresh-token:
// @desciption for  apply refreshToken to generate AccessToken
>>>>>>> bfda625 (okdevelopment)
const refreshToken = (model) =>
  catchAsync(async (req, res, next) => {
    let refreshToken = req.header("Authorization");
    if (!refreshToken) {
      return next(new AppError("you are not login", 400));
    }
    refreshToken = refreshToken.split(" ");
    refreshToken = refreshToken[1];

    // Retrieve the user from the database based on the refresh token
<<<<<<< HEAD
    let user = await model
      .findOne({ refreshToken: refreshToken })
      .select("-password -refreshToken");
    if (!user) {
      throw new Error("you are not login");
    }
    let payload = JWT.verify(refreshToken, process.env.JWT_SEC);
    const newAccessToken = signAccessToken(user._id, payload.uniqueId);
    return successMessage(202, res, "refresh token run successfully", {
      accessToken: newAccessToken,
=======
    let user = await model.findOne({ refreshToken: refreshToken });

    if (!user) {
      throw new Error("you are not login");
    }
    let { uniqueId } = JWT.verify(refreshToken, process.env.JWT_SEC);
    if (!uniqueId) {
      throw new Error("you are not login");
    }
    const { refreshToken: refreshTokenis, accessToken } =
      generateAccessTokenRefreshToken(user._id);
    user.refreshToken.push(refreshTokenis);
    await user.save();
    await user.updateOne(
      {
        refreshToken,
      },
      {
        $pull: {
          refreshToken,
        },
      }
    );

    user.refreshToken = undefined;
    user.password = undefined;

    return successMessage(202, res, "refresh token run successfully", {
      accessToken,
      refreshToken: refreshTokenis,
>>>>>>> bfda625 (okdevelopment)
      ...JSON.parse(JSON.stringify(user)),
    });
  });

// otp validation
<<<<<<< HEAD
const otpValidation = catchAsync(async (req, res, next) => {
  const { email, otp } = req.query;
  if (!email || !otp) {
    return next(new AppError("Email and OTP are required", 400));
  }

  const user = await user_model.findOne({ email });
  if (!user) {
    return next(new AppError("No user with this email", 400));
  }

  const encryptedOtp = decodeURIComponent(user.forgetPassword);

  try {
    // Decrypt the encrypted OTP
    const decrypted = CryptoJS.AES.decrypt(
      encryptedOtp,
      process.env.CRYPTO_SEC
    ).toString(CryptoJS.enc.Utf8);

    console.log("Decrypted OTP data:", decrypted); // Log decrypted data

    // Parse the decrypted data to get the OTP and expiration time
    const otpData = JSON.parse(decrypted);

    const { code, expirationTime } = otpData;

    // Check if the OTP has expired
    const currentTime = new Date().getTime();
    if (currentTime > expirationTime) {
      return next(new AppError("Verification code has expired.", 400));
    }

    // Check if the provided OTP matches the stored OTP
    if (code !== otp) {
      return next(new AppError("Invalid verification code.", 400));
    }

    return successMessage(202, res, "Correct OTP", null);
  } catch (error) {
    console.error("Error decrypting OTP:", error); // Log error for debugging
    return next(new AppError("Invalid or corrupt OTP data.", 500));
  }
});

=======
// const otpValidation = catchAsync(async (req, res, next) => {
//   const { email, otp } = req.query;
//   if (!email || !otp) {
//     return next(new AppError("Email and OTP are required", 400));
//   }

//   const user = await user_model.findOne({ email });
//   if (!user) {
//     return next(new AppError("No user with this email", 400));
//   }

//   const encryptedOtp = decodeURIComponent(user.forgetPassword);

//   try {
//     // Decrypt the encrypted OTP
//     const decrypted = CryptoJS.AES.decrypt(
//       encryptedOtp,
//       process.env.CRYPTO_SEC
//     ).toString(CryptoJS.enc.Utf8);

//     console.log("Decrypted OTP data:", decrypted); // Log decrypted data

//     // Parse the decrypted data to get the OTP and expiration time
//     const otpData = JSON.parse(decrypted);

//     const { code, expirationTime } = otpData;

//     // Check if the OTP has expired
//     const currentTime = new Date().getTime();
//     if (currentTime > expirationTime) {
//       return next(new AppError("Verification code has expired.", 400));
//     }

//     // Check if the provided OTP matches the stored OTP
//     if (code !== otp) {
//       return next(new AppError("Invalid verification code.", 400));
//     }

//     return successMessage(202, res, "Correct OTP", null);
//   } catch (error) {
//     console.error("Error decrypting OTP:", error); // Log error for debugging
//     return next(new AppError("Invalid or corrupt OTP data.", 500));
//   }
// });
>>>>>>> bfda625 (okdevelopment)

module.exports = {
  generateAccessTokenRefreshToken,
  verifyToken,
  refreshToken,
<<<<<<< HEAD
  otpValidation,
=======
  // otpValidation,
>>>>>>> bfda625 (okdevelopment)
};
