"use client";

import useLoginModal from "../../hooks/useLoginModal";
import React, { useState } from "react";
import Modal from "./Modal";
import CustomButton from "../forms/CustomButton";
import ReverseCustomButton from "../forms/ReverseCustomButton";

import { handleLogin } from "../../lib/action";
import useSigninModal from "../../hooks/useSigninModal";
import SigninModal from "./SigninModal";

export default function LoginModal() {
  const loginModal = useLoginModal();
  const registerModal = useSigninModal();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState([]);

  const submitLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await handleLogin(username, password);
      if (response === true) {
        loginModal.close();
        setUsername("");
        setPassword("");
        setErrors([]);
      } else {
        setErrors(["An error occurred during login."]);
      }
    } catch (error) {
      setErrors(["An error occurred during logij."]);
      console.error("Login failed:", error);
    }
  };

  const openRegisterModal = () => {
    loginModal.close();
    registerModal.open();
  };

  const content = (
    <>
      <form className="space-y-4">
        <input
          placeholder="Login lub adres email"
          type="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />
        <input
          placeholder="Hasło"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />

        {errors.length > 0 && (
          <div className="p-5 bg-red-500 text-white rounded-xl opacity-80">
            {errors.map((error, index) => (
              <div key={`error_${index}`}>{error}</div>
            ))}
          </div>
        )}

        <p className="flex items-center text-sm">Zapomniałeś hasła? Skontaktuj się z administratorem</p>
        <CustomButton label="Zaloguj się" onClick={submitLogin} />
        <hr></hr>
        
        <p className="pt-4 font-bold text-center">Nie masz konta? Zarejestruj się!</p>
        <ReverseCustomButton label="Stwórz darmowe konto" onClick={openRegisterModal} />
      </form>
      <SigninModal/>
    </>
  );

  return (
    <Modal
      isOpen={loginModal.isOpen}
      close={loginModal.close}
      label="Zaloguj się"
      content={content}
    />
  );
}
