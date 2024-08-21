import React, { useContext, useEffect, useRef } from "react";
import "../style.css";
import { UserContext } from "../Context/UserContext";

import CreateClassroom from "./CreateClassroom";
import ClassroomDetails from "./ClassroomDetails";
import SchoolOverview from "./SchoolOverview";
import Register from "./Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchUserData } from "../APIs/usersApi";

const Home = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const { userData, setUserData, allClassRooms, setAllClassRooms } =
    useContext(UserContext);

  const fetchAllClassRooms = async () => {
    try {
      const response = await fetch(`${API_URL}/classroom/all`);

      const data = await response.json();

      setAllClassRooms(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserRef = useRef();

  useEffect(() => {
    if (!fetchUserRef.current) {
      fetchUserData(setUserData);
      fetchAllClassRooms();
      fetchUserRef.current = true;
    }
  }, []);

  return (
    <div className="bg-gradient-to-r from-slate-900 to-purple-900 flex h-screen pb-20">
      <div className="flex-2 p-4 overflow-y-auto custom-scrollbar">
        <SchoolOverview classrooms={allClassRooms} />
      </div>
      <div className="flex-3 p-4 overflow-y-auto custom-scrollbar text-white text-2xl">
        {allClassRooms?.map((classroom, index) => (
          <div key={classroom._id}>
            <span>{index + 1}. </span>{" "}
            <ClassroomDetails classroom={classroom} />
          </div>
        ))}
      </div>
      {userData && userData.role === "Principal" && (
        <div className="flex-2 p-4 overflow-y-auto custom-scrollbar px-16">
          <CreateClassroom />
          <Register />
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Home;
