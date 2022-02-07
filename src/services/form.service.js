import { APIS, APP, LANG } from "../constants";
import { authHeader, authHeaderForUpload } from "../helpers/authHeader";
import Notify from "./../helpers/notify";
import { UserService } from "./user.service";

export const FormService = {
  get,
  find,
  add,
  update,
  remove,
  submit,
  getAllApplications,
  findApplication,
  uploadfile
};

function get() {
  const requestOptions = {
    method: APP.REQUEST.GET,
    headers: authHeader(),
  };
  return fetch(APIS.BASE_URL + APIS.FORM.GET, requestOptions).then(
    handleResponse
  );
}

function find(formId) {
  const requestOptions = {
    method: APP.REQUEST.GET,
    headers: authHeader(),
  };
  return fetch(APIS.BASE_URL + APIS.FORM.FIND + formId, requestOptions).then(
    handleResponse
  );
}

function add(form) {
  const requestOptions = {
    method: APP.REQUEST.POST,
    body: JSON.stringify(form),
    headers: authHeader(),
  };
  return fetch(APIS.BASE_URL + APIS.FORM.ADD, requestOptions).then(
    handleResponse
  );
}

function update(form) {
  const requestOptions = {
    method: APP.REQUEST.POST,
    body: JSON.stringify(form),
    headers: authHeader(),
  };
  return fetch(APIS.BASE_URL + APIS.FORM.UPDATE, requestOptions).then(
    handleResponse
  );
}

function remove(form) {
  const requestOptions = {
    method: APP.REQUEST.POST,
    body: JSON.stringify(form),
    headers: authHeader(),
  };
  return fetch(APIS.BASE_URL + APIS.FORM.DELETE, requestOptions).then(
    handleResponse
  );
}

function submit(form) {
  const requestOptions = {
    method: APP.REQUEST.POST,
    body: JSON.stringify(form),
    headers: authHeader(),
  };
  return fetch(APIS.BASE_URL + APIS.FORM.SUBMIT, requestOptions).then(
    handleResponse
  );
}

function getAllApplications(data) {
  const requestOptions = {
    method: APP.REQUEST.POST,
    body: JSON.stringify(data),
    headers: authHeader(),
  };
  return fetch(
    APIS.BASE_URL + APIS.FORM.GET_ALL_APPLICATIONS,
    requestOptions
  ).then(handleResponse);
}

function findApplication(applicationId) {
  const requestOptions = {
    method: APP.REQUEST.GET,
    headers: authHeader(),
  };
  return fetch(
    APIS.BASE_URL + APIS.FORM.GET_APPLICATION_DETAILS + applicationId,
    requestOptions
  ).then(handleResponse);
}

function uploadfile(form) {
  const requestOptions = {
    method: APP.REQUEST.POST,
    body: form,
    headers: {
        ...authHeaderForUpload(),
        // 'Accept': 'application/json',
        // 'Content-Type': 'multipart/form-data'
    },
  };
  return fetch(APIS.BASE_URL  + APIS.FORM.FILE_UPLOAD,
    requestOptions,
  ).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error =
        LANG.APIERROR || (data && data.statusInfo && data.statusInfo.errorMessage) || response.statusText;
      return Promise.reject(new Error(error));
    }
    if(data && data.statusInfo && data.statusInfo.statusCode) {
      if(data.statusInfo.statusCode === 306) {
        const error =
        (data && data.statusInfo && data.statusInfo.errorMessage) || response.statusText;
        UserService.logout()
        Notify.error(error.message)
        window.location.reload()
        return Promise.reject(new Error(error));
      }
    }
    return data;
  });
}

