'use client';

import React from 'react';

export default function ImageUpload({ images, setImages }) {
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files).filter((file) =>
      file.type.startsWith('image/')
    );

    if (newFiles.length + images.length > 8) {
      alert('You can only upload a maximum of 8 images.');
      return;
    }

    const newImageFiles = newFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prevImages) => [...prevImages, ...newImageFiles]);
  };

  const removeImage = (index) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  return (
    <div className="space-y-2 pt-4">
      <p>*Wybierz zdjęcia - pierwsze zdjęcie to zdjęcie widoczne na stronie głównej</p>
      <div className="grid grid-cols-3 gap-2">
        <label className="w-full h-48 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl cursor-pointer">
          <span className="text-gray-500">Dodaj zdjęcia (max. 8 zdjęć)</span>
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            multiple
            accept="image/*"
          />
        </label>
        {images.map((image, index) => (
          <div key={index} className="relative w-full h-48">
            <img
              src={image.preview}
              alt={`Preview ${index}`}
              className="w-full h-full object-cover rounded-md"
            />
            {index === 0 && (
              <span className="absolute top-0 left-0 bg-airbnb text-white rounded-br-lg px-2 py-1 text-xs">
                Zdjęcie główne
              </span>
            )}
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-0 right-0 bg-airbnb text-white rounded-full p-1 text-xs"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
