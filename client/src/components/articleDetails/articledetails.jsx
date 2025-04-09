import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const ArticleDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  // Fetch article details
  const fetchArticle = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8000/api/articles/${id}`, {
        withCredentials: true,
      });
      const { article, relatedArticles, comments, engagementStats } = response.data.data;
      setArticle(article);
      setRelatedArticles(relatedArticles);
      setComments(comments);
      setLikes(engagementStats.likes);
      setViews(engagementStats.views);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('فشل في تحميل المقال.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticle();
    // Check if the article is bookmarked (you can store this in localStorage or backend)
    const bookmarkedArticles = JSON.parse(localStorage.getItem('bookmarkedArticles')) || [];
    setIsBookmarked(bookmarkedArticles.includes(id));
  }, [id]);

  
  const handleLike = async () => {
    try {
      // Send POST request to like/unlike the article
      const response = await axios.post(
        `http://localhost:8000/api/articles/${id}/like`,
        {},
        { withCredentials: true }
      );
  
      if (response.data.success) {
        // Update likes count and toggle like state
        setLikes(response.data.data.likes);
        setIsLiked(!isLiked);
  
      }
    } catch (err) {
      console.error('Error liking article:', err);
  
      // Check if the error is due to unauthorized access (not logged in)
      if (err.response && err.response.status === 401) {
        Swal.fire({
          icon: 'error',
          title: 'غير مسموح',
          text: 'يرجى تسجيل الدخول لتتمكن من الإعجاب بالمقال.',
        });
      } 
    }
  };
  

  // Handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8000/api/articles/${id}/comments`,
        { content: newComment },
        { withCredentials: true }
      );
      setComments([response.data.data, ...comments]);
      setNewComment('');

      Swal.fire({
        icon: 'success',
        title: 'تم إرسال التعليق بنجاح',
        text: 'شكرًا لك على تعليقك!',
        confirmButtonText: 'حسنًا',
        confirmButtonColor: '#28696A',
      });
    } catch (err) {
      console.error('Error adding comment:', err);
      Swal.fire({
        icon: 'error',
        title: 'فشل في إضافة التعليق',
        text: 'يرجى تسجيل الدخول أولاً.',
        confirmButtonText: 'حسنًا',
        confirmButtonColor: '#28696A',
      });
    }
  };

  // Handle report functionality
  const handleReport = async () => {
    const { value: reason } = await Swal.fire({
      title: 'ما سبب التقرير؟',
      input: 'text',
      inputPlaceholder: 'أدخل سبب التقرير...',
      showCancelButton: true,
      confirmButtonText: 'إرسال',
      cancelButtonText: 'إلغاء',
      confirmButtonColor: '#28696A',
      cancelButtonColor: '#d33',
    });
  
    if (reason) {
      try {
        await axios.post(
          `http://localhost:8000/api/articles/${id}/reports`,
          { reason },
          { withCredentials: true }
        );
        Swal.fire({
          icon: 'success',
          title: 'تم تقديم التقرير بنجاح',
          text: 'شكرًا لك على مساهمتك في تحسين المحتوى.',
          confirmButtonText: 'حسنًا',
          confirmButtonColor: '#28696A',
        });
      } catch (err) {
        console.error('Error reporting article:', err);
        Swal.fire({
          icon: 'error',
          title: 'فشل في تقديم التقرير',
          text: 'يرجى تسجيل الدخول أولاً.',
          confirmButtonText: 'حسنًا',
          confirmButtonColor: '#28696A',
        });
      }
    }
  };

  // Handle social media sharing
  const handleShare = (platform) => {
    const url = window.location.href;
    const title = article.title;
    const text = article.content.substring(0, 100);

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(text)}`, '_blank');
        break;
      default:
        break;
    }
    setIsShareOpen(false);
  };

  // Handle bookmark functionality
  const handleBookmark = async () => {
    try {
      // Send PUT request to toggle bookmark state
      const response = await axios.put(
        `http://localhost:8000/user/bookmarks/${id}`,
        {},
        { withCredentials: true }
      );
  
      if (response.data.success) {
        // Toggle bookmark state
        setIsBookmarked(!isBookmarked);
  
        // Show success alert
        Swal.fire({
          icon: 'success',
          title: 'تمت الإضافة إلى المفضلة بنجاح',
          showConfirmButton: false,
          timer: 1500, // Close alert after 1.5 seconds
        });
      } else {
        // Show error alert if the request was not successful
        Swal.fire({
          icon: 'error',
          title: 'فشل في حفظ المقال في المفضلة',
          text: 'يرجى المحاولة مرة أخرى.',
        });
      }
    } catch (err) {
      console.error('Error bookmarking article:', err);
  
      // Show error alert for login issue
      Swal.fire({
        icon: 'error',
        title: 'فشل في حفظ المقال في المفضلة',
        text: 'يرجى تسجيل الدخول أولاً.',
      });
    }
  };
  // Loading state
  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#28696A] to-[#F0E6D7]/30">
      <div className="text-[#213058] text-xl font-semibold">جاري التحميل...</div>
    </div>
  );

  // Error state
  if (error || !article) return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#28696A] to-[#F0E6D7]/30">
      <div className="text-red-600 text-xl font-semibold">{error || 'المقال غير موجود'}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#28696A]/10 to-[#F0E6D7]/20 py-12 px-4 sm:px-6">
      <div className="container mx-auto max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#F0E6D7]">
        <div className="relative">
          <img src={article.featuredImage} alt={article.title} className="w-full h-96 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#213058]/90 to-transparent flex items-end">
            <h1 className="text-4xl md:text-5xl font-bold text-white p-8 rtl:text-right">{article.title}</h1>
          </div>
        </div>

        <div className="p-8">
          <div className="flex items-center justify-between mb-8 border-b border-[#F0E6D7] pb-4">
            <div className="flex items-center space-x-4 rtl:space-x-reverse"></div>
            <div className="flex items-center space-x-4 rtl:space-x-reverse text-[#213058]">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 rtl:ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                {views}
              </span>
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 rtl:ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
                {likes}
              </span>
            </div>
          </div>

          <article className="prose max-w-none mb-10 text-[#213058] leading-relaxed rtl:text-right">
            <p className="whitespace-pre-line">{article.content}</p>
          </article>

          <div className="flex items-center gap-4 mb-10">
{/* زر الإعجاب */}
<button
  onClick={handleLike}
  title="إعجاب"
  className={`p-3 bg-white border border-[#28696A] rounded-full flex items-center hover:bg-[#28696A]/20 transition-colors duration-300`}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-6 w-6 ${isLiked ? 'text-[#28696A]' : 'text-[#28696A]/50'}`} // تغيير لون الأيقونة فقط
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
  </svg>
</button>

{/* زر الحفظ */}
<button
  onClick={handleBookmark}
  title={isBookmarked ? 'تم الحفظ' : 'حفظ'}
  className={`p-3 bg-white border border-[#28696A] rounded-full flex items-center hover:bg-[#28696A]/20 transition-colors duration-300`}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-6 w-6 ${isBookmarked ? 'text-[#28696A]' : 'text-[#28696A]/50'}`} // تغيير لون الأيقونة فقط
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l5-3 5 3V4a2 2 0 00-2-2H5zm0 2h6v12l-3-1.8L5 16V4z" clipRule="evenodd" />
  </svg>
</button>

  {/* زر المشاركة */}
  <div className="relative">
    <button
      onClick={() => setIsShareOpen(!isShareOpen)}
      title="مشاركة"
      className="p-3 bg-white border border-[#28696A] text-[#213058] rounded-full flex items-center hover:bg-[#F0E6D7] transition-colors duration-300"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
        <path d="M15 8a3 3 0 10-5.196-2.02L5 9.586a3 3 0 100 4.828l4.804 3.606A3 3 0 1015 16v-2a1 1 0 00-1-1 1 1 0 00-.553.168l-3.25-2.437a1 1 0 000-1.462l3.25-2.437A1 1 0 0014 7a1 1 0 001-1V4z" />
      </svg>
    </button>
    {isShareOpen && (
      <div className="absolute top-12 rtl:left-0 ltr:right-0 bg-white shadow-lg rounded-lg p-2 z-10 flex gap-2">
        <button
          onClick={() => handleShare('facebook')}
          title="مشاركة على فيسبوك"
          className="p-2 rounded-full hover:bg-[#F0E6D7] transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#28696A]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.234 2.686.234v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </button>
        <button
          onClick={() => handleShare('twitter')}
          title="مشاركة على تويتر"
          className="p-2 rounded-full hover:bg-[#F0E6D7] transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#28696A]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
          </svg>
        </button>
        <button
          onClick={() => handleShare('linkedin')}
          title="مشاركة على لينكد إن"
          className="p-2 rounded-full hover:bg-[#F0E6D7] transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#28696A]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </button>
      </div>
    )}
  </div>

  {/* زر الإبلاغ */}
  <button
    onClick={handleReport}
    title="إبلاغ"
    className="p-3 bg-white border border-[#28696A] text-[#213058] rounded-full flex items-center hover:bg-[#F0E6D7] transition-colors duration-300"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  </button>
</div>

          <div className="bg-[#F0E6D7]/30 p-6 rounded-2xl mb-10">
            <h2 className="text-2xl font-bold text-[#213058] mb-6 flex items-center rtl:text-right">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 rtl:ml-2 text-[#28696A]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              التعليقات ({comments.length})
            </h2>

            <form onSubmit={handleCommentSubmit} className="mb-8">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="أضف تعليقك..."
                className="w-full p-4 border border-[#F0E6D7] rounded-lg mb-3 focus:ring-2 focus:ring-[#28696A] focus:border-transparent resize-none outline-none"
                rows="3"
                required
              />
              <button type="submit" className="px-6 py-2.5 bg-[#28696A] text-white rounded-full hover:bg-[#28696A]/80 transition-colors duration-300 float-right rtl:float-left">
                إرسال التعليق
              </button>
            </form>

            <div className="space-y-4">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment._id} className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-[#28696A] rtl:border-r-4 rtl:border-l-0">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-[#28696A] rounded-full flex items-center justify-center text-white text-sm mr-3 rtl:ml-3">
                        {comment.author?.full_name?.charAt(0) || '?'}
                      </div>
                      <p className="font-medium text-[#213058]">
                        {comment.author && typeof comment.author === 'object' && comment.author.full_name
                          ? comment.author.full_name
                          : 'مجهول'}
                      </p>
                    </div>
                    <p className="text-gray-700 rtl:text-right">{comment.content}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-[#F0E6D7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <p className="mt-4">لا توجد تعليقات بعد</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-[#213058] mb-6 flex items-center rtl:text-right">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 rtl:ml-2 text-[#28696A]" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
              مقالات ذات صلة
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.length > 0 ? (
                relatedArticles.map((related) => (
                  <div key={related._id} className="bg-[#F0E6D7]/30 rounded-xl shadow-sm overflow-hidden border border-[#F0E6D7] hover:shadow-lg transition-shadow duration-300">
                    <a href={`/article/${related._id}`} className="block h-full">
                      <div className="p-5">
                        <h3 className="text-xl font-semibold text-[#213058] mb-3 line-clamp-2">{related.title}</h3>
                        <div className="mt-4 flex justify-end">
                          <span className="text-[#28696A] font-medium inline-flex items-center hover:underline">
                            اقرأ المزيد
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 rtl:ml-1 rtl:transform rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </a>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-8 text-gray-500 bg-[#F0E6D7]/30 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-[#F0E6D7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <p className="mt-4">لا توجد مقالات ذات صلة</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;