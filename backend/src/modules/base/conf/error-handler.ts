export class ErrorHandler {
  //   static noRoleAssigned = { error: true, status: 404, message: 'No role has been assigned to you yet.', code: 102 };
  //   static noAccountExist = { error: true, status: 404, message: 'Account does not exist.', code: 103 };
  //   static notPermitted = { error: true, status: 403, message: 'You are not authorized for this action.', code: 105 };
  //   static missingRequiredHeader = { error: true, status: 400, message: 'A required HTTP header was not specified.', code: 107 };
  //   static missingRequiredQueryParameter = { error: true, status: 400, message: 'A required query parameter was not specified for this request.', code: 108 };
  //   static invalidEmail = { error: true, status: 400, message: 'The given email address is not valid.', code: 109 };
  //   static invalidPassword = { error: true, status: 400, message: 'The given password is not valid.', code: 110 };
  //   static passwordNotMatched = { error: true, status: 400, message: 'Invalid current password.', code: 111 };
  //   static authenticationFail = { error: true, status: 400, message: 'The given email or password is not valid.', code: 112 };
  //   static unAuthorized = { error: true, status: 401, message: 'You are not authorized to access this.', code: 113 };
  //   static forbidden = { error: true, status: 403, message: 'You are forbidden to access this.', code: 114 };
  //   static accountIsDisabled = { error: true, status: 403, message: 'The specified account is disabled.', code: 115 };
  //   static resourceAlreadyExists = { error: true, status: 409, message: 'The specified resource already exists.', code: 117 };
  //   static notFound = { error: true, status: 404, message: 'The specified resource does not exist.', code: 118 };
  //   static inActiveUser = { error: true, status: 403, message: 'The specified user is Inactive.', code: 119 };
  //   static invalidFileType = { error: true, status: 400, message: 'This file type is not valid.', code: 121 };
  //   static invalidFileSize = { error: true, status: 403, message: 'File size is invalid.', code: 122 };
  //   static duplicateEmail = { error: true, status: 403, message: "Provided email already exists in our system, Please try a different one.", code: 123 }
  //   static duplicateEntry = { error: true, status: 400, message: "Duplicate record Error.", code: 124 }
  //   static childrenExists = { error: true, status: 400, message: "This record has children.", code: 125, data: {} };

  static attributeMissing = { error: true, status: 400, message: 'First Name, Last Name or email is missing.', code: 101 };
  static attributeEmailMissing = { error: true, status: 400, message: 'User email is missing.', code: 101 };
  static fido2AuthAttrMissing = { error: true, status: 400, message: 'Response missing one or more of id/rawId/response/type fields, or type is not public-key!', code: 101 };
  static fido2InvalidKeyRes = { error: true, status: 400, message: 'Can not determine type of key response!', code: 101 };
  static fido2InvalidSignature = { error: true, status: 400, message: 'Can not authenticate signature!', code: 101 };
  static accountExists = { error: true, status: 409, message: 'Email already exists.', code: 116 };
  static invalidLogin = { error: true, status: 400, message: 'Invalid username or password.', code: 101 };
  static invalidUser = { error: true, status: 400, message: 'Invalid user, not registered.', code: 101 };
  static inactiveAccount = { error: true, status: 400, message: 'This account seems to be inactive.', code: 101 };
  static invalidToken = { error: true, status: 400, message: 'Invalid token or token has been expired.', code: 104 };
  static internalServerError = { error: true, status: 500, message: 'The server encountered an internal error. Please retry the request.', code: 120 };
  static invalidSearchParams = { error: true, status: 400, message: "Specify a search param to proceed.", code: 100, data: {} };
  static exceededRecordLimit = { error: true, status: 400, message: "Exceeded record limit, You can only get 200 records at a time, Please specify limit between 1-200.", code: 100, data: {} };
  static recordNotFound = { error: true, status: 404, message: 'Record not found.', code: 106 };
  static validationError = { error: true, status: 400, message: [], code: 106 };
  static invalidPhoneNumber = { error: true, status: 400, message: 'Kindly provide a valid phone number to proceed', code: 106 };
  static invalidTwilioUUID = { error: true, status: 400, message: 'Invalid Twilio UUID or the user has been already verified', code: 106 };

  static sendCustomError(err, res) {
    console.log(`Custom Error: ${err}`);
    return res.status(err['status']).send(err);
  }

  static sendServerError(err, res, next) {
    console.log(`Server Error: ${JSON.stringify(err)}`);
    return res.status(ErrorHandler.internalServerError.status).send(ErrorHandler.internalServerError);
  }

  static sendAuthorizationError(err, res, next) {
    return res.status(err.status).send(err);
  }

  // static sendFileSizeError(err, res, next) {
  //   return res.status(ErrorHandler.invalidFileSize.status).send(ErrorHandler.invalidFileSize);
  // }
  // static sendFileTypeError(err, res, next) {
  //   return res.status(ErrorHandler.invalidFileType.status).send(ErrorHandler.invalidFileType);
  // }
}
