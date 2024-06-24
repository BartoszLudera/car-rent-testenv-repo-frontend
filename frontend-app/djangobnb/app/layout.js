import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/navbar";
import Categories from "./components/Categories";
import Modal from "./components/modals/Modal";
import LoginModal from "./components/modals/LoginModal";
import SigninModal from "./components/modals/SigninModal";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DjangoBnB",
  description: "App that is a clone of AirandBe",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Any head elements can be added here */}
      </head>
      <body className={inter.className}>
        <Navbar />
        <LoginModal />
        <SigninModal />
        {children}
        <Footer/>
        
      </body>
    </html>
  );
}
