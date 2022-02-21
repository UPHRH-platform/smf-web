export const APP = {
  REQUEST: {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
  },
  CODE: {
    SUCCESS: 200
  },
  ROLE: {
    INSTITUTION: "Institution",
    REGULATOR: "Regulator", // reviewer
    INSPECTOR: "Inspector",
  },
  ROUTES: {
    DASHBOARD: "/dashboard",
  },
  FILE_UPLOAD_ALLOWED_FORMATS : [
    'image/jpg', 
    'image/jpeg', 
    'image/png', 
    'application/pdf'
  ]
};
