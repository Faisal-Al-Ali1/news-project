import { useState } from "react";
import axios from "axios";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/contact", formData, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 201) {
        setSuccess(true);
        setFormData({ email: "", name: "", message: "" });
      }
    } catch (error) {
      console.error("❌ خطأ أثناء إرسال الرسالة:", error);
      alert(error.response?.data?.error || "حدث خطأ أثناء إرسال رسالتك.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#213058] to-[#28696A] min-h-screen flex items-center justify-center px-4" dir="rtl">
      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-lg w-full border-t-4 border-[#F4AE3F]">
        <h2 className="text-3xl font-bold text-[#213058] text-center mb-4">
          تواصل معنا 📩
        </h2>
        <p className="text-center text-gray-600 mb-6">
          لديك استفسار أو اقتراح؟ لا تتردد في مراسلتنا وسنكون سعداء بالرد عليك!  
        </p>

        {success && (
          <p className="text-green-600 text-center mb-4">
            ✅ تم إرسال رسالتك بنجاح!
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 text-right">
              الاسم الكامل
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F4AE3F] focus:border-[#F4AE3F] bg-gray-100"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-right">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F4AE3F] focus:border-[#F4AE3F] bg-gray-100"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 text-right">
              رسالتك
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F4AE3F] focus:border-[#F4AE3F] bg-gray-100"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#F4AE3F] text-white py-3 rounded-md font-semibold text-lg shadow-md hover:bg-[#213058] transition duration-300"
            disabled={loading}
          >
            {loading ? "جارٍ الإرسال..." : "إرسال الرسالة"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
