import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const UsersSection = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/admin/users', { withCredentials: true });
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError('فشل في جلب المستخدمين: ' + (err.response?.data?.error || err.message));
      setLoading(false);
      console.error('Fetch Users Error:', err);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/admin/users/${userId}/role`,
        { role: newRole },
        { withCredentials: true }
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: response.data.role } : user
        )
      );
      toast.success('تم تحديث دور المستخدم بنجاح!');
    } catch (error) {
      toast.error('فشل في تحديث الدور: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleStatusToggle = async (userId) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/admin/users/${userId}/status`,
        {}, // لا حاجة لبيانات في الجسم لأننا فقط نتبدل الحالة
        { withCredentials: true }
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isDeleted: response.data.isDeleted } : user
        )
      );
      toast.success('تم تبديل حالة المستخدم بنجاح!');
    } catch (error) {
      toast.error('فشل في تبديل الحالة: ' + (error.response?.data?.error || error.message));
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <div className="text-center p-6">جارٍ التحميل...</div>;
  }
  if (error) {
    return <div className="text-center p-6 text-red-600">{error}</div>;
  }
  if (!users || users.length === 0) {
    return <div className="text-center p-6">لا توجد مستخدمين متاحين حاليًا.</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-4" dir="rtl">
      <h3 className="text-lg font-semibold mb-4">إدارة المستخدمين</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-right">
              <th className="p-3 text-sm font-semibold">الاسم</th>
              <th className="p-3 text-sm font-semibold">البريد الإلكتروني</th>
              <th className="p-3 text-sm font-semibold">الدور</th>
              <th className="p-3 text-sm font-semibold">الحالة</th>
              <th className="p-3 text-sm font-semibold">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="p-3">
                  {user.full_name || user.username || 'غير معروف'}
                </td>
                <td className="p-3">{user.email || 'غير محدد'}</td>
                <td className="p-3">
                  <select
                    value={user.role || 'reader'}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="reader">قارئ</option>
                    <option value="journalist">صحفي</option>
                    <option value="admin">مدير</option>
                  </select>
                </td>
                <td className="p-3">
                  {user.isDeleted ? 'معطل' : 'مفعّل'}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleStatusToggle(user._id)}
                    className={`px-3 py-1 rounded text-white ${
                      user.isDeleted ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    {user.isDeleted ? 'تفعيل' : 'تعطيل'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersSection;