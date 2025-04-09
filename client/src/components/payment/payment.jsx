import React, { useState } from "react";
import axios from "axios";

const PaymentPage = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    if (!validateInputs()) {
      setIsProcessing(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/payment", {
        cardNumber,
        cardHolder,
        expiryDate,
        cvv,
      });

      if (response.data.success) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Error during payment:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const validateInputs = () => {
    let validationErrors = {};

    if (!cardHolder.trim()) {
      validationErrors.cardHolder = "يرجى إدخال اسم حامل البطاقة.";
    }

    if (!cardNumber || !/^\d{4} \d{4} \d{4} \d{4}$/.test(cardNumber)) {
      validationErrors.cardNumber = "يرجى إدخال رقم بطاقة صالح.";
    }

    if (!expiryDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      validationErrors.expiryDate = "يرجى إدخال تاريخ انتهاء صالح (MM/YY).";
    }

    if (!cvv || !/^\d{3}$/.test(cvv)) {
      validationErrors.cvv = "يرجى إدخال رمز أمان صالح.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    return parts.length ? parts.join(" ") : value;
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#213058] to-[#28696A] p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-md">
          <div className="mb-4 flex justify-center">
            <div className="h-16 w-16 bg-green-500 rounded-full flex items-center justify-center">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">تم الدفع بنجاح! 🎉</h2>
          <p className="text-gray-600 mb-6">شكراً لك، تم إتمام عملية الدفع بنجاح.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#F4AE3F] text-white py-2 px-4 rounded-md hover:bg-yellow-500 w-full"
          >
            العودة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#213058] to-[#28696A] p-4" dir="rtl">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-[#213058] mb-6 text-center">إتمام الدفع</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700">اسم حامل البطاقة</label>
            <input
              type="text"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#F4AE3F]"
              placeholder="الاسم الكامل"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              required
            />
            {errors.cardHolder && <p className="text-red-500 text-sm">{errors.cardHolder}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700">رقم البطاقة</label>
            <input
              type="text"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#F4AE3F]"
              placeholder="XXXX XXXX XXXX XXXX"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              maxLength={19}
              required
            />
            {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
          </div>

          <div className="flex mb-4 gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-bold text-gray-700">تاريخ الانتهاء</label>
              <input
                type="text"
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#F4AE3F]"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                maxLength={5}
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-bold text-gray-700">CVV</label>
              <input
                type="text"
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#F4AE3F]"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                maxLength={3}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#F4AE3F] text-white py-3 px-4 rounded-md w-full hover:bg-yellow-500"
            disabled={isProcessing}
          >
            {isProcessing ? "جاري المعالجة..." : "إتمام الدفع"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
