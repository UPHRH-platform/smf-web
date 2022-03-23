import { APIS, APP, LANG } from "../constants";
import { authHeader } from "../helpers/authHeader";
import Notify from "./../helpers/notify";
import { UserService } from "./user.service";

export const ReviewService = {
  returnApplication,
  assignToInspection,
  getAllInspectors,
  getStatusLog,
  submitInspectionDetails,
  approveApplication,
  rejectApplication,
  consentApplication,
};

async function returnApplication(payload) {
  const requestOptions = {
    method: APP.REQUEST.POST,
    body: JSON.stringify(payload),
    headers: authHeader(),
  };
  return await fetch(
    APIS.BASE_URL + APIS.REGULATOR.RETURN_APPLICATION,
    requestOptions
  ).then(handleResponse);
}

async function assignToInspection(payload) {
  const requestOptions = {
    method: APP.REQUEST.POST,
    body: JSON.stringify(payload),
    headers: authHeader(),
  };
  return await fetch(
    APIS.BASE_URL + APIS.REGULATOR.ASSIGN_TO_INSPECTION,
    requestOptions
  ).then(handleResponse);
}

async function getAllInspectors() {
  const requestOptions = {
    method: APP.REQUEST.POST,
    body: JSON.stringify({
      active: true,
      roleId: [2093],
    }),
    headers: authHeader(),
  };
  return await fetch(APIS.BASE_URL + APIS.USER.GET_ALL_USERS, requestOptions).then(
    handleResponse
  );
}

async function getStatusLog(applicationId) {
  const requestOptions = {
    method: APP.REQUEST.GET,
    headers: authHeader(),
  };
  return await fetch(
    APIS.BASE_URL + APIS.REGULATOR.GET_STATUS_LOG + applicationId,
    requestOptions
  ).then(handleResponse);
}

async function submitInspectionDetails(payload) {
  const requestOptions = {
    method: APP.REQUEST.POST,
    body: JSON.stringify(payload),
    headers: authHeader(),
  };
  return await fetch(
    APIS.BASE_URL + APIS.INSPECTOR.SUBMIT_INSPECTION_DETAILS,
    requestOptions
  ).then(handleResponse);
}

async function approveApplication(payload) {
  const requestOptions = {
    method: APP.REQUEST.POST,
    body: JSON.stringify(payload),
    headers: authHeader(),
  };
  return await fetch(
    APIS.BASE_URL + APIS.REGULATOR.APPROVE_APPLICATION,
    requestOptions
  ).then(handleResponse);
}

async function rejectApplication(payload) {
  const requestOptions = {
    method: APP.REQUEST.POST,
    body: JSON.stringify(payload),
    headers: authHeader(),
  };
  return await fetch(
    APIS.BASE_URL + APIS.REGULATOR.REJECT_APPLICATION,
    requestOptions
  ).then(handleResponse);
}

async function consentApplication(payload) {
  const requestOptions = {
    method: APP.REQUEST.POST,
    body: JSON.stringify(payload),
    headers: authHeader(),
  };
  return await fetch(
    APIS.BASE_URL + APIS.INSPECTOR.CONSENT_APPLICATION,
    requestOptions
  ).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error =
        LANG.APIERROR ||
        (data && data.statusInfo && data.statusInfo.errorMessage) ||
        response.statusText;
      return Promise.reject(new Error(error));
    }
    if (data && data.statusInfo && data.statusInfo.statusCode) {
      if (data.statusInfo.statusCode === 306) {
        const error =
          (data && data.statusInfo && data.statusInfo.errorMessage) ||
          response.statusText;
        UserService.logout();
        Notify.error(error.message);
        window.location.reload();
        return Promise.reject(new Error(error));
      }
    }
    return data;
  });
}
