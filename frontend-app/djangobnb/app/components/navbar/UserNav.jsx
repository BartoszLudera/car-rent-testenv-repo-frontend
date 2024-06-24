"use client";

import AddPropertyButton from "./AddPropertyButton";
import { useState, useEffect } from "react";
import MenuLink from "./MenuLink";
import useLoginModal from "../../hooks/useLoginModal";
import useSigninModal from "../../hooks/useSigninModal";
import { logout, login_check, get_username } from "../../lib/action";

export default function UserNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState(false);
  const [username, setUsername] = useState("");
  const loginModal = useLoginModal();
  const signinModal = useSigninModal();

  useEffect(() => {
    const checkLogin = async () => {
      const result = await login_check();
      setUserId(result);
      if (userId) {
        const username_get = await get_username();
        setUsername(username_get);
      }
    };
    checkLogin();
  }, [isOpen]);

  const handleLogout = async () => {
    console.log("handlelogout start");
    await logout();
    setUserId(false);
  };

  return (
    <div className="p-2 relative inline-block border rounded-full">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center">

      {username ? (
          " " + username + " " 
        ) : (
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        )}

        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="w-[220px] absolute top-[60px] right-0 bg-white border rounded-xl shadow-md flex flex-col cursor-pointer">
          {userId ? (
            <>
              {/* {username ?? (
              <MenuLink
                label={username}
                onClick={() => {
                  setIsOpen(false);
                  console.log("profile section")
                }}
              />
            )} */}

              {/* <MenuLink
                label="My profile"
                onClick={() => {
                  setIsOpen(false);
                  router.push("/inbox");
                }}
              />

              <MenuLink
                label="Inbox"
                onClick={() => {
                  setIsOpen(false);
                  router.push("/inbox");
                }}
              />

              <MenuLink
                label="My properties"
                onClick={() => {
                  setIsOpen(false);
                  router.push("/myproperties");
                }}
              />

              <MenuLink
                label="My favorites"
                onClick={() => {
                  setIsOpen(false);
                  router.push("/myfavorites");
                }}
              />

              <MenuLink
                label="My reservations"
                onClick={() => {
                  setIsOpen(false);
                  router.push("/myreservations");
                }}
              /> */}

              <MenuLink
                label="Log out"
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
              />
            </>
          ) : (
            <>
              <MenuLink
                label="Log in"
                onClick={() => {
                  setIsOpen(false);
                  loginModal.open();
                }}
              />

              <MenuLink
                label="Sign in"
                onClick={() => {
                  setIsOpen(false);
                  signinModal.open();
                }}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
