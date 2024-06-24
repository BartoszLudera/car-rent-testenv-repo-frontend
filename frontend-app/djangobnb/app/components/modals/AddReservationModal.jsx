"use client";

import useReservationModal from "../../hooks/useReservationModal";
import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import CustomButton from "../forms/CustomButton";
import DatePicker from "../../components/forms/Calendar";
import apiService from "../../services/apiServices";
import { get_userdetails } from "../../lib/action";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function AddReservationModal({ id }) {
  const reservationModal = useReservationModal();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [carDetails, setCarDetails] = useState(null);
  const [errors, setErrors] = useState([]);
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get(
          `http://127.0.0.1:8000/api/items/${id}/`
        );
        setCarDetails(response.data);
        console.log("Car details fetched:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    if (carDetails) {
      const getUserData = async () => {
        try {
          const _userData = await get_userdetails(carDetails.created_by);
          setUserDetails(_userData);
          console.log("User details fetched:", userDetails);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };

      getUserData();
    }
  }, [carDetails]);

  const handleSelect = (ranges) => {
    setSelectionRange(ranges.selection);
  };

  const handleSubmit = async () => {
    if (!carDetails || !userDetails) {
      setErrors(["Missing car details or user details"]);
      return;
    }

    const number_of_days =
      (selectionRange.endDate - selectionRange.startDate) / (1000 * 60 * 60 * 24);

    const reservation_form = {
      item_id: carDetails.id,
      item_title: carDetails.title,
      start_date: selectionRange.startDate.toISOString().split('T')[0],
      end_date: selectionRange.endDate.toISOString().split('T')[0],
      number_of_days: number_of_days,
      customer_name: name,
      customer_surname: surname,
      customer_phonenumber: phonenumber,
      customer_city: city,
      details_from_customer: description,
      customer_mail: email,
      company_name: userDetails.visible_name,
      company_visible_mail: userDetails.email,
      company_phonenumber: userDetails.contact_phonenumber,
      company_website: userDetails.website || "1",
      company_city: userDetails.city,
    };

    try {
      const response = await apiService.postWithoutToken(
        "http://127.0.0.1:8000/api/reservations/",
        reservation_form
      );
      console.log("Form submitted successfully", response.data);
      // Reset the form or close the modal here
      reservationModal.close();
    } catch (error) {
      console.error("Error submitting the form:", error);
      setErrors([error.message]);
    }
  };

  if (!carDetails) {
    return <div>Loading...</div>;
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

const content = (
  <div className="flex flex-col lg:flex-row gap-4 h-96 overflow-y-auto lg:pr-4 p-4">
    <div className="w-full lg:w-1/2">
      <DatePicker
        value={selectionRange}
        onChange={handleSelect}
        bookedDates={[]}
      />
    </div>
    <div className="flex flex-col w-full lg:w-1/2">
      <h2 className="text-xl font-bold mb-2">{carDetails.title}</h2>
      <p>{carDetails.location}</p>
      <p>
        Dostawa pod wskazany adres:{" "}
        {carDetails.delivery_to_customer ? "Tak" : "Nie"}
      </p>
      <p>
        Kaucja:{" "}
        {carDetails.deposit === "0.0" ? "Brak" : `${carDetails.deposit} zł`}
      </p>
      <div className="overflow-y-auto my-4" style={{ maxHeight: "150px" }}>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b py-2">Rent period</th>
              <th className="border-b py-2">Price per one day</th>
            </tr>
          </thead>
          <tbody>
            {carDetails.prices.map((price, index) => (
              <tr key={index}>
                <td className="border-b py-2">{price.title}</td>
                <td className="border-b py-2">{price.price} zł</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <form className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Imię"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-12 px-4 border border-gray-300 rounded-xl"
          />
          <input
            placeholder="Nazwisko"
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className="w-full h-12 px-4 border border-gray-300 rounded-xl"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 px-4 border border-gray-300 rounded-xl"
          />
          <input
            placeholder="Numer telefonu"
            type="tel"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            className="w-full h-12 px-4 border border-gray-300 rounded-xl"
          />
        </div>
        <input
          placeholder="Miasto"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full h-12 px-4 border border-gray-300 rounded-xl"
        />
        <input
          placeholder="Dodatkowe informacje"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full h-24 px-4 border border-gray-300 rounded-xl"
        />
        {errors.length > 0 && (
          <div className="p-3 bg-red-500 text-white rounded-md mb-4">
            {errors.map((error, index) => (
              <div key={`error_${index}`}>{error}</div>
            ))}
          </div>
        )}
        <CustomButton label="Wyślij zapytanie" onClick={handleSubmit} />
      </form>
    </div>
  </div>
);
  

  return (
    <Modal
      isOpen={reservationModal.isOpen}
      close={reservationModal.close}
      label="Skontaktuj się z właścicielem auta"
      content={content}
    />
  );
}
