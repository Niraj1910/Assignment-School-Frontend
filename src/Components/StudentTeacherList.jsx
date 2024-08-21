import React, { useContext, useState } from "react";
import StudentTeacherForm from "./StudentTeacherForm";
import { UserContext } from "../Context/UserContext";

const StudentTeacherList = ({ people, text }) => {
  const { userData } = useContext(UserContext);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedUser(null);
  };
  return (
    <div className="mb-8 p-6 bg-white rounded-lg shadow-lg text-black">
      <h2 className="text-3xl font-semibold mb-4 text-center">{text}</h2>
      <ul className="space-y-4 overflow-y-auto max-h-96">
        {people.length > 0 ? (
          people.map((person) => (
            <li
              key={person._id}
              className={`p-4 border rounded-lg bg-gray-100 shadow-sm hover:bg-gray-200 ${
                userData.role === "Student"
                  ? null
                  : userData.role === "Teacher"
                  ? text === "Students"
                    ? "cursor-pointer"
                    : null
                  : "cursor-pointer"
              }
               `}
              onClick={() =>
                userData.role === "Student"
                  ? null
                  : userData.role === "Teacher"
                  ? text === "Students"
                    ? handleUserClick(person)
                    : null
                  : handleUserClick(person)
              }
            >
              <p className="font-semibold">Name: {person.name}</p>
              <p>Email: {person.email}</p>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No teachers available</p>
        )}
      </ul>
      {/* User Form Modal */}
      {isFormOpen && selectedUser && (
        <StudentTeacherForm
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          handleFormClose={handleFormClose}
        />
      )}
    </div>
  );
};

export default StudentTeacherList;
