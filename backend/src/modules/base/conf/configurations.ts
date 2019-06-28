import { Identity } from '..';
export const CONFIGURATIONS = {

  OFFSET: 0, // Default pagination ffset 
  LIMIT: 50, // Default pagination limit
  RECORD_LIMIT: 200, // Default record limit to fetch data at a time for any list

  get DEFAULT_PAGINAITON() {
    return { offset: this.OFFSET, limit: this.RECORD_LIMIT };
  },

  TWILIO_API_KEY: 'zeLbhR3KMSxa97kGpWeh6nG4QWgOGY1V',
  // TWILIO_API_KEY: 'q7Efkbb9x1Yrhph7efQRJlsqk5p55JFB',

  USER_TYPES: [
    { code: 'customer', value: 1 },
    { code: 'service-provider', value: 2 }
  ],

  USER_STATUS: {
    INACTIVE: 0,
    ACTIVE: 1,
    DISABLE: 2
  },

  connection: null,
  /**
   * Holds the data of user to be used in backend application anywhere.
   * 
   */
  identity: <Identity>{},

  SECRET: 'eis_secret',

  // TODO:high: following is not a proper way for public urls.
  PUBLIC_URLS: [
    '/users/login'
  ]

};
