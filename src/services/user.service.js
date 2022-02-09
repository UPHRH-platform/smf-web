import { APP, LANG, APIS } from "./../constants";
import { authHeader, authHeaderWithBearer } from "../helpers/authHeader";
import Notify from "../helpers/notify";

export const UserService = {
  login,
  logout,
  getOTP,
  getRoles,
  createOrUpdateUser,
  getUserByID,
  getAllUsers,
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

function getRoles(email) {
  const requestOptions = {
    method: APP.REQUEST.GET,
    headers: authHeaderWithBearer(),
  };
  return fetch(APIS.BASE_URL + APIS.USER.GET_ROLES, requestOptions).then(
    handleResponse
  );
}

function createOrUpdateUser(user) {
  const requestOptions = {
    method: APP.REQUEST.POST,
    headers: authHeaderWithBearer(),
    body: JSON.stringify(user)
  };
  return fetch(APIS.BASE_URL + APIS.USER.CREATE_OR_UPDATE_USER, requestOptions).then(
    handleResponse
  );
}

function getUserByID(id) {
  const requestOptions = {
    method: APP.REQUEST.GET,
    headers: authHeaderWithBearer(),
  };
  return fetch(`${APIS.BASE_URL}${APIS.USER.GET_USER_BY_ID}?id=${id}`, requestOptions).then(
    handleResponse
  );
}

function getAllUsers() {
  const requestOptions = {
    method: APP.REQUEST.POST,
    headers: authHeaderWithBearer(),
    body: JSON.stringify({})
  };
  return fetch(APIS.BASE_URL + APIS.USER.GET_ALL_USERS, requestOptions).then(
    handleResponse
  );
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
    if(data && data.statusInfo && data.statusInfo.statusCode) {
      if(data.statusInfo.statusCode === 306) {
        const error =
        (data && data.statusInfo && data.statusInfo.errorMessage) || response.statusText;
        logout()
        Notify.error(error.message)
        window.location.reload()
        return Promise.reject(new Error(error));
      }
    }
    return data;
  });
}
