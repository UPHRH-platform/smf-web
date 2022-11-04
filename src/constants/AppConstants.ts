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
    SUPER_ADMIN: "Super Admin",
  },
  ROLE_LABEL: { //Update ROLE object with correct label once Inspector and assistant inspector is changes to Medical and Non-Medical assessor and assistant inspector role is removed
    INSTITUTION: "Institute",
    REGULATOR: "Admin", // reviewer
    INSPECTOR: "Assessor",
    SUPER_ADMIN: "Super Admin",
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
