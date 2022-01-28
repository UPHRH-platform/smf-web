import Auth from "./auth";

export function authHeader() {
  let user = JSON.parse(localStorage.getItem("user"));
  if (user && user.authToken) {
    return {
      "Authorization": "Bearer " + Auth.get('authToken'),
      // "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0YXJlbnRvYWRtaW5AdGFyZW50by5jb20iLCJzY29wZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfQURNSU4ifV0sImlzcyI6Imh0dHA6Ly9kZXZnbGFuLmNvbSIsImlhdCI6MTY0MzI3OTUzNywiZXhwIjoxNjQ1ODcxNTM3fQ.qj8LU0ODK0WdP2-MHrrQT6g9GimtjD4kMgypk5lWni0",
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
