import { atom } from "recoil";

// Inspector - View applications 
export const menuSelected = atom({
    key: "selectedSideMenu",
    default: ""
});

// Tab selections
export const selectedTabData = atom({
    key: "selectedTabData",
    default: [{}]
})

export const selectedTab = atom({
    key: "selectedTab",
    default: ""
})