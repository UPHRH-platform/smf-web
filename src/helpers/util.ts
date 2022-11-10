import { APP, LANG } from "../constants";

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
// Function to format the status label
export const formatLabel = (labelStatus: string) => {
    let lowerLabel = labelStatus.toLowerCase();
    lowerLabel = lowerLabel.charAt(0).toUpperCase() + lowerLabel.slice(1);
    switch (lowerLabel) {
      case "Underreview":
        lowerLabel = "Under review";
        return lowerLabel;
      case "Sentforins":
        lowerLabel = `${LANG.FORM_STATUS_TEXT.SENT_FOR_INSPECTION}`;
        return lowerLabel;
      case "Inscompleted":
        lowerLabel = `${LANG.FORM_STATUS_TEXT.INSPECTION_COMPLETED}`;
        return lowerLabel;
      case "Inspector total pending":
        lowerLabel = `${LANG.INSPECTOR_TOTAL_PENDING}`;
        return lowerLabel; 
      default:
        return lowerLabel;
    }
  }
export default { getRoleLabel, formatLabel };