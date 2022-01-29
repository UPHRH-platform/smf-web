import Auth from "./auth";

export function authHeader() {
  let user = JSON.parse(localStorage.getItem("user"));
  if (user && user.authToken) {
    return {
      "Authorization": Auth.get('authToken'),
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Origin, Content-Type, Accept",
      "mode": "no-cors"
    };
  } else {
    return {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Origin, Content-Type, Accept"
    };
  }
}
