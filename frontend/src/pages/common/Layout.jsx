import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar.jsx";
import Header from "../../components/Header";
// import { setMenuState } from "../redux/slice/DashboardSlice.jsx";
import { useDispatch } from "react-redux";
import Dashboard from "./Dashboard.jsx";
import { getCurrentUserDetailsThunk } from "../../redux/thunk/AuthThunk.jsx";

const Layout = () => {
  const [MenuIconVisiblity, setMenuIconVisiblity] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUserDetailsThunk()).then(() => {
      // requestPermission().then((have) => {
      //   if (have) {
      //     requestForToken();
      //   }
      // });
    });
  }, [dispatch]);
  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth < 1024) {
  //       setMenuIconVisiblity(false);
  //       dispatch(setMenuState(false)); // Close menu if screen size is smaller than "large"
  //     } else {
  //       setMenuIconVisiblity(true);
  //       dispatch(setMenuState(true)); // Keep menu open if screen size is large
  //     }
  //   };

  //   window.addEventListener("resize", handleResize);
  //   handleResize();
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, [dispatch]);

  // return (<Dashboard/>)

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Header */}
        <div style={styles.header}>
          <Header MenuIconVisiblity={MenuIconVisiblity} />
        </div>

        {/* Dynamic Content */}
        <div style={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    overflow: "hidden",
  },
  sidebar: {
    // width: "250px",
    background: "#2C3E50",
    color: "white",
    height: "100vh",
    position: "sticky",
    top: 0,
    left: 0,
    overflowY: "auto",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    transition: "transform 0.3s ease-in-out",
  },
  mainContent: {
    background: "#F1F1F1",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    overflow: "hidden",
  },
  header: {
    background: "#FFFFFF",
    textAlign: "center",
    flexShrink: 0,
  },
  content: {
    flex: 1,
    overflowY: "auto",
  },
};

export default Layout;
