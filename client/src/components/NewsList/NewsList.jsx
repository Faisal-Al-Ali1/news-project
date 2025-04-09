// import React from 'react';

// const newsArticles = [
//   { id: 1, category: 'حيونات', image: 'animal.jpg' },
//   { id: 2, category: 'علوم', image: 'scince.jpg' },
//     { id: 3, category: 'قبائل', image: 'Tribes.jpg' },
//     { id: 4, category: 'ترحال', image: 'travel.jpg' },
//     { id: 5, category: 'طعام وصحة', image: 'health.jpg' },
//     { id: 6, category: 'استكشاف', image: 'exploration.jpg' },

// ];

// const NewsList = () => {
//     return (
//         <div className="text-center p-6">
//             <h2 className="text-3xl font-bold text- mb-6">
//                 أحدث الأخبار في مختلف المجالات
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                 {newsArticles.map(article => (
//                     <div
//                         key={article.id}
//                         className="relative rounded-3xl p-6 flex flex-col justify-end items-center text-white"
//                         style={{
//                             backgroundImage: url(`${article.image}`),
//                             backgroundSize: 'cover',
//                             backgroundPosition: 'center',
//                             height: '200px'
//                         }}
//                     >
//                         <div className="absolute inset-0 bg-black/50 rounded-3xl"></div>
//                         <span className="relative text-teal-50 font-bold">
//                             {article.category}
//                         </span>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default NewsList;