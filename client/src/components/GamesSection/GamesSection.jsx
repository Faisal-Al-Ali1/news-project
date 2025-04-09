// import React from "react";

// const games = [
//   {
//     title: "سودوكو",
//     description: "لعبة سودوكو تنشر يوميًا لمحبي ألغاز الأرقام.",
//     icon: "📊", // يمكنك استبدالها بأيقونة SVG أو صورة
//   },
//   {
//     title: "الكلمات المتقاطعة",
//     description: "اختر قاموسك اللغوي مع لعبة الكلمات المتقاطعة يوميًا.",
//     icon: "✏️", // يمكنك استبدالها بأيقونة SVG أو صورة
//   },
// ];

// const GamesSection = () => {
//   return (
//     <section className="bg-gray-100 py-10">
//       <div className="max-w-6xl mx-auto px-6">
//         <h2 className="text-2xl font-bold mb-6 text-right">ألعاب</h2>
//         <div className="grid md:grid-cols-2 gap-6">
//           {games.map((game, index) => (
//             <div
//               key={index}
//               className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4"
//             >
//               <div className="text-4xl">{game.icon}</div>
//               <div className="text-right">
//                 <h3 className="text-xl font-bold">{game.title}</h3>
//                 <p className="text-gray-600">{game.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default GamesSection;
import React from "react";
import { useNavigate } from "react-router-dom";


const games = [
  {
    title: "سودوكو",
    description: "لعبة سودوكو تنشر يوميًا لمحبي ألغاز الأرقام.",
    // icon: "📊", // يمكنك استبدالها بأيقونة SVG أو صورة
    path: "/sudoku", // رابط اللعبة
  },
  {
    title: "سولتير ",
    description: "استمتع معنا مع لعبة سولتير  لمحبين العاب الاوراق .",
    // icon: "✏️", // يمكنك استبدالها بأيقونة SVG أو صورة
    path: "/cutwordgame", // رابط اللعبة
  },
];

const GamesSection = () => {
  const navigate = useNavigate(); // لاستخدام التنقل بين الصفحات

  return (
    <section className="bg-[] py-10">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-6 text-right">ألعاب</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {games.map((game, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-[#28696A] via-[#213058] to-[#213058] shadow-md rounded-lg p-6 flex flex-col items-center text-center"
            >
              <div className="text-5xl mb-4">{game.icon}</div>
              <h3 className=" text-amber-50 text-xl font-bold">{game.title}</h3>
              <p className="text-amber-300 m-5">{game.description}</p>
              
              {/* زر التوجه إلى صفحة اللعبة */}
              <button
                onClick={() => navigate(game.path)}
                className="mt-2 px-6 py-2 bg-[#F4AE3F] text-white rounded-lg shadow hover:bg-blue-500 transition"
              >
                العب الآن
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GamesSection;
