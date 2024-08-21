const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = String(date.getFullYear()).slice(2); // Get last two digits of the year
  return `${day}-${month}-${year}`;
};

const formatTime = (time) => {
  let [hour, minute] = time.split(":");
  let ampm = "AM";

  hour = parseInt(hour);
  if (hour >= 12) {
    ampm = "PM";
    if (hour > 12) hour -= 12;
  }
  if (hour === 0) hour = 12;

  return `${hour}:${minute} ${ampm}`;
};
const isEmailValid = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return false;
  }
  return true;
};

const convertToMinutes = (time) => {
  const [hour, minute] = time.split(":").map(Number);

  return hour * 60 + minute;
};

const convertToHourMinutes = (time) => {
  const [timeString, period] = time.split(" ");
  let [hour, minute] = timeString.split(":");
  hour = parseInt(hour);

  if (period === "PM") hour += 12;
  else if (hour < 10) return `0${hour.toString()}:${minute}`;

  return hour.toString() + ":" + minute;
};

const validateTime = (
  timeA,
  timeB,
  currTimeA,
  currTimeB,
  newSubjects,
  index,
  classroomStartTime,
  classroomEndTime
) => {
  if (timeB <= timeA)
    newSubjects[index].error = "incorrect format of Start and End time";
  else if (timeA < classroomStartTime || timeB > classroomEndTime) {
    newSubjects[index].error = "Time should be within the classroom time.";
  } else if (
    (currTimeA < timeA && currTimeB <= timeB && currTimeB >= timeA) ||
    (currTimeA >= timeA && currTimeA <= timeB && currTimeB >= timeB) ||
    (currTimeA >= timeA && currTimeB <= timeB) ||
    (currTimeA <= timeA && currTimeB >= timeB)
  ) {
    newSubjects[index].error = "Subjects should not overlapp";
  } else {
    newSubjects[index].error = "";
  }
};

const handleUpdateSubjectFields = (index, e, subjects, classroom) => {
  const { name, value } = e.target;
  const newSubjects = [...subjects];
  newSubjects[index][name] = value;

  const startMinutes = convertToMinutes(newSubjects[index].start_time);
  const endMinutes = convertToMinutes(newSubjects[index].end_time);

  const classroomTime1 = convertToHourMinutes(classroom.time.start_time);
  const classroomTime2 = convertToHourMinutes(classroom.time.end_time);

  const classroomStartMinutes = convertToMinutes(classroomTime1);
  const classroomEndMinutes = convertToMinutes(classroomTime2);

  newSubjects[index].error = "";

  if (subjects.length === 1) {
    if (startMinutes && endMinutes) {
      if (endMinutes <= startMinutes)
        newSubjects[0].error = "incorrect format of Start and End time";
      else if (
        startMinutes < classroomStartMinutes ||
        endMinutes > classroomEndMinutes
      ) {
        newSubjects[0].error = "Time should be within the classroom time.";
      }
    }
  }

  if (newSubjects[index].error.length === 0) {
    for (let i = 0; i < subjects.length; i++) {
      if (i !== index) {
        const otherStartMinutes = convertToMinutes(subjects[i].start_time);
        const otherEndMinutes = convertToMinutes(subjects[i].end_time);

        validateTime(
          startMinutes,
          endMinutes,
          otherStartMinutes,
          otherEndMinutes,
          newSubjects,
          index,
          classroomStartMinutes,
          classroomEndMinutes
        );
        if (newSubjects[index].error.length !== 0) break;
      }
    }
  }

  return newSubjects;
};

const getUpdatedSubjecsData = (data) => {
  let allInputSubjects = [];
  let index = 0;
  allInputSubjects[index] = {};
  data.forEach((elem, key) => {
    switch (key) {
      case "subject":
        allInputSubjects[index] = { ...allInputSubjects[index], subject: elem };
        break;
      case "start_time":
        allInputSubjects[index] = {
          ...allInputSubjects[index],
          start_time: formatTime(elem),
        };
        break;
      case "end_time":
        allInputSubjects[index] = {
          ...allInputSubjects[index],
          end_time: formatTime(elem),
        };
        index++;
        allInputSubjects[index] = {};
        break;
      default:
        break;
    }
  });

  allInputSubjects.pop();

  return allInputSubjects;
};

const getClassroomData = (formData) => {
  const classRoomData = {
    time: { start_time: null, end_time: null },
    days: { start_date: null, end_date: null },
    students: [],
  };

  formData.forEach((elem, key) => {
    switch (key) {
      case "start_time":
        classRoomData.time = { start_time: formatTime(elem) };
        break;
      case "end_time":
        classRoomData.time = {
          ...classRoomData.time,
          end_time: formatTime(elem),
        };
        break;
      case "start_date":
        classRoomData.days = { start_date: elem };
        break;
      case "end_date":
        classRoomData.days = { ...classRoomData.days, end_date: elem };
        break;
      case "students":
        classRoomData.students.push(elem);
        break;
      default:
        classRoomData[key] = elem;
    }
  });

  return classRoomData;
};

export {
  formatDate,
  isEmailValid,
  formatTime,
  convertToMinutes,
  convertToHourMinutes,
  validateTime,
  handleUpdateSubjectFields,
  getUpdatedSubjecsData,
  getClassroomData,
};
