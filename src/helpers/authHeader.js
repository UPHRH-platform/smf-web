import Auth from "./auth";

export function authHeader() {
  let user = JSON.parse(localStorage.getItem("user"));
  if (user && user.authToken) {
    return {
      "Authorization": Auth.get('authToken'),
      "Content-Type": "application/json",
      "Accept": "application/json",
    };
  } else {
    return {
      "Content-Type": "application/json",
      "Accept": "application/json",
    };
  }
}
