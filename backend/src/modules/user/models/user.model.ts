import { BaseModel, Helper, ErrorHandler, CONFIGURATIONS } from '../../base';
import { IUserModel } from './interfaces/IUserModel';
import * as  Authy from 'authy';

import { database, Utils } from './../';

export class UserModel extends BaseModel {

  constructor() {
    super('User');
  }

  public register(user) {
    return new Promise((resolve, reject) => {

      return this.validateUserForRegistration(user).then(() => {
        let userType = CONFIGURATIONS.USER_TYPES.find(item => item.code === user.type);
        if (userType) user.userTypeId = userType.value;
        else user.userTypeId = 1;

        const authyClient = Authy(CONFIGURATIONS.TWILIO_API_KEY);
        return authyClient.phones().verification_start(user.phoneNumber, user.countryCode, (authyErr, authyRes) => {
          if (authyErr) resolve({ error: true, status: 430, message: authyErr });

          if (authyRes) {

            user.twilioUUID = authyRes.uuid;
            return Helper.encrypt(user.password).then(hashedPassword => {
              user.password = hashedPassword;


              return this.create(user).then(userRes => {

                resolve({ success: true, status: 200, message: 'User has been created successfully', twilioUUID: userRes.twilioUUID });

              }).catch(error => {

                reject(error);

              });
            });
          }
        });


      }).catch(error => {

        resolve(error);

      });

    });

  }

  public verifyPhoneNumber(data: any) {
    return new Promise((resolve, reject) => {
      return this.validateDataForPhoneVerification(data).then(() => {

        const attributes = ['id', 'phoneNumber', 'countryCode'];
        const conditions = { twilioUUID: data.twilioUUID };
        return this.findByCondition(attributes, conditions).then(user => {

          if (user) {
            const authyClient = Authy(CONFIGURATIONS.TWILIO_API_KEY);
            authyClient.phones().verification_check(user.phoneNumber, user.countryCode, data.twilioOTP, (authyErr, authyRes) => {
              if (authyErr) resolve({ error: true, status: 430, message: authyErr });

              if (authyRes) {
                console.log('authyRes: ', authyRes);
                const userToUpdate = { status: CONFIGURATIONS.USER_STATUS.ACTIVE, twilioUUID: null };
                this.update(user.id, userToUpdate).then(() => {

                  resolve({ success: true, status: 200, message: 'Phone number has been verified successfully' });

                }).catch(error => {

                  reject(error);

                });

              }

            });

          } else {
            resolve(ErrorHandler.invalidTwilioUUID);
          }

        }).catch(error => {

          reject(error);

        });

      }).catch(error => {

        resolve(error);

      });

    })
  }

  public resendOTP(data: any) {
    return new Promise((resolve, reject) => {
      return this.validateDataForPhoneVerification(data).then(() => {

        const attributes = ['id', 'phoneNumber', 'countryCode'];
        const conditions = { twilioUUID: data.twilioUUID };
        return this.findByCondition(attributes, conditions).then(user => {

          if (user) {
            const authyClient = Authy(CONFIGURATIONS.TWILIO_API_KEY);
            authyClient.phones().verification_check(user.phoneNumber, user.countryCode, data.twilioOTP, (authyErr, authyRes) => {
              if (authyErr) resolve({ error: true, status: 430, message: authyErr });

              if (authyRes) {
                console.log('authyRes: ', authyRes);
                const userToUpdate = { status: CONFIGURATIONS.USER_STATUS.ACTIVE, twilioUUID: null };
                this.update(user.id, userToUpdate).then(() => {

                  resolve({ success: true, status: 200, message: 'Phone number has been verified successfully' });

                }).catch(error => {

                  reject(error);

                });

              }

            });

          } else {
            resolve(ErrorHandler.invalidTwilioUUID);
          }

        }).catch(error => {

          reject(error);

        });

      }).catch(error => {

        resolve(error);

      });

    });
  }

