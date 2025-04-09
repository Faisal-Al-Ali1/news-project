// import React, { useState } from "react";
// // import { Card, CardContent } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";

// // import { MapPin, Calendar, Users, Mail } from "lucide-react";

// const experiences = [
//   {
//     id: 1,
//     title: "استكشاف قبيلة الماساي في كينيا",
//     location: "كينيا",
//     duration: "5 أيام",
//     price: "$1200",
//     description: "رحلة مميزة لاكتشاف ثقافة الماساي وتجربة العيش معهم في قلب الطبيعة.",
//   },
//   {
//     id: 2,
//     title: "رحلة إلى الأمازون مع قبائل السكان الأصليين",
//     location: "البرازيل",
//     duration: "7 أيام",
//     price: "$1800",
//     description: "تجربة غامرة لاستكشاف تقاليد قبائل الأمازون العريقة والتفاعل معهم.",
//   },
// ];

// export default function BookExperience() {
//   const [selectedExperience, setSelectedExperience] = useState(null);
//   const [formData, setFormData] = useState({ name: "", email: "", date: "", people: 1 });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleBooking = (experience) => {
//     setSelectedExperience(experience);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(`تم إرسال طلب الحجز لـ ${selectedExperience.title}`);
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold text-center mb-6">احجز تجربة ثقافية</h1>
//       <div className="grid md:grid-cols-2 gap-6">
//         {experiences.map((exp) => (
//           <Card key={exp.id}>
//             <CardContent className="p-4">
//               <h2 className="text-xl font-semibold">{exp.title}</h2>
//               <p className="text-gray-600 flex items-center gap-2"><MapPin size={16} /> {exp.location}</p>
//               <p className="text-gray-600 flex items-center gap-2"><Calendar size={16} /> {exp.duration}</p>
//               <p className="text-gray-600 flex items-center gap-2"><Users size={16} /> السعر: {exp.price}</p>
//               <p className="text-gray-600 mt-2">{exp.description}</p>
//               <Button className="mt-4 bg-green-600 text-white" onClick={() => handleBooking(exp)}>
//                 احجز الآن
//               </Button>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {selectedExperience && (
//         <div className="mt-10 p-6 bg-gray-100 rounded-lg">
//           <h2 className="text-2xl font-semibold mb-4">احجز تجربة: {selectedExperience.title}</h2>
//           <form onSubmit={handleSubmit} className="grid gap-4">
//             <input type="text" name="name" placeholder="الاسم الكامل" className="p-2 border rounded" onChange={handleChange} required />
//             <input type="email" name="email" placeholder="البريد الإلكتروني" className="p-2 border rounded" onChange={handleChange} required />
//             <input type="date" name="date" className="p-2 border rounded" onChange={handleChange} required />
//             <input type="number" name="people" min="1" placeholder="عدد الأشخاص" className="p-2 border rounded" onChange={handleChange} required />
//             <Button type="submit" className="bg-blue-600 text-white">إرسال الطلب</Button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }
