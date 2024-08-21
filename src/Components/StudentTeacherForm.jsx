import React, { useContext } from "react";
import { FaTimes } from "react-icons/fa";

import { handleDelete, handleUpdate } from "../APIs/usersApi";
import { UserContext } from "../Context/UserContext";

const StudentTeacherForm = ({
  selectedUser,
  setSelectedUser,
  handleFormClose,
}) => {
  const { setAllTeachers, setAllStudents } = useContext(UserContext);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
      <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 focus:outline-none"
          onClick={handleFormClose}
        >
          <FaTimes size={20} />
        </button>
        <h2 className="text-3xl font-semibold mb-6 text-center text-black">
          Update {selectedUser.role} Details
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-xl font-medium mb-2 text-black">
              Name
            </label>
            <input
              type="text"
              value={selectedUser.name}
              className="h-12 w-full px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black text-lg"
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, name: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-xl font-medium mb-2 text-black">
              Email
            </label>
            <input
              type="email"
              value={selectedUser.email}
              className="h-12 w-full px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black text-lg"
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, email: e.target.value })
              }
            />
          </div>
          <div className="flex justify-center gap-4 mt-6 text-lg">
            <button
              type="button"
              className="w-full inline-block px-6 py-2.5 bg-indigo-500 text-white font-medium rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() =>
                handleUpdate(
                  selectedUser,
                  setAllStudents,
                  setAllTeachers,
                  handleFormClose
                )
              }
            >
              Update
            </button>
            <button
              type="button"
              className="w-full inline-block px-6 py-2.5 bg-red-500 text-white font-medium rounded-lg shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={() =>
                handleDelete(
                  selectedUser,
                  setAllStudents,
                  setAllTeachers,
                  handleFormClose
                )
              }
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentTeacherForm;
