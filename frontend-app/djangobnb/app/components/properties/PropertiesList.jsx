'use client'

import React, { useState, useEffect } from "react";
import PropertiesListItem from "./PropertiesListItem";
import apiService from "../../services/apiServices"

export default function PropertiesList() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get('http://127.0.0.1:8000/api/items/');
        setProperties(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mt-48 md:mt-32">
      {properties.length === 0 ? (
        <div className="flex items-center justify-center h-screen">
          <p className="text-xl">Obecnie brak ofert, odśwież stronę lub spróbuj ponownie później</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {properties.map((property) => (
            <PropertiesListItem key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}
