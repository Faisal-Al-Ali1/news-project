import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Profile() {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/api/journalist/profile", { withCredentials: true })
      .then((response) => {
        setProfile(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        setError("Failed to fetch profile. Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-4">Loading profile...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-4">الملف الشخصي</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">الاسم</label>
          <input
            type="text"
            value={profile.name}
            className="w-full px-4 py-2 border rounded-md"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">البريد الإلكتروني</label>
          <input
            type="email"
            value={profile.email}
            className="w-full px-4 py-2 border rounded-md"
            readOnly
          />
        </div>
        <button className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">
          تعديل الملف الشخصي
        </button>
      </div>
    </div>
  );
}