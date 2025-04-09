import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ReportsSection = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/admin/reports',{withCredentials: true});
      setReports(response.data);
      setLoading(false);
    } catch (err) {
      setError('فشل في جلب التقارير: ' + (err.response?.data?.error || err.message));
      setLoading(false);
      console.error('Fetch Reports Error:', err);
    }
  };

  
  const handleStatusChange = async (reportId, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:8000/admin/reports/${reportId}/status`,{
        status: newStatus,
      },{ withCredentials: true });
      setReports((prevReports) =>
        prevReports.map((report) =>
          report._id === reportId ? { ...report, status: response.data.status } : report
        )
      );
      toast.success('تم تحديث حالة التقرير بنجاح!');
    } catch (error) {
      toast.error('فشل في تحديث حالة التقرير: ' + (error.response?.data?.error || error.message));
    }
  };

  
  useEffect(() => {
    fetchReports();
  }, []);

  
  if (loading) {
    return <div className="text-center p-6">جارٍ التحميل...</div>;
  }
  if (error) {
    return <div className="text-center p-6 text-red-600">{error}</div>;
  }
  if (!reports || reports.length === 0) {
    return <div className="text-center p-6">لا توجد تقارير متاحة حاليًا.</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4">التقارير والعلم</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-right">
              <th className="p-3 text-sm font-semibold">عنوان المقال</th>
              <th className="p-3 text-sm font-semibold">المُبلغ</th>
              <th className="p-3 text-sm font-semibold">السبب</th>
              <th className="p-3 text-sm font-semibold">الحالة</th>
              <th className="p-3 text-sm font-semibold">الإجراء</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report._id} className="border-b">
                <td className="p-3">
                  {report.article?.title || 'مقال غير موجود'}
                </td>
                <td className="p-3">
                  {report.reportedBy?.full_name || report.reportedBy?.username || 'غير معروف'}
                </td>
                <td className="p-3">{report.reason || 'غير محدد'}</td>
                <td className="p-3">{report.status || 'قيد المراجعة'}</td>
                <td className="p-3">
                  <select
                    value={report.status || 'pending'}
                    onChange={(e) => handleStatusChange(report._id, e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="pending">قيد المراجعة</option>
                    <option value="resolved">تم الحل</option>
                    <option value="rejected">مرفوض</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsSection;