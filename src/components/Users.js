import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUsers } from "../redux/userSlice";
import { logout } from "../redux/authSlice";

const Users = () => {
  const users = useSelector((state) => state.users.users);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Track current page

  useEffect(() => {
    const storedToken = localStorage.getItem("token"); // Persist login
    if (!token && !storedToken) {
      navigate("/");
    } else {
      fetchUsers(page);
    }
  }, [token, page]);

  const fetchUsers = async (page) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetch(`https://reqres.in/api/users?page=${page}`);
      const data = await response.json();

      const uniqueUsers = data.data.filter(
        (newUser) => !users.some((existingUser) => existingUser.id === newUser.id)
      );

      dispatch(setUsers([...users, ...uniqueUsers])); // Append only unique users
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://reqres.in/api/users/${id}`, { method: "DELETE" });
      dispatch(setUsers(users.filter((user) => user.id !== id))); // Remove user
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEdit = (user) => {
    navigate(`/edit/${user.id}`, { state: user });
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token"); // Clear token from localStorage
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">User List</h2>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user.id} className="bg-white p-4 rounded-lg shadow-md text-center">
            <img src={user.avatar} alt={user.first_name} className="w-20 h-20 rounded-full mx-auto" />
            <p className="text-lg font-semibold">{user.first_name} {user.last_name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
            <div className="mt-4">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                onClick={() => handleEdit(user)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setPage((prev) => prev + 1)} // Fetch next page
          disabled={loading}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
};

export default Users;
