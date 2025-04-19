import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUserDetailsThunk } from "../thunk/DashboardThunk";
import { setCurrentUserDetailsToLocalStorage } from "../../utils/storageUtility";

const DashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    isUserListOpen: false,
    currentUserDetails: {},
    currentUserDetailsStatus: "idle",
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
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUserDetailsThunk.pending, (state) => {
        state.currentUserDetailsStatus = "loading";
        state.error = null;
      })
      .addCase(getCurrentUserDetailsThunk.fulfilled, (state, action) => {
        state.currentUserDetailsStatus = "succeeded";
        state.currentUserDetails = action.payload.result;
        setCurrentUserDetailsToLocalStorage(action.payload.result);
      })
      .addCase(getCurrentUserDetailsThunk.rejected, (state, action) => {
        state.currentUserDetailsStatus = "failed";
        state.error = action.payload;
      });
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