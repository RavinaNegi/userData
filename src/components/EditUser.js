import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/userSlice";

const EditUser = () => {
  const { state: user } = useLocation();
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://reqres.in/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ first_name: firstName, last_name: lastName, email }),
      });

      if (response.ok) {
        const updatedUser = { id: user.id, first_name: firstName, last_name: lastName, email };
        dispatch(updateUser(updatedUser)); // ✅ Update Redux store
        
        navigate("/users");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h2 className="text-3xl font-bold mb-6">Edit User</h2>
      <form className="bg-white p-6 rounded-lg shadow-md w-80" onSubmit={handleUpdate}>
        <input
          type="text"
          className="w-full p-2 mb-4 border rounded"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          className="w-full p-2 mb-4 border rounded"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="email"
          className="w-full p-2 mb-4 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="bg-blue-500 text-white px-4 py-2 w-full rounded hover:bg-blue-600" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditUser;
