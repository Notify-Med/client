import React, { useContext, useEffect } from "react";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";

function NotificationCardPage() {
  const { notif } = useContext(AuthContext);

  // const getNotification = async () => {
  //   const res = await axios.get(`/notifications/${notifId}`);
  //   console.log(res.data);
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await getNotification();
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    console.log(notif);
  }, []);

  return;
}

export default NotificationCardPage;
