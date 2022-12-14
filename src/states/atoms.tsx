import { atom } from "recoil";

// Inspector - View applications
export const sideMenuData = atom({
  key: "selectedSideMenuData",
  default: {},
});

export const sideMenuLabel = atom({
  key: "selectedSideMenuLabel",
  default: "",
});

// Tab selections
export const selectedTabData = atom({
  key: "selectedTabData",
  default: [{}],
});

export const selectedTab = atom({
  key: "selectedTab",
  default: "",
});

// Modal two
export const modalTwoTextArea = atom({
  key: "modalTwoTextArea",
  default: "",
});

export const modalTwoInspectionValue = atom({
  key: "modalTwoInspectionValue",
  default: "",
});

// Inspection
export const dataObjectInspectionForm = atom({
  key: "dataObjectInspectionForm",
  default: "",
});

export const dataObjectFileUpload = atom({
  key: "dataObjectFileUpload",
  default: {},
});
