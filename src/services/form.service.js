import { APIS, APP, LANG } from "../constants";
import { authHeader } from "../helpers/authHeader";
import Auth from "./../helpers/auth";
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
};

function get() {
  const requestOptions = {
    method: APP.REQUEST.GET,
    headers: authHeader(),
  };
  return fetch(
    process.env.REACT_APP_API_URL + APIS.FORM.GET,
    requestOptions
  ).then(handleResponse);
}

function find(formId) {
  const requestOptions = {
    method: APP.REQUEST.GET,
    headers: authHeader(),
  };
  return fetch(
    process.env.REACT_APP_API_URL + APIS.FORM.FIND + formId,
    requestOptions
  ).then(handleResponse);
}

function add(form) {
  const requestOptions = {
    method: APP.REQUEST.POST,
    body: JSON.stringify(form),
    headers: authHeader(),
  };
  return fetch(
    process.env.REACT_APP_API_URL + APIS.FORM.ADD,
    requestOptions
  ).then(handleResponse);
}

function update(form) {
  const requestOptions = {
    method: APP.REQUEST.POST,
    body: JSON.stringify(form),
    headers: authHeader(),
  };
  return fetch(
    process.env.REACT_APP_API_URL + APIS.FORM.UPDATE,
    requestOptions
  ).then(handleResponse);
}

function remove(form) {
  const requestOptions = {
    method: APP.REQUEST.POST,
    body: JSON.stringify(form),
    headers: authHeader(),
  };
  return fetch(
    process.env.REACT_APP_API_URL + APIS.FORM.DELETE,
    requestOptions
  ).then(handleResponse);
}

// function submit(form) {
//   const formData = new FormData();
//   formData.append("requestMap", JSON.stringify(form));
//   const requestOptions = {
//     method: APP.REQUEST.POST,
//     // body: formData,
//     headers: authHeader(),
//     data: formData,
//   };
//   fetch(process.env.REACT_APP_API_URL + APIS.FORM.SUBMIT,, 
//     requestOptions,
//   ).then(handleResponse);
// }

function submit(data) {
    const formData = new FormData();
  formData.append("requestMap", JSON.stringify(data));
  const requestOptions = {
    url: process.env.REACT_APP_API_URL + APIS.FORM.SUBMIT,
    method: APP.REQUEST.POST,
    headers: authHeader(),
    data: formData,
  };

  return axios(requestOptions)
    .then(handleResponseNew)
    .catch((err) => {
      if (err.message.includes(401)) {
        Notify.error('Unauthorized');
      } else {
        Notify.error(err.message);
      }
    });
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

function handleResponseNew(response) {
  // console.log(response);
  if (response.status === 401) {
    const error =
      LANG.APIERROR || (response && response.message) || response.statusText; //Ignoring server side error and using end user readable message
    return Promise.reject(new Error(error));
  }
  return response;
}

