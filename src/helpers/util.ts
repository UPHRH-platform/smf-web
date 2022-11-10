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
      case `${LANG.METRIC_LABEL_KEY.UNDER_REVIEW}`:
        lowerLabel = `${LANG.FORM_STATUS_TEXT.UNDER_REVIEW}`;
        return lowerLabel;
      case `${LANG.METRIC_LABEL_KEY.SENT_FOR_INS}`:
        lowerLabel = `${LANG.FORM_STATUS_TEXT.SENT_FOR_INSPECTION}`;
        return lowerLabel;
      case `${LANG.METRIC_LABEL_KEY.INS_COMPLETED}`:
        lowerLabel = `${LANG.FORM_STATUS_TEXT.INSPECTION_COMPLETED}`;
        return lowerLabel;
      case `${LANG.METRIC_LABEL_KEY.INSPECTOR_TOTAL_PENDING}`:
        lowerLabel = `${LANG.FORM_STATUS_TEXT.INSPECTOR_TOTAL_PENDING}`;
        return lowerLabel; 
      default:
        return lowerLabel;
    }
  }
export default { getRoleLabel, formatLabel };