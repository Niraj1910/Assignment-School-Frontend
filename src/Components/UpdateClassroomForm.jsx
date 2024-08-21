import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import {
  convertToHourMinutes,
  formatDate,
  formatTime,
} from "../HelperFunctions/helper";
import { handleUpdateClassroom } from "../APIs/classroomApi";
import { useNavigate } from "react-router-dom";

const UpdateClassroomForm = ({ classroom, handleFormClose }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [classroomDetails, setClassroomDetails] = useState();

  const handleDeleteBtn = async () => {
    try {
      const res = await fetch(`${API_URL}/classroom/${classroom._id}`, {
        method: "DELETE",
      });

      if (res.status === 200) navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...classroom,
      name: classroomDetails.name,

      days: {
        ...classroomDetails.days,
        start_date: classroomDetails.days.start_date,
        end_date: classroomDetails.days.end_date,
      },
      time: {
        ...classroomDetails.time,
        start_time: formatTime(classroomDetails.time.start_time),
        end_time: formatTime(classroomDetails.time.end_time),
      },
    };

    handleUpdateClassroom(data, classroom, navigate);
  };

  function formatDateInYYYY_MM_DD(inputDate) {
    const [date] = inputDate.split("T");
    return date;
  }

  useEffect(() => {
    const details = {
      name: classroom.name,
      time: {
        start_time: convertToHourMinutes(classroom.time.start_time),
        end_time: convertToHourMinutes(classroom.time.end_time),
      },
      days: {
        start_date: formatDateInYYYY_MM_DD(classroom.days.start_date),
        end_date: formatDateInYYYY_MM_DD(classroom.days.end_date),
      },
    };

    setClassroomDetails(details);
  }, [classroom]);

  return (
    <section className="h-screen flex justify-center items-center text-xl fixed inset-0 bg-black bg-opacity-50 z-40">
      <div className="relative bg-white rounded-lg shadow-lg max-w-lg w-full max-h-screen">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 focus:outline-none"
          onClick={handleFormClose}
        >
          <FaTimes size={20} />
        </button>
        {classroomDetails && (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg px-8 py-10 rounded-lg shadow-md bg-white text-black"
          >
            <h2 className="text-3xl font-semibold mb-6 text-center">
              Update Classroom Details
            </h2>
            <div className="flex flex-col space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-lg font-medium mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={classroomDetails.name}
                  onChange={(e) =>
                    setClassroomDetails({
                      ...classroomDetails,
                      name: e.target.value,
                    })
                  }
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
                    value={classroomDetails.time.start_time}
                    onChange={(e) =>
                      setClassroomDetails({
                        ...classroomDetails,
                        time: {
                          ...classroomDetails.time,
                          start_time: e.target.value,
                        },
                      })
                    }
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
                    value={classroomDetails.time.end_time}
                    onChange={(e) =>
                      setClassroomDetails({
                        ...classroomDetails,
                        time: {
                          ...classroomDetails.time,
                          end_time: e.target.value,
                        },
                      })
                    }
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
                    value={classroomDetails.days.start_date}
                    onChange={(e) =>
                      setClassroomDetails({
                        ...classroomDetails,
                        days: {
                          ...classroomDetails.days,
                          start_date: e.target.value,
                        },
                      })
                    }
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
                    value={classroomDetails.days.end_date}
                    onChange={(e) =>
                      setClassroomDetails({
                        ...classroomDetails,
                        days: {
                          ...classroomDetails.days,
                          end_date: e.target.value,
                        },
                      })
                    }
                    className="h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-center gap-10 pt-6">
                <button
                  type="submit"
                  className="w-full inline-block px-6 py-2.5 bg-indigo-500 text-white font-medium rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={handleDeleteBtn}
                  className="w-full inline-block px-6 py-2.5 bg-red-500 text-white font-medium rounded-lg shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete {classroom.name}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default UpdateClassroomForm;
