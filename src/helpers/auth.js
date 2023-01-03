import { APP } from "../constants";
const Auth = {
  get(item) {
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log('user :: ', user)
    return (user && user[item]) || '';
  },

  isLoggedIn() {
    let response;
    if (localStorage.getItem("user")) {
      response = true;
    } else {
      response = false;
    }
    return response;
  },

  getUserRole() {
    let user = JSON.parse(localStorage.getItem("user"));
    if(!user) {
      return ''
    }
    return user.roles[0].name;
  },

  isSuperAdmin() {
    const userRole = this.getUserRole();
    if(userRole === APP.ROLE.SUPER_ADMIN) {
      return true;
    } else {
      return false;
    }
  }
};

export default Auth;
