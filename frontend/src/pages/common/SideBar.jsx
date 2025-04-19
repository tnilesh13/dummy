import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice/AuthSlice";
import { useNavigate } from "react-router-dom";
import * as Svg from "../../utils/Svg"
// import {
//   setActiveMenu,
//   setActiveSubMenu,
//   setActiveSubMenuOpen,
// } from "../redux/slice/DashboardSlice";
// import { ReactComponent as Dashboard } from "../assets/Vector(6).svg";
// import { ReactComponent as Leads } from "../assets/Icon (1).svg";
// import { ReactComponent as Vector } from "../assets/Vector.svg";
// import { ReactComponent as User } from "../assets/icon (2).svg";
// import { ReactComponent as Roles } from "../assets/Icon(3).svg";
// import { ReactComponent as Proposal } from "../assets/Vector(1).svg";
// import { ReactComponent as Project } from "../assets/Vector(2).svg";
// import { ReactComponent as Invoice } from "../assets/Vector(3).svg";
// import { ReactComponent as Call } from "../assets/Vector(5).svg";
// import { ReactComponent as Feedback } from "../assets/Vector(4).svg";
// import { ReactComponent as EmailTemplate } from "../assets/envelope-fill.svg";
// import { ReactComponent as Task } from "../assets/notepad-fill.svg";
// import { ReactComponent as FollowUp } from "../assets/paper-plane-tilt-fill.svg";
// import { ReactComponent as ProjectReview } from "../assets/list-star-fill.svg";
// import { ReactComponent as UserReport } from "../assets/chalkboard-teacher-fill.svg";

const Sidebar = () => {
  const {
    isMenuOpen,
    activeMenu,
    activeSubMenu,
    activeSubMenuOpen,
    activeSubmenu,
  } = useSelector((state) => state.DashboardReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const MenuItems = [
    {
      name: "Friend List",
      route: "/dashboard/friends-list",
      // icon: <UserReport />,
      permissions: [],
    },
  ];

  // const currentUserDetails = localStorage.getItem("ITG_CurrentUserDetails")
  //   ? JSON.parse(localStorage.getItem("ITG_CurrentUserDetails"))
  //   : {};
  // const currentUserPermission = currentUserDetails?.permission || [];
  const currentUserPermission = [];

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleSubMenuToggle = (route) => {
    // dispatch(setActiveSubMenuOpen(route));
  };

  const filteredMenuItems = MenuItems?.filter(
    (item) =>
      !item.permissions ||
      item.permissions.length === 0 ||
      item.permissions.some(
        (per) =>
          currentUserDetails?.isAdmin || currentUserPermission.includes(per)
      )
  );

  const handleMenuItemClick = (route, hasSubMenu) => {
    if (hasSubMenu) {
      dispatch(setActiveSubMenuOpen(route));
      dispatch(setActiveMenu(""));
    } else {
      dispatch(setActiveMenu(route));
      dispatch(setActiveSubMenu(""));
    }
  };

  const handleSubMenuItemClick = (route) => {
    dispatch(setActiveSubMenu(route));
    dispatch(setActiveMenu(""));
  };

  const MenuItemCardView = ({ menuItem, isMenuOpen }) => {
    const isActiveMenu = activeMenu === menuItem.route;
    const isActiveSubMenu = (route) => activeSubmenu === route;

    return (
      <>
        <li
          className={`flex items-center hover:bg-gray-200 py-1 ${isActiveMenu ? "bg-gray-200 border-r-2 border-gray-600" : ""
            }`}
        >
          <Link
            to={menuItem.subMenuItems ? "#" : menuItem.route}
            className="flex items-center gap-3 text-black py-1 px-5 pr-[24px] cursor-pointer w-[200px]"
            onClick={(e) => {
              if (menuItem.subMenuItems) {
                e.preventDefault();
                handleMenuItemClick(menuItem.route, true);
              } else {
                handleMenuItemClick(menuItem.route, false);
              }
            }}
          >
            {/* <div className="w-6 h-6 pt-[4px]">{menuItem.icon}</div> */}
            {isMenuOpen && (
              <span className="text-[14px] font-medium">{menuItem.name}</span>
            )}
          </Link>
        </li>

        {activeSubMenuOpen[menuItem.route] && menuItem.subMenuItems && (
          <ul className="space-y-1">
            {menuItem.subMenuItems.map((subItem) => (
              <li
                key={subItem.route}
                className={`hover:bg-gray-300 ${isActiveSubMenu(subItem.route)
                    ? "bg-gray-200 border-r-2 border-gray-600"
                    : ""
                  }`}
              >
                <Link
                  to={subItem.route}
                  className="block text-black py-2 text-[13px] pl-[55px] font-medium"
                  onClick={() => handleSubMenuItemClick(subItem.route)}
                >
                  {subItem.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  };

  return (
    <div
      className={`h-screen bg-white text-white transition-all duration-300 ${isMenuOpen ? "w-64" : "w-20"
        } flex flex-col`}
    >
      <div className="p-3">
        {/* <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(Svg.LogoSvg)}`}
          alt="Logo"
        /> */}
        NT
      </div>
      <div
        className="flex-1 overflow-y-auto"
        style={{ scrollbarWidth: "none" }}
      >
        <ul className="space-y-1">
          {filteredMenuItems.map((item) => (
            <MenuItemCardView
              key={item.route}
              menuItem={item}
              isMenuOpen={isMenuOpen}
            />
          ))}
        </ul>
      </div>
      <div className="p-2 hover:bg-gray-200 border-t border-gray-300">
        <button
          className="w-full text-left text-black py-2  flex items-center gap-3"
          onClick={handleLogOut}
        >
          <img
            src={`data:image/svg+xml;utf8,${encodeURIComponent(Svg.LogoutSvg)}`}
            alt="Logout"
            className="w-5 h-5"
          />
          {isMenuOpen && (
            <span className="text-[14px] font-medium">Logout</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
