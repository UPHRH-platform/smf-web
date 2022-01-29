import { APP, LANG, APIS } from "./../constants";
import { authHeader } from "../helpers/authHeader";

export const UserService = {
  login,
  logout,
  getOTP,
};

function login(username, otp) {
  const requestOptions = {
    method: APP.REQUEST.POST,
    headers: authHeader(),
    body: JSON.stringify({ username, otp })
  };

  // return fetch(process.env.REACT_APP_LOGIN_API_URL, requestOptions).then(
  //   handleResponse
  // );
  return fetch(APIS.BASE_URL + APIS.LOGIN.USERLOGIN, requestOptions).then(
    handleResponse
  );
}

function getOTP(email) {
  const requestOptions = {
    method: APP.REQUEST.POST,
    headers: authHeader(),
    body: JSON.stringify({ username: email })
  };
  return fetch(APIS.BASE_URL + APIS.LOGIN.REQUEST_OTP, requestOptions).then(
    handleResponse
  );
}

function logout() {
  localStorage.clear();
  localStorage.removeItem("user");
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        logout();
        // location.reload(true);
      }
      const error =
        LANG.APIERROR || (data && data.message) || response.statusText; //Ignoring server side error and using end user readable message
      return Promise.reject(new Error(error));
    }
    return data;
  });
}
