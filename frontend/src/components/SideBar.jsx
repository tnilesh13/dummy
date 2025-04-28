import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slice/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { ImagesIcon, LogOut, MessageSquare, SettingsIcon } from "lucide-react";
import { FaUserFriends } from "react-icons/fa";
import { setActiveMenu } from "../redux/slice/DashboardSlice";

const Sidebar = () => {
  const {
    activeMenu,
  } = useSelector((state) => state.DashboardReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUserDetails } = useSelector(
    (state) => state.AuthReducer
  );

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleMenuItemClick = (route) => {
    dispatch(setActiveMenu(route));
    navigate(route);
  };

  return (
    <aside className="h-full w-20 border-r border-black flex flex-col justify-between transition-all duration-200">
      <div className="flex flex-col justify-center items-center">
        <div className={`border-b border-black w-full p-5 ${activeMenu === "chat" ? "bg-black text-white" : ""}`}
          onClick={() => handleMenuItemClick("chat")}>
          <MessageSquare className="size-6" />
        </div>
        <div className="border-b border-black w-full p-5">
          <ImagesIcon className="size-6" />
        </div>
        <div className={`border-b border-black w-full p-5 ${activeMenu === "users-list" ? "bg-black text-white" : ""}`}
          onClick={() => handleMenuItemClick("users-list")}>
          <FaUserFriends className="size-6" />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="border-b border-black w-full p-5">
          <SettingsIcon className="size-6" />
        </div>
        <div className="border-b border-black w-full p-3 flex">
          <div>
            <img src={currentUserDetails?.profilePic || "/avatar.png"}
              alt={currentUserDetails?.fullName}
              className="size-10 object-cover rounded-full justify-center items-center" />
          </div>
        </div>
        <div className="border-b border-black w-full p-5"
          onClick={handleLogOut}>
          <LogOut className="size-6" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
