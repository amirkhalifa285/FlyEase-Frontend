// import React, { useState } from "react";
// import api from "../api";

// const ServiceBooking = () => {
//   const [hotels, setHotels] = useState([]);
//   const [cityCode, setCityCode] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const fetchHotels = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const response = await api.get(`/services/hotels`, {
//         params: { city_code: cityCode },
//       });
//       setHotels(response.data.data || []); // Assuming `data` contains the hotel list
//     } catch (err) {
//       console.error("Error fetching hotels:", err);
//       setError("Unable to fetch hotels. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-10 bg-gray-100 min-h-screen">
//       <h1 className="text-4xl font-bold text-center mb-8">Service Booking</h1>

//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Enter city code (e.g., NYC)"
//           value={cityCode}
//           onChange={(e) => setCityCode(e.target.value)}
//           className="border p-2 rounded w-full"
//         />
//         <button
//           onClick={fetchHotels}
//           className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Search Hotels
//         </button>
//       </div>

//       {loading && <p>Loading hotels...</p>}
//       {error && <p className="text-red-500">{error}</p>}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {hotels.map((hotel) => (
//           <div key={hotel.hotel.hotelId} className="bg-white p-4 shadow rounded">
//             <h2 className="text-xl font-bold">{hotel.hotel.name}</h2>
//             <p>{hotel.hotel.description?.text || "No description available."}</p>
//             <p>
//               Address:{" "}
//               {hotel.hotel.address.lines.join(", ")}, {hotel.hotel.address.cityName}
//             </p>
//             <p>Price: ${hotel.offers[0]?.price.total || "N/A"}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ServiceBooking;
