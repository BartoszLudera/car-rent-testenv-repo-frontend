"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faGlobe } from "@fortawesome/free-solid-svg-icons";
import useReservationModal from "../../hooks/useReservationModal";
import AddReservationModal from "../../components/modals/AddReservationModal";

export default function ReservationSideBar({ id, name, email, phone, website}) {
  const reservationModal = useReservationModal();

  const handleSend = () => {
    reservationModal.open();
  };

  return (
    <aside>
      <div className="mb-6 p-3 border border-gray-400 rounded-xl">
        <label className="mb-2 block text-xs">Informacje o wypożyczalni</label>
        <div>
          <h1 className="font-bold pb-2">{name}</h1>
          <div className="flex items-center pb-2">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            <h3>Email: {email || "Brak"}</h3>
          </div>
          <div className="flex items-center pb-2">
            <FontAwesomeIcon icon={faPhone} className="mr-2" />
            <h3>Telefon: {phone || "Brak"}</h3>
          </div>
          <div className="flex items-center pb-2">
            <FontAwesomeIcon icon={faGlobe} className="mr-2" />
            <h3>Strona www: <a href={website} target="_blank" rel="website">{website || "Brak"}</a></h3>
          </div>

          {/* <Image
            src="/logo.png"
            width={1920}
            height={1080}
            className="object-cover w-32 h-full"
            alt="logo"
          /> */}
        </div>
      </div>

      <button
        onClick={handleSend}
        className="w-full mb-6 py-6 text-center text-white bg-airbnb hover:bg-airbnb-dark rounded-xl"
      >
        Skontaktuj się z wypożyczalnią i zarezerwój samochód!
      </button>
      <AddReservationModal id={id} />
    </aside>
  );
}
