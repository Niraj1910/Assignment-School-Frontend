import React, { useContext, useEffect, useRef } from "react";
import { UserContext } from "../Context/UserContext";
import StudentTeacherList from "./StudentTeacherList";

import { getAllUsers } from "../APIs/usersApi";
import { formatDate } from "../HelperFunctions/helper";

const SchoolOverview = ({ classrooms }) => {
  const { allTeachers, setAllTeachers, allStudents, setAllStudents } =
    useContext(UserContext);

  const getAllUsersRef = useRef();

  useEffect(() => {
    if (!getAllUsersRef.current) {
      getAllUsers(setAllTeachers, setAllStudents);
      getAllUsersRef.current = true;
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-16 rounded-lg shadow-lg text-white">
      {/* Classrooms Section */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow-lg text-black">
        <h2 className="text-3xl font-semibold mb-4 text-center">Classrooms</h2>
        <ul className="space-y-4 overflow-y-auto max-h-96">
          {classrooms.length > 0 ? (
            classrooms.map((classroom) => (
              <li
                key={classroom._id}
                className="p-4 border rounded-lg bg-gray-100 shadow-sm hover:bg-gray-200"
              >
                <p className="font-semibold">Name: {classroom.name}</p>
                <p>
                  Time: {classroom.time.start_time} - {classroom.time.end_time}
                </p>
                <p>
                  Days: {formatDate(classroom.days.start_date)} to{" "}
                  {formatDate(classroom.days.end_date)}
                </p>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500">No classrooms available</p>
          )}
        </ul>
      </div>

      {/* Teachers Section */}
      <StudentTeacherList
        people={allTeachers}
        // handleUserClick={handleUserClick}
        text={"Teachers"}
      />

      {/* Students Section */}
      <StudentTeacherList
        people={allStudents}
        // handleUserClick={handleUserClick}
        text={"Students"}
      />
    </div>
  );
};

export default SchoolOverview;
