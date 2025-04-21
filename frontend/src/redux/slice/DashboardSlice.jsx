import { createSlice } from "@reduxjs/toolkit";

const DashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    isUserListOpen: false,
    error: null,
    isMenuOpen: true,
    activeMenu: "",
    activeSubmenu: "",
    activeSubMenuOpen: {},
  },
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    setMenuState: (state, action) => {
      state.isMenuOpen = action.payload;
    },

    toggleUserList: (state) => {
      state.isUserListOpen = !state.isUserListOpen;
    },
    setUserListState: (state, action) => {
      state.isUserListOpen = action.payload;
    },

    setActiveMenu: (state, action) => {
      state.activeMenu = action.payload;
    },
    setActiveSubMenu: (state, action) => {
      state.activeSubmenu = action.payload;
    },
    setActiveSubMenuOpen: (state, action) => {
      const route = action.payload;
      state.activeSubMenuOpen[route] = !state.activeSubMenuOpen[route];
    },
    resetActiveSubMenu: (state) => {
      state.activeSubmenu = "";
    },
  },
});

export const {
  toggleMenu,
  setMenuState,
  toggleUserList,
  setUserListState,
  setActiveMenu,
  setActiveSubMenu,
  setActiveSubMenuOpen,
  resetActiveSubMenu,
} = DashboardSlice.actions;

export default DashboardSlice.reducer;