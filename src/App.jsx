import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import { UserProvider } from "./Context/UserContext";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<Login />} />
          {/* <Route path="/sign-up" element={<Register />} /> */}
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