  public signup(user) {
    user.name = `${user.firstName} ${user.lastName}`;

    return new Promise((resolve, reject) => {
      if (!user.firstName || !user.lastName || !user.email)
        return resolve(ErrorHandler.attributeMissing);

      return this.findByCondition(['id', 'email'], { email: user.email, registered: 1 }).then(userRes => {
        if (userRes) return resolve(ErrorHandler.accountExists);
        else {

          let userToCreate = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            fidoBufferID: new Utils().randomBase64URLBuffer(),
            registered: 0,
            authenticators: '',
            userTypeId: 1, // test values to pass null check
            password: 'adminTest',
            countryCode: 'adminTest',
            phoneNumber: 'adminTest',
            gender: 'adminTest',
            dateOfBirth: 'adminTest'
          };

          return this.create(userToCreate).then(createdUser => {

            // database[user.email] = {
            //   'name': user.name,
            //   'registered': false,
            //   'id': new Utils().randomBase64URLBuffer(),
            //   'authenticators': []
            // };

            let challengeMakeCred = new Utils().generateServerMakeCredRequest(user.email,
              user.name, createdUser.fidoBufferID);
            // user.name, database[user.email].id);


            challengeMakeCred['status'] = 'ok'; // as per following example, should be removed
            return resolve(challengeMakeCred);


          }).catch(error => {

            return reject(error);

          });

        }
      }).catch(error => {

        return reject(error);

      });

    });

  }

  public fido2Login(user) {

    return new Promise((resolve, reject) => {
      if (!user.email)
        return resolve(ErrorHandler.attributeEmailMissing);

      return this.findByCondition(['id', 'email', 'authenticators'], { email: user.email, registered: 1 }).then(userRes => {
        if (!userRes) return resolve(ErrorHandler.invalidUser);
        else {

          let authenticators = [JSON.parse(userRes.authenticators)];
          // console.log('authenticators: ', authenticators);

          let getAssertion = new Utils().generateServerGetAssertion(authenticators);
          console.log('getAssertion: ', getAssertion);

          getAssertion['status'] = 'ok'; // as per following example, should be removed
          return resolve(getAssertion);

        }
      }).catch(error => {

        return reject(error);

      });

    });

  }

  public verifyFido2Resp(formData) {
    return new Promise((resolve, reject) => {

      if (!formData || !formData.id
        || !formData.rawId || !formData.response
        || !formData.type || formData.type !== 'public-key') {
        return resolve(ErrorHandler.fido2AuthAttrMissing);
      }

    })
  }

  /**
   * Validate user to login and return user
   * 
   * @param item 
   */
  public login(item: IUserModel) {

    const attributes = ['id', 'phoneNumber', 'email', 'password', 'status'];
    let condition: any = {};

    if (!isNaN(item.identity)) {
      if (item.identity.toString().length > 10) item.identity = item.identity.substring(1);

      condition.phoneNumber = item.identity;

    } else condition.email = item.identity;

    return super.findByCondition(attributes, condition).then(res => {

      if (res) {
        if (res.status == CONFIGURATIONS.USER_STATUS.ACTIVE) {

          let userRes = <IUserModel>res;

          return Helper.verifyPassword(item.password, userRes.password).then(match => {

            if (match) {

              delete userRes.password;
              delete userRes.status;
              return { success: true, status: 200, message: 'User has been logged in successfully', data: userRes };

            } else {
              return ErrorHandler.invalidLogin;
            }
          });

        } else {
          return ErrorHandler.inactiveAccount;
        }

      } else {

        return ErrorHandler.invalidLogin;

      }
    });
  }

  private validateUserForRegistration(user) {
    return new Promise((resolve, reject) => {
      let invalidUser: boolean = false;

      let error = ErrorHandler.validationError;
      error.message = [];

      if (!user.firstName) {
        invalidUser = true;
        error.message.push('First Name is required');
      }
      if (!user.lastName) {
        invalidUser = true;
        error.message.push('Last Name is required');
      }
      if (!user.type) {
        invalidUser = true;
        error.message.push('User Type is required');
      }
      //  else if (user.type !== 'customer' || user.type !== 'service-provider') {
      //   invalidUser = true;
      //   error.message.push('Invalid User Type value');
      // }
      if (!user.email) {
        invalidUser = true;
        error.message.push('Email is required');
      }
      if (!user.password) {
        invalidUser = true;
        error.message.push('Password is required');
      }
      if (!user.countryCode) {
        invalidUser = true;
        error.message.push('Country Code is required');
      } else if (isNaN(user.countryCode)) {
        invalidUser = true;
        error.message.push('Invalid country code, must be only numbers');
      }
      if (!user.phoneNumber) {
        invalidUser = true;
        error.message.push('Phone Number is required');
      } else if (isNaN(user.phoneNumber) || user.phoneNumber.toString().length != 10) {
        invalidUser = true;
        error.message.push('Invalid phone number, must be only numbers with 10 digits');
      }
      if (!user.gender) {
        invalidUser = true;
        error.message.push('Gender is required');
      }
      // else if (user.gender && (user.gender !== 'male' || user.gender !== 'female' || user.gender !== 'other')) {
      //   invalidUser = true;
      //   error.message.push('Invalid Gender value');
      // }
      if (!user.dateOfBirth) {
        invalidUser = true;
        error.message.push('Date of birth is required');
      }

      if (invalidUser) reject(error);
      else {
        return this.findByCondition(['id'], { phoneNumber: user.phoneNumber }).then(user => {
          if (user) {
            invalidUser = true;
            error.message.push('This phone number is already exists. Please try with a different phone number')
            return reject(error);
          } else resolve();
        });

      }

    });
  }

  private validateDataForPhoneVerification(data) {
    return new Promise((resolve, reject) => {
      let invalidItem: boolean = false;

      let error = ErrorHandler.validationError;
      error.message = [];

      if (!data.twilioOTP) {
        invalidItem = true;
        error.message.push('OTP is required');
      }
      if (!data.twilioUUID) {
        invalidItem = true;
        error.message.push('UUID is required');
      }

      if (invalidItem) reject(error);
      else resolve();

    });
  }

}
