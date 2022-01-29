export const APIS = {
  BASE_URL: process.env.SMF_BASE_URL || 'https://smfdev.idc.tarento.com/api/',
  LOGIN: {
    USERLOGIN: "signIn",
    REQUEST_OTP: "user/requestOTP",
    
  },
  FORM: {
    GET: "forms/getAllForms",
    FIND: "forms/getFormById?id=",
    ADD: "forms/createForm",
    UPDATE: "",
    DELETE: "",
    SUBMIT: "forms/v1/saveFormSubmit'",
  },
};
