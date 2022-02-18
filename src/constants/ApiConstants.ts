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
    SUBMIT: "forms/v1/saveFormSubmit",
    FILE_UPLOAD: "forms/fileUpload",
    GET_ALL_APPLICATIONS: "forms/getAllApplications",
    GET__APPLICATIONS_STATUS_COUNT: "forms/getApplicationsStatusCount",
    GET_APPLICATION_DETAILS: "forms/getApplicationsById?applicationId="
  },
  REGULATOR: {
    RETURN_APPLICATION: "forms/returnApplication",
    ASSIGN_TO_INSPECTION: "forms/assign",
  },
  USER: {
    GET_ROLES: 'user/getAllRoles',
    CREATE_OR_UPDATE_USER: 'user/createOrUpdate',
    GET_USER_BY_ID: 'user/getUserById',
    GET_ALL_USERS: 'user/v1/getAllUser'
  }
};
