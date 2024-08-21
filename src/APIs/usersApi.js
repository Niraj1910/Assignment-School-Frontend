import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isEmailValid } from "../HelperFunctions/helper";

const API_URL = import.meta.env.VITE_API_URL;

const handleRegisterUser = async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const signupData = {};
  formData.forEach((value, key) => (signupData[key] = value));

  try {
    const res = await fetch(`${API_URL}/api/user/register`, {
      method: "POST",
      body: JSON.stringify(signupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 201) {
      toast.success("🎉 Registration Successful!");
      form.reset();
    }
  } catch (error) {
    console.error("Registration error:", error);
    toast.error("Registration Failed!");
  }
};
const handleUserLogin = async (e, navigate) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const singInData = {};
  formData.forEach((value, key) => (singInData[key] = value));

  try {
    const response = await fetch(`${API_URL}/api/user/login`, {
      method: "POST",
      body: JSON.stringify(singInData),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const res = await response.json();
    if (response.status === 200) {
      navigate("/");
    } else {
      toast.error(`${res.message}`);
    }
  } catch (error) {
    console.error("error -> ", error);
    toast.error(`Something went wrong`);
  }
};

const fetchUserData = async (setUserData, navigate) => {
  try {
    const response = await fetch(`${API_URL}/api/user/decode-token`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();

      setUserData({
        name: data.payload.name,
        email: data.payload.email,
        role: data.payload.role,
      });
    } else {
      console.error("Failed to decode token:", response.statusText);
      setUserData(null);

      navigate("/sign-in");
    }
  } catch (error) {
    console.error("Error fetching token payload:", error);
    setUserData(null);

    navigate("/sign-in");
  }
};

const getAllUsers = async (setAllTeachers, setAllStudents) => {
  try {
    const response = await fetch(`${API_URL}/api/user/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();

      data.forEach((user) => {
        switch (user.role) {
          case "Teacher":
            setAllTeachers((prevTeachers) => [...prevTeachers, user]);
            break;
          case "Student":
            setAllStudents((prevStudents) => [...prevStudents, user]);
            break;
          default:
            break;
        }
      });
    }
  } catch (error) {
    console.error("Error fetching all users:", error);
  }
};

const handleDelete = async (
  selectedUser,
  setAllTeachers,
  setAllStudents,
  handleFormClose
) => {
  if (!isEmailValid(selectedUser.email))
    return toast.error("Please enter a valid email address.");

  try {
    const res = await fetch(`${API_URL}/api/user/update/${selectedUser._id}`, {
      method: "DELETE",
    });

    const response = await res.json();
    if (res.status == 200) {
      toast.success(response.message);
      setAllStudents([]);
      setAllTeachers([]);
      getAllUsers(setAllStudents, setAllTeachers);
      handleFormClose();
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};

const handleUpdate = async (
  selectedUser,
  setAllTeachers,
  setAllStudents,
  handleFormClose
) => {
  if (!isEmailValid(selectedUser.email))
    return toast.error("Please enter a valid email address.");

  try {
    const res = await fetch(`${API_URL}/api/user/update/${selectedUser._id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: selectedUser.name,
        email: selectedUser.email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await res.json();
    if (res.status == 200) {
      toast.success(response.message);
      setAllStudents([]);
      setAllTeachers([]);
      getAllUsers(setAllStudents, setAllTeachers);
      handleFormClose();
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};

export {
  fetchUserData,
  handleRegisterUser,
  getAllUsers,
  handleDelete,
  handleUpdate,
  handleUserLogin,
};
