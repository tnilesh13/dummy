import React, { useEffect, useState } from "react";
// import { requestForToken, requestPermission } from "../utils/FirebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import ShimmerTable from "../../components/Shimmer/ShimmerTable";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { currentUserDetails, currentUserDetailsStatus } = useSelector(
    (state) => state.AuthReducer
  );
  // useEffect(() => {
  //   dispatch(getCurrentUserDetailsThunk()).then(() => {
  //     // requestPermission().then((have) => {
  //     //   if (have) {
  //     //     requestForToken();
  //     //   }
  //     // });
  //   });
  // }, [dispatch]);

  if (
    currentUserDetailsStatus === "loading" ||
    currentUserDetailsStatus === "idle"
  ) {
    return (
      <>
        <ShimmerTable
          mode="light"
          row={3}
          col={1}
          border={1}
          borderColor={"#cbd5e1"}
          rounded={0.25}
          rowGap={16}
          colPadding={[10, 5, 10, 5]}
        />
        <div className="w-full space-y-3 px-2 bg-white"></div>
        <ShimmerTable
          mode="light"
          row={8}
          col={1}
          border={1}
          borderColor={"#cbd5e1"}
          rounded={0.25}
          rowGap={16}
          colPadding={[10, 5, 10, 5]}
        />
        <div className="w-full space-y-3 px-2 bg-white"></div>
        <ShimmerTable
          mode="light"
          row={8}
          col={1}
          border={1}
          borderColor={"#cbd5e1"}
          rounded={0.25}
          rowGap={16}
          colPadding={[10, 5, 10, 5]}
        />
      </>
    );
  } else
    return (
      <div className="container bg-gray-100">
        <div className="row p-6">
          dashboard
        </div>
      </div>
    );
};

export default Dashboard;
