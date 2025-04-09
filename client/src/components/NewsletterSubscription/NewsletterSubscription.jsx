import { useState } from 'react';
import axios from 'axios';

export default function NewsletterSubscription() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // دالة الاشتراك
  const handleSubscribe = async (e) => {
    e.preventDefault();

    // التحقق من صحة البريد الإلكتروني
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('يرجى إدخال بريد إلكتروني صالح');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/subscribe', { email });
      setSuccess('تم الاشتراك بنجاح في النشرة الإخبارية!');
      setEmail('');
      setError('');
    } catch (err) {
      setError('حدث خطأ أثناء الاشتراك. يرجى المحاولة لاحقًا.');
    }
  };

  return (
    <div className="max-w-md mx-auto text-center mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">اشترك في نشرتنا الإخبارية</h2>
      
      <form onSubmit={handleSubscribe} className="flex flex-col items-center">
        <input
          type="email"
          placeholder="أدخل بريدك الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 w-full max-w-xs mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F4AE3F]"
        />
        <button 
          type="submit"
          className="px-6 py-2 bg-[#F4AE3F] text-white rounded-lg hover:bg-[#c88c2a] transition"
        >
          اشترك
        </button>
      </form>
      
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}
    </div>
  );
}
