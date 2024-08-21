import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { toast } from "react-toastify";
import { formatTime } from "../HelperFunctions/helper";
import { handleCreateClassroom } from "../APIs/classroomApi";

const ClassroomForm = () => {
  const { allTeachers, allStudents, allClassRooms } = useContext(UserContext);

  const availableTeachers = allTeachers.filter((teacher) => {
    return !allClassRooms.some(
      (classroomm) => classroomm.assigned_teacher._id === teacher._id
    );
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    handleCreateClassroom(formData);
  };

  return (
    <section className=" h-screen flex justify-center items-center text-xl">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg px-8 py-10 rounded-lg shadow-md bg-white"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Create Classroom
        </h2>
        <div className="flex flex-col space-y-4">
          <div>
            <label htmlFor="name" className="block text-lg font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Classroom Name"
              className="h-12 w-full px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="flex space-x-4">
            <div className="w-full">
              <label
                htmlFor="start_time"
                className="block text-lg font-medium mb-1"
              >
                Start Time
              </label>
              <input
                type="time"
                id="start_time"
                name="start_time"
                className="h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="end_time"
                className="block text-lg font-medium mb-1"
              >
                End Time
              </label>
              <input
                type="time"
                id="end_time"
                name="end_time"
                className="h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                required
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="w-full">
              <label
                htmlFor="start_date"
                className="block text-lg font-medium mb-1"
              >
                Start Date
              </label>
              <input
                type="date"
                id="start_date"
                name="start_date"
                className="h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="end_date"
                className="block text-lg font-medium mb-1"
              >
                End Date
              </label>
              <input
                type="date"
                id="end_date"
                name="end_date"
                className="h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="assign_teacher"
              className="block text-lg font-medium mb-1"
            >
              Assign Teacher
            </label>
            <select
              id="assigned_teacher"
              name="assigned_teacher"
              defaultValue=""
              className="h-12 w-full px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="" disabled>
                Select a teacher
              </option>
              {availableTeachers?.map((teacher) => (
                <option value={teacher._id} key={teacher._id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="add_students"
              className="block text-lg font-medium mb-1"
            >
              Add Students
            </label>
            <select
              id="students"
              name="students"
              multiple
              className="h-32 w-full px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              {allStudents?.map((student) => (
                <option value={student._id} key={student._id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="inline-block px-6 py-2.5 bg-indigo-500 text-white font-medium rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Classroom
          </button>
        </div>
      </form>
    </section>
  );
};

export default ClassroomForm;
