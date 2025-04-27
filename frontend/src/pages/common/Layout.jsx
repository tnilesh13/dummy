import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserDetailsThunk } from "../../redux/thunk/AuthThunk.jsx";
import { connectSocket, disconnectSocket, getSocket } from "../../utils/socket.js";
import { listenToSocketEvents, clearSocketEvents } from "../../utils/socketListeners.js";
import { clearSocketState } from "../../redux/slice/SocketSlice.js";
import Store from "../../redux/store";
import Sidebar from "../../components/SideBar.jsx";

const Layout = () => {
  const dispatch = useDispatch();

  const { token, currentUserDetails } = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    if (token && !currentUserDetails) {
      dispatch(getCurrentUserDetailsThunk()).then(() => {
        // requestPermission().then((have) => {
        //   if (have) {
        //     requestForToken();
        //   }
        // });
      });
    }
  }, [token, currentUserDetails, dispatch]);

  useEffect(() => {
    let socketInstance;

    if (token && currentUserDetails) {
      socketInstance = connectSocket(currentUserDetails._id);

      listenToSocketEvents(socketInstance, dispatch, Store.getState);
    }

    return () => {
      if (socketInstance) {
        clearSocketEvents(socketInstance);
        disconnectSocket();
        dispatch(clearSocketState());
      }
    };
  }, [token, currentUserDetails, dispatch]);

  return (
    <>
      <Header />
      <div className="h-screen bg-gray-700">
        <div className="flex items-center justify-center pt-20 px-4">
          <div className="bg-gray-600 rounded-lg shadow-cl w-full max-w-8xl h-[calc(100vh-6rem)]">
            <div className="flex h-full rounded-lg overflow-hidden">
              <Sidebar />
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
