import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getClassroomData } from "../HelperFunctions/helper";

const API_URL = import.meta.env.VITE_API_URL;

const handleUpdateClassroom = async (data, classroom) => {
  try {
    const res = await fetch(`${API_URL}/classroom/${classroom._id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
};

const handleCreateClassroom = async (formData) => {
  const classRoomData = getClassroomData(formData);

  try {
    const response = await fetch(`${API_URL}/classroom/new`, {
      method: "POST",
      body: JSON.stringify(classRoomData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      toast.success("New classroom created successfully");
      window.location.href = "/";
    }
  } catch (error) {
    toast.error("Something went wrong");
  }
};

export { handleUpdateClassroom, handleCreateClassroom };
