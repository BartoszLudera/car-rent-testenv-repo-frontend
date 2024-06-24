"use client";

import React, { useState, useRef, useEffect } from "react";
import useAddOfferModal from "../../hooks/useAddOfferModal";
import Modal from "./Modal";
import CustomButton from "../forms/CustomButton";
import apiService from "../../services/apiServices";
import { getUsernameToken, get_categories } from "../../lib/action";

export default function AddNewOffert() {
  const addOffertModal = useAddOfferModal();
  const fileInputRef = useRef(null);
  const [categories, setCategories] = useState([])

  useEffect(() => {
    async function fetchCategories() {
      const categories = await get_categories();
      setCategories(categories);
    }

    fetchCategories();
  }, []);

  const [category_name, setCategory_name] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState([]);

  const validateForm = () => {
    const newErrors = [];
    if (!category_name) newErrors.push("Category name is required.");
    if (!title) newErrors.push("Title is required.");
    if (!description) newErrors.push("Description is required.");
    if (images.length === 0) newErrors.push("Images are required.");
    return newErrors;
  };

  const submitAddNewOffert = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (formErrors.length > 0) {
      setErrors(formErrors);
      return;
    }

    const username = await getUsernameToken();
    const currentDate = new Date().toISOString();

    const formData = new FormData();
    formData.append("category_name", category_name);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("is_sold", false);
    formData.append("created_by", username);
    formData.append("created_at", currentDate);
    formData.append("updated_at", currentDate);
    images.forEach(image => formData.append("images", image.file));

    try {
      const response = await apiService.postForm("http://127.0.0.1:8000/api/items/", formData);
      console.log("Form submitted successfully", response.data);
      // Reset the form
      setCategory_name("");
      setTitle("");
      setDescription("");
      setPrice("");
      setImages([]);
      setErrors([]);
      addOffertModal.close();
    } catch (error) {
      console.error("Error submitting the form:", error);
      setErrors([error.message]);
    }
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files).map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setImages(prevImages => [...prevImages, ...newFiles]);
  };

  const removeImage = (index) => {
    setImages(prevImages => {
      const newImages = [...prevImages];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
    fileInputRef.current.value = null; 
  };

  const content = (
    <form className="space-y-4">
      <div>
      <select
        value={category_name}
        onChange={(e) => setCategory_name(e.target.value)}
        className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
      >
        <option value="" disabled>Select Category</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
      <input
        placeholder="Title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
      />
      <input
        placeholder="Description"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
      />
      <input
        placeholder="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
      />
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        multiple
      />
      <div className="flex flex-wrap gap-2 mt-2">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img src={image.preview} alt={`Preview ${index}`} className="h-24 w-24 object-cover rounded-md" />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      {errors.length > 0 && (
        <div className="p-5 bg-red-500 text-white rounded-xl opacity-80">
          {errors.map((error, index) => (
            <div key={`error_${index}`}>{error}</div>
          ))}
        </div>
      )}
      <CustomButton label="Add new offert" onClick={submitAddNewOffert} />
    </form>
  );

  return (
    <Modal
      isOpen={addOffertModal.isOpen}
      close={addOffertModal.close}
      label="Add new offer"
      content={content}
    />
  );
}
