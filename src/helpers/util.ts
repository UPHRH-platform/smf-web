import { APP } from "../constants";

const getRoleLabel = (roleName: string) => {

    switch(roleName.toLowerCase()) {
        case APP.ROLE.REGULATOR.toLowerCase(): 
            return APP.ROLE_LABEL.REGULATOR;
        case APP.ROLE.INSTITUTION.toLowerCase():
            return APP.ROLE_LABEL.INSTITUTION;
        case APP.ROLE.INSPECTOR.toLowerCase():
            return APP.ROLE_LABEL.INSPECTOR;
        case APP.ROLE.SUPER_ADMIN.toLowerCase():
            return APP.ROLE_LABEL.SUPER_ADMIN;
    }
}

export default { getRoleLabel };