import React, { useEffect, useState } from "react";
import { FaTimes, FaPlus, FaMinus } from "react-icons/fa";
import {
  convertToHourMinutes,
  getUpdatedSubjecsData,
  handleUpdateSubjectFields,
} from "../HelperFunctions/helper";
import { handleUpdateClassroom } from "../APIs/classroomApi";
import { useNavigate } from "react-router-dom";

const SubjectsForm = ({ classroom, handleFormClose }) => {
  const navigate = useNavigate();

  const [subjectsCount, setSubjectsCount] = useState(1);
  const [subjects, setSubjects] = useState([
    { name: "", start_time: "", end_time: "", error: "" },
  ]);

  const [showEndTimeInputField, setShowEndTimeInputField] = useState([
    { start_time: "" },
  ]);

  useEffect(() => {
    if (classroom.subjects_time_table) {
      const { subjects_time_table } = classroom;

      const sub = [];
      const showfield = [];
      subjects_time_table.forEach((elem, index) => {
        sub[index] = {
          name: elem.subject,
          start_time: convertToHourMinutes(elem.start_time),
          end_time: convertToHourMinutes(elem.end_time),
          error: "",
        };
        showfield[index] = {
          start_time: convertToHourMinutes(elem.start_time),
        };
      });
      setSubjects(sub);
      setShowEndTimeInputField(showfield);
      setSubjectsCount(subjects_time_table.length);
    }
  }, [classroom]);

  const handleAddSubject = () => {
    setSubjectsCount(subjectsCount + 1);
    setSubjects([...subjects, { start_time: "", end_time: "", error: "" }]);
    let timeInputs = [...showEndTimeInputField];
    timeInputs[subjectsCount] = { start_time: "" };
    setShowEndTimeInputField(timeInputs);
  };

  const handleRemoveSubject = (indexToRemove) => {
    if (subjectsCount > 1) {
      setSubjectsCount(subjectsCount - 1);
      setSubjects(subjects.filter((_, index) => index !== indexToRemove));
    }
  };

  const handleOnChange = (index, e) => {
    const newSubjects = handleUpdateSubjectFields(
      index,
      e,
      subjects,
      classroom
    );
    setSubjects(newSubjects);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Process the form data here
    const formData = new FormData(e.target);

    const allInputs = getUpdatedSubjecsData(formData);
    const updatedData = { ...classroom, subjects_time_table: allInputs };

    handleUpdateClassroom(updatedData, classroom, navigate);
  };

  return (
    <section className="h-screen flex justify-center items-center text-xl fixed inset-0 bg-black bg-opacity-50 z-40">
      <div className="relative bg-white rounded-lg shadow-lg max-w-lg w-full max-h-screen">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 focus:outline-none"
          onClick={handleFormClose}
        >
          <FaTimes size={20} />
        </button>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg px-8 py-10 rounded-lg shadow-md bg-white text-black overflow-y-auto max-h-screen"
        >
          <h2 className="text-3xl font-semibold mb-6 text-center">
            {classroom.name}
          </h2>
          <h2 className="text-xl font-semibold mb-6 text-center text-gray-500">
            Class starts from {classroom.time.start_time} and ends at{" "}
            {classroom.time.end_time}
          </h2>
          <div className="flex flex-col space-y-4">
            {subjects.map((subject, index) => (
              <div key={index} className="flex flex-col space-y-4">
                <div>
                  <label
                    htmlFor={`subject-${index}`}
                    className="block text-lg font-medium mb-1"
                  >
                    Subject Name
                  </label>
                  <input
                    type="text"
                    id={`subject-${index}`}
                    name="subject"
                    value={subject.name}
                    onChange={(e) => handleOnChange(index, e)}
                    placeholder="Subject Name"
                    className="h-12 w-full px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div className="flex space-x-4">
                  <div className="w-full">
                    <label
                      htmlFor={`start_time-${index}`}
                      className="block text-lg font-medium mb-1"
                    >
                      Start Time
                    </label>
                    <input
                      type="time"
                      id={`start_time-${index}`}
                      name="start_time"
                      value={convertToHourMinutes(subject.start_time)}
                      onChange={(e) => {
                        handleOnChange(index, e);
                        let endTimeInputField = [...showEndTimeInputField];
                        if (!endTimeInputField[index]) {
                          endTimeInputField[index] = {};
                        }
                        endTimeInputField[index]["start_time"] = e.target.value;
                        setShowEndTimeInputField(endTimeInputField);
                      }}
                      className="h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor={`end_time-${index}`}
                      className="block text-lg font-medium mb-1"
                    >
                      End Time
                    </label>
                    <input
                      disabled={
                        showEndTimeInputField[index]["start_time"].length > 0
                          ? false
                          : true
                      }
                      type="time"
                      id={`end_time-${index}`}
                      name="end_time"
                      value={convertToHourMinutes(subject.end_time)}
                      onChange={(e) => handleOnChange(index, e)}
                      className="h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                      required
                    />
                  </div>
                </div>
                {subject.error && (
                  <p className="text-red-500">{subject.error}</p>
                )}
              </div>
            ))}

            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="flex items-center mt-4 text-indigo-500 hover:text-indigo-700 focus:outline-none text-lg"
                onClick={handleAddSubject}
              >
                <FaPlus className="mr-2" />
                {subjects.length ? "Add Another Subject" : "Add Subjects"}
              </button>

              {subjectsCount > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveSubject(subjectsCount - 1)}
                  className="flex items-center mt-4 text-red-500 hover:text-red-700 focus:outline-none text-lg"
                >
                  <FaMinus className="mr-2" /> Remove Subject
                </button>
              )}
            </div>

            <button
              type="submit"
              className="mt-4 inline-block px-6 py-2.5 bg-indigo-500 text-white font-medium rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SubjectsForm;
