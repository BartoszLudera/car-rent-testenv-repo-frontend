"use client";

import useSigninModal from "../../hooks/useSigninModal";
import React, { useState } from "react";
import Modal from "./Modal";
import CustomButton from "../forms/CustomButton";
import apiService from "../../services/apiServices";
import { handleLogin } from "../../lib/action";
import useAddOfferModal from "../../hooks/useAddOfferModal";
import AddNewOffert from "./AddNewOffert";
import { useRouter } from 'next/navigation';


export default function SigninModal() {
  const signinModal = useSigninModal();

  const router = useRouter();


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [visibleName, setVisibleName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhoneNumber, setContactPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [city, setCity] = useState("");
  const [nip, setNip] = useState("");
  const [regulamin, setRegulamin] = useState(true);
  const [marketing, setMarketing] = useState(true);
  const [errors, setErrors] = useState([]);

  const validatePassword = (password) => {
    const minLength = 8;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return password.length >= minLength && hasLetter && hasSpecialChar;
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const submitSignup = async (e) => {
    e.preventDefault();

    const newErrors = [];
    if (!username) newErrors.push("Login jest wymagany.");
    if (!password) newErrors.push("Hasło jest wymagane.");
    else if (!validatePassword(password)) newErrors.push("Hasło musi mieć minimum 8 znaków, 1 literę i 1 znak specjalny.");
    if (!email) newErrors.push("Email jest wymagany.");
    else if (!validateEmail(email)) newErrors.push("Nieprawidłowy format email.");
    if (!visibleName) newErrors.push("Nazwa firmy lub osoby jest wymagana.");
    if (!contactEmail) newErrors.push("Email kontaktowy jest wymagany.");
    else if (!validateEmail(contactEmail)) newErrors.push("Nieprawidłowy format email kontaktowy.");
    if (!contactPhoneNumber) newErrors.push("Numer telefonu jest wymagany.");
    if (!city) newErrors.push("Miasto jest wymagane.");
    if (!regulamin) newErrors.push("Akceptacja regulaminu jest wymagana.");

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("visible_name", visibleName);
    formData.append("contact_email", contactEmail);
    formData.append("contact_phonenumber", contactPhoneNumber);
    formData.append("website", website);
    formData.append("city", city);
    formData.append("nip", nip);
    formData.append("regulamin", regulamin);
    formData.append("marketing", marketing);

    try {
      const response = await apiService.postWithoutToken(
        "http://127.0.0.1:8000/account_api/register/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.status === 201) {
        handleLogin(username, password);
        router.push("/addoffert");

        signinModal.close();
        setUsername("");
        setPassword("");
        setEmail("");
        setVisibleName("");
        setContactEmail("");
        setContactPhoneNumber("");
        setWebsite("");
        setCity("");
        setNip("");
        setErrors([]);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const detailedErrors = [];
        for (const key in error.response.data) {
          if (error.response.data.hasOwnProperty(key)) {
            detailedErrors.push(...error.response.data[key]);
          }
        }
        setErrors(detailedErrors);
      } else {
        setErrors([error.message || "Signup failed."]);
      }
      console.error("Signup failed:", error);
    }
  };

  const content = (
    <form className="space-y-4 h-96 overflow-y-auto pr-4" onSubmit={submitSignup} encType="multipart/form-data">
      <p className="flex justify-center text-bold">Dane do logowania</p>
      <div className="flex space-x-4">
        <input
          placeholder="*Login"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-1/2 h-[54px] px-4 border border-gray-300 rounded-xl"
        />
        <input
          placeholder="*Hasło"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-1/2 h-[54px] px-4 border border-gray-300 rounded-xl"
        />
      </div>
      <input
        placeholder="*Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
      />
      <hr />
      <p className="flex justify-center text-bold">Dane widoczne na stronie</p>
      <input
        placeholder="*Nazwa firmy lub osoby"
        type="text"
        value={visibleName}
        onChange={(e) => setVisibleName(e.target.value)}
        className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
      />
      <input
        placeholder="*Email kontaktowy"
        type="email"
        value={contactEmail}
        onChange={(e) => setContactEmail(e.target.value)}
        className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
      />
      <input
        placeholder="*Numer telefonu"
        type="text"
        value={contactPhoneNumber}
        onChange={(e) => setContactPhoneNumber(e.target.value)}
        className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
      />
      <input
        placeholder="Link do strony www"
        type="url"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
      />
      <input
        placeholder="*Miasto"
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
      />
      <hr />
      <p className="flex justify-center text-bold">Pola dodatkowe do weryfikacji konta</p>
      <input
        placeholder="Numer NIP"
        type="text"
        value={nip}
        onChange={(e) => setNip(e.target.value)}
        className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
      />
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={regulamin}
          onChange={(e) => setRegulamin(e.target.checked)}
          className="rounded mr-2 h-8 w-8"
        />
        <span className="text-sm">
          *Akceptuję RODO, Politykę Prywatności oraz Regulamin serwisu. Wszelkie dokumenty dostępne są w zakładce "Informacje o stronie".
        </span>
      </label>
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={marketing}
          onChange={(e) => setMarketing(e.target.checked)}
          className="rounded mr-2 h-8 w-8"
        />
        <span className="text-sm">
          Wyrażam zgodę na kontakt właścicieli serwisu w celach marketingowych oraz pomocy w korzystaniu z serwisu.
        </span>
      </label>
      {errors.length > 0 && (
        <div className="p-5 bg-red-500 text-white rounded-xl opacity-80">
          {errors.map((error, index) => (
            <div key={`error_${index}`}>{error}</div>
          ))}
        </div>
      )}
      <CustomButton label="Zakładam konto" onClick={submitSignup} />
      <p className="text-xs text-center">Pola oznaczone gwiazdką * są wymagane</p>
    </form>
  );

  return (
    <Modal
      isOpen={signinModal.isOpen}
      close={signinModal.close}
      label="Zarejestruj konto dla wypożyczalni"
      content={content}
    />
  );
}
