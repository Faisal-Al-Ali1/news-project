import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  User, 
  Lock, 
  Bell, 
  Shield, 
  Save, 
  Eye, 
  EyeOff,
  Camera 
} from 'lucide-react';

const SettingsSection = ({ userProfile: initialProfile }) => {
  const [activeSettingsTab, setActiveSettingsTab] = useState('profile');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: initialProfile.name || '',
    email: initialProfile.email || '',
    avatar: initialProfile.avatar || '',
    role: initialProfile.role || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: initialProfile.twoFactorEnabled || false,
    notificationsEnabled: initialProfile.notificationsEnabled || false,
    emailNotifications: true,
    systemAlerts: true,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // جلب بيانات المستخدم عند تحميل المكون
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/admin/profile', {
          withCredentials: true, // لإرسال الكوكيز مع الطلب
        });
        const userData = response.data;
        setFormData(prev => ({
          ...prev,
          name: userData.name,
          email: userData.email,
          avatar: userData.avatar,
          role: userData.role,
          twoFactorEnabled: userData.twoFactorEnabled,
          notificationsEnabled: userData.notificationsEnabled,
        }));
        setLoading(false);
      } catch (err) {
        setError('فشل في جلب بيانات المستخدم: ' + (err.response?.data?.message || err.message));
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, avatar: imageUrl }));
      console.log('صورة جديدة مختارة:', file);
    }
  };

  const handleImageRemove = () => {
    setFormData(prev => ({ ...prev, avatar: '' }));
    console.log('تم إزالة الصورة');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateData = new FormData();
      updateData.append('name', formData.name);
      updateData.append('email', formData.email);
      if (typeof formData.avatar !== 'string') {
        updateData.append('avatar', e.target.avatar.files[0]);
      }
      updateData.append('twoFactorEnabled', formData.twoFactorEnabled);
      updateData.append('notificationsEnabled', formData.notificationsEnabled);
      updateData.append('emailNotifications', formData.emailNotifications);
      updateData.append('systemAlerts', formData.systemAlerts);

      await axios.put('http://localhost:8000/admin/profile', updateData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('تم حفظ البيانات:', Object.fromEntries(updateData));
      alert('تم حفظ التغييرات بنجاح');
    } catch (error) {
      console.error('فشل في حفظ التغييرات:', error);
      alert('فشل في حفظ التغييرات: ' + (error.response?.data?.message || error.message));
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const settingsTabs = [
    { id: 'profile', label: 'الملف الشخصي', icon: <User size={20} /> },
    { id: 'security', label: 'الأمان', icon: <Lock size={20} /> },
    { id: 'notifications', label: 'الإشعارات', icon: <Bell size={20} /> },
  ];

  const renderTabContent = () => {
    if (loading) return <div className="text-center p-6">جارٍ التحميل...</div>;
    if (error) return <div className="text-center p-6 text-red-600">{error}</div>;

    switch (activeSettingsTab) {
      case 'profile':
        return (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-2/3 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                    الدور
                  </label>
                  <input
                    type="text"
                    id="role"
                    value={formData.role}
                    className="w-full px-3 py-2 border rounded-md bg-gray-50"
                    disabled
                  />
                </div>
              </div>

              <div className="w-full md:w-1/3">
                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32 mb-4">
                      <div className="w-full h-full bg-gray-200 rounded-full overflow-hidden">
                        {formData.avatar ? (
                          <img src={formData.avatar} alt="صورة المستخدم" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-500">
                            لا توجد صورة
                          </div>
                        )}
                      </div>
                      <label htmlFor="avatar" className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer">
                        <Camera size={18} />
                        <input
                          type="file"
                          id="avatar"
                          name="avatar"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <button
                      type="button"
                      onClick={handleImageRemove}
                      className="px-4 py-2 border border-gray-300 rounded-md w-full"
                    >
                      إزالة الصورة
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center">
                <Save size={18} className="ml-2" />
                حفظ التغييرات
              </button>
            </div>
          </form>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Lock size={20} className="ml-2" />
                تغيير كلمة المرور
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    كلمة المرور الحالية
                  </label>
                  <div className="relative">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      id="currentPassword"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md"
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    كلمة المرور الجديدة
                  </label>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    تأكيد كلمة المرور
                  </label>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>

                <div className="flex justify-end">
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center">
                    <Save size={18} className="ml-2" />
                    حفظ كلمة المرور
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Shield size={20} className="ml-2" />
                المصادقة الثنائية
              </h3>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-700">تفعيل المصادقة الثنائية</p>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="twoFactorEnabled"
                    checked={formData.twoFactorEnabled}
                    onChange={handleChange}
                    className="ml-2"
                  />
                  <span>{formData.twoFactorEnabled ? "مفعل" : "غير مفعل"}</span>
                </label>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Bell size={20} className="ml-2" />
              إعدادات الإشعارات
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">تفعيل الإشعارات</span>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="notificationsEnabled"
                    checked={formData.notificationsEnabled}
                    onChange={handleChange}
                    className="ml-2"
                  />
                  <span>{formData.notificationsEnabled ? "مفعل" : "غير مفعل"}</span>
                </label>
              </div>
              
              {formData.notificationsEnabled && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">إشعارات البريد الإلكتروني</span>
                    <input
                      type="checkbox"
                      name="emailNotifications"
                      checked={formData.emailNotifications}
                      onChange={handleChange}
                      className="ml-2"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">تنبيهات النظام</span>
                    <input
                      type="checkbox"
                      name="systemAlerts"
                      checked={formData.systemAlerts}
                      onChange={handleChange}
                      className="ml-2"
                    />
                  </div>
                </div>
              )}
              
              <div className="flex justify-end">
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center">
                  <Save size={18} className="ml-2" />
                  حفظ التغييرات
                </button>
              </div>
            </form>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6" dir="rtl">
      <div className="w-full md:w-1/4">
        <div className="bg-white p-4 rounded-lg border">
          <ul className="space-y-2">
            {settingsTabs.map((tab) => (
              <li
                key={tab.id}
                className={`p-2 rounded cursor-pointer flex items-center ${activeSettingsTab === tab.id ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveSettingsTab(tab.id)}
              >
                {tab.icon}
                <span className="mr-2">{tab.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-full md:w-3/4">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default SettingsSection;