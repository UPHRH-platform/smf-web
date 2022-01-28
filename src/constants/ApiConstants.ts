export const APIS = {
  BASE_URL: process.env.SMF_BASE_URL || 'http://20.204.178.190/api/',
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
  },
};
