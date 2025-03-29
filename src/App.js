import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Users from "./components/Users";
import EditUser from "./components/EditUser";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/edit/:id" element={<EditUser />} />
      </Routes>
    </Router>
  );
}

export default App;
