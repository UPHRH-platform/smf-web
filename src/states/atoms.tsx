import { atom } from "recoil";

// Inspector - View applications 
export const sideMenuData = atom({
    key: "selectedSideMenuData",
    default: {}
})

export const sideMenuLabel = atom({
    key: "selectedSideMenuLabel",
    default: ""
})