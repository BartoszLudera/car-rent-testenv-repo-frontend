"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import apiService from "../services/apiServices";

export default function Categories() {
    // const [categories, setCategories] = useState([]);
    // const [activeCategory, setActiveCategory] = useState("");

    // useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       const response = await apiService.get('http://127.0.0.1:8000/api/categories/');
    //       setCategories(response.data);
    //     } catch (error) {
    //       console.error('Error fetching data:', error);
    //     }
    //   };
    //   fetchData();
    // }, []);


    //     <div className="pt-28 cursor-pointer pb-6 flex items-center space-x-12">
    //         <div
    //             className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
    //                 activeCategory === "" ? "border-black" : "border-white"
    //             } opacity-60 hover:border-gray-200 hover:opacity-100`}
    //             onClick={() => setActiveCategory("")}
    //         >
    //             {/* <Image
    //                 src="/icn_category_beach.jpeg"
    //                 alt="Category - All"
    //                 width={20}
    //                 height={20}
    //             /> */}
    //             <span className="text-xs">All</span>
    //         </div>

    //         {categories.map((category) => (
    //             <div
    //                 key={category.id}
    //                 className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
    //                     activeCategory === category.name ? "border-black" : "border-white"
    //                 } opacity-60 hover:border-gray-200 hover:opacity-100`}
    //                 onClick={() => setActiveCategory(category.name)}
    //             >
    //                 {/* <Image
    //                     // src={`/icn_category_${category.name.toLowerCase()}.jpeg`}
    //                     alt={`Category - ${category.name}`}
    //                     width={20}
    //                     height={20}
    //                 /> */}
    //                 <span className="text-xs">{category.name}</span>
    //             </div>
    //         ))}
    //     </div>
    // );
}
