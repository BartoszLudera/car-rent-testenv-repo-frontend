"use client";

import Link from "next/link";
import Image from "next/image";
import SearchFilters from "./SearchFilters";
import UserNav from "./UserNav";
import AddNewOffert from "../modals/AddNewOffert";
import useAddOfferModal from "../../hooks/useAddOfferModal";
import { getUsernameToken, login_check } from "../../lib/action";
import useLoginModal from "../../hooks/useLoginModal";
import { useRouter } from 'next/navigation';
import { useState } from "react";


export default function Navbar() {
  const addNewOffertModal = useAddOfferModal();
  const loginModal = useLoginModal();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const router = useRouter();

  const handleAddOffert = async () => {
    const isLogged = await login_check();
    if (isLogged) {
      router.push("/addoffert");
    } else {
      loginModal.open();
    }
  };

  return (
    <nav className="w-full fixed top-0 left-0 py-6 border-b bg-white z-10">
      <div className="max-w-[1500px] mx-auto px-6">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="DjangoBnb logo"
              width={180}
              height={38}
              className="cursor-pointer"
            />
          </Link>

          <div className="hidden md:flex space-x-6">
            <SearchFilters />
          </div>

          <button
            onClick={handleAddOffert}
            className="hidden md:inline-block p-2 px-4 py-4 relative inline-block border font-bold text-white bg-airbnb rounded-full"
          >
            Dodaj nowe ogłoszenie
          </button>

          <div className="flex items-center space-x-6">
            <UserNav />
          </div>
        </div>

        <div className="md:hidden mt-4 flex justify-between items-center">
          <button
            onClick={handleAddOffert}
            className="p-2 border font-bold text-white bg-airbnb rounded-full w-full text-center"
          >
            Dodaj nowe ogłoszenie
          </button>
        </div>

        {/* {isMobileMenuOpen && (
          <div className="md:hidden mt-4 flex flex-col items-start space-y-4">
            <button
              onClick={handleAddOffert}
              className="p-2 px-4 py-4 border font-bold text-white bg-airbnb rounded-full w-full text-center"
            >
              DODAJ NOWĄ OFERTĘ
            </button>
            <SearchFilters />
          </div>
        )} */}
      </div>
      <AddNewOffert />
    </nav>
  );
};