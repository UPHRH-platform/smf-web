import { APIS, APP, LANG } from "../constants";
import { authHeader } from "../helpers/authHeader";
import Notify from "./../helpers/notify";
import axios from "axios";

export const FormService = {
  get,
  find,
  add,
  update,
  remove,
  submit,
  getAllApplications,
  findApplication,
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
  fetch(APIS.BASE_URL  + APIS.FORM.SUBMIT,
    requestOptions,
  ).then(handleResponse);
}

function getAllApplications() {
  const requestOptions = {
    method: APP.REQUEST.GET,
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

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error =
        LANG.APIERROR || (data && data.message) || response.statusText;
      return Promise.reject(new Error(error));
    }
    return data;
  });
}

