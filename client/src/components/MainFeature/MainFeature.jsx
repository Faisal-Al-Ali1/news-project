
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function MainFeature() {
//   const [article, setArticle] = useState(null);

//   useEffect(() => {
//     // Fetch most liked article
//     axios.get('http://localhost:8000/api/most-liked')
//       .then(response => {
//         setArticle(response.data[0]); // We expect only one article to be returned
//       })
//       .catch(error => {
//         console.error("There was an error fetching the article!", error);
//       });
//   }, []);

//   if (!article) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
//       <div className="relative">
//       <h3 className=" mb-6 text-black align-super font-bold">الأكثر اعجابا </h3>
//       <img 
//           src={article.featuredImage || 'default-image.jpg'} 
//           alt="Main feature image" 
//           className="w-full h-100 object-cover"
//         />
//         <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
//           <h2 className="text-3xl font-bold text-white mb-2">{article.title}</h2>
//           <p className="text-white">{article.content}</p>
//         </div>
//       </div>
    
//     </div>
//   );
// }

// export default MainFeature;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // استيراد Link من react-router-dom

function MainFeature() {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    // جلب المقال الأكثر إعجابًا
    axios.get('http://localhost:8000/api/most-liked')
      .then(response => {
        setArticle(response.data[0]); // نتوقع أن يتم إرجاع مقال واحد فقط
      })
      .catch(error => {
        console.error("There was an error fetching the article!", error);
      });
  }, []);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="relative">
        <h3 className="mb-6 text-black font-bold">الأكثر إعجابًا</h3>
        
        {/* رابط حول الصورة والعنوان */}
        <Link to={`/article/${article._id}`}>
          <img 
            src={article.featuredImage || 'default-image.jpg'} 
            alt="Main feature image" 
            className="w-full h-100 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
            <h2 className="text-3xl font-bold text-white mb-2">{article.title}</h2>
            <p className="text-white">{article.content}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default MainFeature;

