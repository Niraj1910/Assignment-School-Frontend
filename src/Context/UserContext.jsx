import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [allClassRooms, setAllClassRooms] = useState([]);
  const [allTeachers, setAllTeachers] = useState([]);
  const [allStudents, setAllStudents] = useState([]);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        allTeachers,
        setAllTeachers,
        allClassRooms,
        setAllClassRooms,
        allStudents,
        setAllStudents,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
