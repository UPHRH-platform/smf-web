import { APIS, APP, LANG } from "../constants";
import { authHeader } from "../helpers/authHeader";
import Notify from "./../helpers/notify";
import { UserService } from "./user.service";

/**
 * Chart service
 * Provides API functions, returns
 * data required for the charts
 */

export const ChartService = {
  getDashboardConfig,
  getDashboardProfile,
  getChartData,
};

async function getDashboardConfig() {
  const requestOptions = {
    method: APP.REQUEST.GET,
    headers: authHeader(),
  };
  return await fetch(
    APIS.BASE_URL + APIS.DASHBOARD.GET_DASHBOARD_CONFIG,
    requestOptions
  ).then(handleResponse);
}

async function getDashboardProfile() {
  const requestOptions = {
    method: APP.REQUEST.GET,
    headers: authHeader(),
  };
  return await fetch(
    APIS.BASE_URL + APIS.DASHBOARD.GET_DASHBOARD_PROFILE,
    requestOptions
  ).then(handleResponse);
}

async function getChartData(payload) {
  const requestOptions = {
    method: APP.REQUEST.POST,
    body: JSON.stringify(payload),
    headers: authHeader(),
  };
  return await fetch(
    APIS.BASE_URL + APIS.DASHBOARD.GET_CHART_DATA,
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
