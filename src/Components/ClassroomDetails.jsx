import React, { useContext, useState } from "react";
import { formatDate } from "../HelperFunctions/helper";
import SubjectsForm from "./SubjectsForm";
import UpdateClassroomForm from "./UpdateClassroomForm";
import { UserContext } from "../Context/UserContext";

const ClassroomDetails = ({ classroom }) => {
  const { userData } = useContext(UserContext);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isClassroomFormOpen, setIsClassroomFormOpen] = useState(false);

  const handleFormClose = () => {
    setIsFormOpen(false);
    setIsClassroomFormOpen(false);
  };
  return (
    <div className="max-w-4xl mx-auto p-8  rounded-lg shadow-lg text-white">
      <div className="flex space-x-8 mb-8">
        <div
          onClick={() =>
            userData.role === "Principal" ? setIsClassroomFormOpen(true) : null
          }
          className={`w-1/2 p-6 bg-white rounded-lg shadow-lg text-black relative ${
            userData.role === "Principal" ? "cursor-pointer" : null
          } `}
        >
          <h2 className="text-3xl font-semibold mb-4 text-center sticky top-0 bg-white py-4 ">
            Classroom Details
          </h2>
          <p className="text-lg mb-2 p-4 border rounded-lg bg-gray-100 shadow-sm hover:bg-gray-200 ">
            <span className="font-semibold">Classroom Name:</span>{" "}
            {classroom.name}
          </p>
          <p className="text-lg mb-2 p-4 border rounded-lg bg-gray-100 shadow-sm hover:bg-gray-200 ">
            <span className="font-semibold">Classroom Time:</span>{" "}
            {classroom.time.start_time} - {classroom.time.end_time}
          </p>
          <p className="text-lg mb-2 p-4 border rounded-lg bg-gray-100 shadow-sm hover:bg-gray-200 ">
            <span className="font-semibold">Days:</span>{" "}
            {formatDate(classroom.days.start_date)} to{" "}
            {formatDate(classroom.days.end_date)}
          </p>
        </div>

        <div className="w-1/2 p-6 bg-white rounded-lg shadow-lg text-black relative">
          <h2 className="text-3xl font-semibold mb-4 text-center sticky top-0 bg-white py-4">
            Teacher Details
          </h2>
          <p className="text-lg mb-2 p-4 border rounded-lg bg-gray-100 shadow-sm hover:bg-gray-200">
            <span className="font-semibold">Assigned Teacher:</span>{" "}
            {classroom.assigned_teacher.name}
          </p>
          <p className="text-lg mb-2 p-4 border rounded-lg bg-gray-100 shadow-sm hover:bg-gray-200">
            <span className="font-semibold">Teacher Email:</span>{" "}
            {classroom.assigned_teacher.email}
          </p>
        </div>
      </div>

      <div className="flex space-x-8">
        <div className="w-1/2 p-6 bg-white rounded-lg shadow-lg text-black relative">
          <h2 className="text-3xl font-semibold mb-4 text-center sticky top-0 bg-white py-4">
            Students
          </h2>
          <ul className="text-lg space-y-2 overflow-y-auto max-h-96">
            {classroom.students?.map((student) => (
              <li
                key={student._id}
                className="p-4 border rounded-lg bg-gray-100 shadow-sm hover:bg-gray-200"
              >
                <p>
                  <span className="font-semibold">Name:</span> {student.name}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {student.email}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-1/2 p-6 bg-white rounded-lg shadow-lg text-black relative">
          <h2 className="text-3xl font-semibold mb-4 text-center sticky top-0 bg-white py-4">
            Subjects & Timetable
          </h2>
          <ul className="text-lg space-y-2 overflow-y-auto max-h-96">
            {classroom.subjects_time_table.length > 0 ? (
              classroom.subjects_time_table.map((subject, index) => (
                <li
                  onClick={() =>
                    userData.role !== "Student" ? setIsFormOpen(true) : null
                  }
                  key={index}
                  className={`p-4 border rounded-lg bg-gray-100 shadow-sm hover:bg-gray-200 ${
                    userData.role !== "Student" ? "cursor-pointer" : ""
                  }`}
                >
                  <p>
                    <span className="font-semibold">Subject:</span>{" "}
                    {subject?.subject}
                  </p>
                  <p>
                    <span className="font-semibold">Time:</span>{" "}
                    {subject?.start_time} - {subject?.end_time}
                  </p>
                </li>
              ))
            ) : (
              <li className="p-4 h-[200px] text-center border rounded-lg bg-gray-100 shadow-sm hover:bg-gray-200">
                <p>No Subjects Available</p>
              </li>
            )}
          </ul>
          <button
            onClick={() =>
              userData.role !== "Student" ? setIsFormOpen(true) : null
            }
            disabled={userData.role !== "Student" ? false : true}
            className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-lg inline-block px-6 py-2.5 bg-indigo-500 text-white font-medium rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              userData.role !== "Student" ? "cursor-pointer" : ""
            }`}
          >
            Add Subjects
          </button>
        </div>
      </div>
      {/* User Form Modal */}
      {isFormOpen && (
        <SubjectsForm classroom={classroom} handleFormClose={handleFormClose} />
      )}

      {isClassroomFormOpen && (
        <UpdateClassroomForm
          classroom={classroom}
          handleFormClose={handleFormClose}
        />
      )}
    </div>
  );
};

export default ClassroomDetails;
