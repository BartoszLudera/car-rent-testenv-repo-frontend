"use client";

import React, { useState, useEffect } from "react";
import CustomButton from "../components/forms/CustomButton";
import ReverseCustomButton from "../components/forms/ReverseCustomButton";
import apiService from "../services/apiServices";
import {
  getUsernameToken,
  get_categories,
  get_brands,
  get_enginetypes,
  get_drivetypes,
  get_userdetails,
} from "../lib/action";
import ImageUpload from "../components/forms/ImageUpload";
import { get } from "http";

export default function AddNewOffert() {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [engines, setEngines] = useState([]);
  const [drivetypes, setDrivetypes] = useState([]);
  const [activeTab, setActiveTab] = useState("form");
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    async function fetchCategories() {
      const _categories = await get_categories();
      const _brands = await get_brands();
      const _engines = await get_enginetypes();
      const _drivetypes = await get_drivetypes();
      setCategories(_categories);
      setBrands(_brands);
      setEngines(_engines);
      setDrivetypes(_drivetypes);
    }

    fetchCategories();

    async function getUserData() {
      const _username = await getUsernameToken();
      const _userData = await get_userdetails(_username);
      setUserDetails(_userData);
    }
    getUserData();
  }, []);

  const [category_name, setCategory_name] = useState("");
  const [brand_name, setBrand_name] = useState("");
  const [carmodel, setCarmodel] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [power, setPower] = useState("");
  const [engineType, setEngineType] = useState("");
  const [engineCapacity, setEngineCapacity] = useState("");
  const [acceleration, setAcceleration] = useState("");
  const [topSpeed, setTopSpeed] = useState("");
  const [transmission, setTransmission] = useState("automatic");
  const [drivetype, setDrivetype] = useState("");
  const [year, setYear] = useState("");
  const [deposit, setDeposit] = useState("");
  const [dailyKmLimit, setDailyKmLimit] = useState("");
  const [extraKmFee, setExtraKmFee] = useState("");
  const [location, setLocation] = useState("");
  const [delivery, setDelivery] = useState("");
  const [rows, setRows] = useState([{ title: "24h", price: "" }]);
  const [errors, setErrors] = useState([]);

  const [nextPage, setNextPage] = useState(1);
  const [packageType, setPackageType] = useState(1);

  const validateForm = () => {
    const newErrors = [];
    if (!category_name) newErrors.push("Wybranie kategorii jest wymagane.");
    if (!brand_name) newErrors.push("Dodanie marki jest wymagane.");
    if (!carmodel) newErrors.push("Dodanie modelu samochodu jest wymagane.");
    if (!title) newErrors.push("Dodanie tytułu jest wymagane.");
    if (!description) newErrors.push("Dodanie opisu jest wymagane.");
    if (images.length === 0) newErrors.push("Dodanie zdjęcia jest wymagane.");
    if (!power) newErrors.push("Dodanie mocy jest wymagane.");
    if (!engineType) newErrors.push("Dodanie typu silnika jest wymagane.");
    if (!engineCapacity)
      newErrors.push("Dodanie pojemności silnika jest wymagane.");
    if (!acceleration) newErrors.push("Dodanie przyspieszenia jest wymagane.");
    if (!topSpeed)
      newErrors.push("Dodanie maksymalnej prędkości jest wymagane.");
    if (!transmission)
      newErrors.push("Wybranie typu skrzyni biegów jest wymagane.");
    if (!drivetype) newErrors.push("Wybranie typu napędu jest wymagane.");
    if (!year) newErrors.push("Dodanie roku produkcji jest wymagane.");
    if (!deposit) newErrors.push("Dodanie kaucji jest wymagane.");
    if (!dailyKmLimit)
      newErrors.push("Dodanie limitu kilometrów dziennie jest wymagane.");
    if (!extraKmFee)
      newErrors.push("Dodanie opłaty za dodatkowy kilometr jest wymagane.");
    if (!location) newErrors.push("Dodanie lokalizacji jest wymagane.");
    if (!delivery)
      newErrors.push("Dodanie informacji o dostawie jest wymagane.");
    if (newErrors.length !== 0)
      newErrors.push("Jeśli nie znasz danej wartośći wpisz 0");

    // if (rows.some(row => !row.price)) newErrors.push("Dodanie ceny dla każdego wiersza jest wymagane.");

    setErrors(newErrors);
    return newErrors;
  };

  const addRow = () => {
    setRows([...rows, { title: "", price: "" }]);
  };

  const updateRow = (index, key, value) => {
    setRows((prevRows) => {
      const newRows = [...prevRows];
      newRows[index] = { ...newRows[index], [key]: value };
      console.log(newRows);
      return newRows;
    });
  };

  const removeRow = (index) => {
    if (rows.length > 1) {
      const newRows = [...rows];
      newRows.splice(index, 1);
      setRows(newRows);
    }
  };

  const convertImagesToBase64 = (images) => {
    return Promise.all(
      images.map((image) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(image.file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      })
    );
  };

  const handleFreePakiet = async (e) => {
    setPackageType(1);
    submitAddNewOffert();
  };

  const handleStandardPakiet = async (e) => {
    setPackageType(2);
    submitAddNewOffert();
  };

  const handlePremiumPakiet = async (e) => {
    setPackageType(3);
    submitAddNewOffert();
  };

  const handleNextPage1 = async (e) => {
    setNextPage(1);
  };

  const handleNextPage2 = async (e) => {
    setNextPage(2);
  };

  const handleNextPage3 = async (e) => {
    setNextPage(3);
  };

  const sumUp = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (formErrors.length > 0) {
      setErrors(formErrors);
      return;
    }
    setNextPage(2);
  };

  const submitAddNewOffert = async (e) => {
    // e.preventDefault();

    const username = await getUsernameToken();
    const currentDate = new Date().toISOString();

    const base64Images = await convertImagesToBase64(images);

    let imagesObject = {};
    base64Images.forEach((base64Image, index) => {
      imagesObject[`images[${index}]`] = base64Image;
    });

    const formData = {
      category: 2,
      brand: 2,
      car_model: carmodel,
      title: title,
      description: description,
      car_power: power,
      acceleration: acceleration,
      automatic_gearbox: transmission,
      drive: 1,
      engine_size: engineCapacity,
      engine_type: engineType,
      max_speed: topSpeed,
      year: year,
      location: location,
      delivery_to_customer: delivery,
      deposit: deposit,
      distance_limit: dailyKmLimit,
      price_per_addicional_distance: extraKmFee,
      prices: rows.map((row) => ({ title: row.title, price: row.price })),
      images: imagesObject,
      created_by_email: userDetails.email,
    };

    try {
      const response = await apiService.post(
        "http://127.0.0.1:8000/api/items/",
        JSON.stringify(formData)
      );
      console.log("Form submitted successfully", response.data);
      setNextPage(3);
    } catch (error) {
      console.error("Error submitting the form:", error);
      setErrors([error.message]);
    }
  };

  return nextPage === 1 ? (
    <div className="flex flex-col h-full pt-40 mx-8">
      <div>
        <h1 className="text-center text-2xl font-bold pb-2">
          Dodaj ogłoszenie
        </h1>
        <h3 className="text-center text-xl py-2">
          Pamiętaj że im więcej szczegółów, tym lepiej! Wszystkie kwoty są jako
          kwoty netto.
        </h3>
      </div>
      <hr />
      <div className="p-4 flex-grow">
        {activeTab === "form" && (
          <form className="space-y-4" onSubmit={sumUp}>
            <div className="space-y-2">
              <p>*Tytuł ogłoszenia</p>
              <input
                placeholder="np. BMW M4 Competition 2023"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={50}
                className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <p>*Rodzaj nadwozia</p>
              <select
                value={category_name}
                onChange={(e) => setCategory_name(e.target.value)}
                className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
              >
                <option value="" disabled>
                  *Wybierz rodzaj nadwozia
                </option>
                {categories.map((category, index) => (
                  <option key={index} value={index + 1}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <p>*Marka samochodu</p>
              <select
                value={brand_name}
                onChange={(e) => setBrand_name(e.target.value)}
                className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
              >
                <option value="" disabled>
                  *Wybierz markę samochodu
                </option>
                {brands.map((brand, index) => (
                  <option key={index} value={index + 1}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <p>*Model samochodu</p>
              <input
                placeholder="np. M4 / 340i / X5"
                type="text"
                value={carmodel}
                onChange={(e) => setCarmodel(e.target.value)}
                className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
              />
            </div>
            <hr />
            <ImageUpload images={images} setImages={setImages} />
            <div className="space-y-2">
              <p>*Opis ogłoszenia</p>
              <textarea
                placeholder="Wpisz wszystkie informacje który były dla Ciebie ważna podczas poszukiwania samochodu"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-[100px] px-4 border border-gray-300 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <p>*Moc samochodu (w koniach mechanicznych)</p>
              <input
                type="text"
                placeholder="np. 510"
                value={power}
                onChange={(e) => setPower(e.target.value)}
                className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <p>*Typ silnika</p>
              <select
                value={engineType}
                onChange={(e) => setEngineType(e.target.value)}
                className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
              >
                <option value="" disabled>
                  Wybierz typ silnika
                </option>
                {engines.map((engine, index) => (
                  <option key={index} value={index + 1}>
                    {engine}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <p>*Pojemność silnika (w litrach)</p>
              <input
                type="number"
                step="0.1"
                placeholder="np. 3.0"
                value={engineCapacity}
                onChange={(e) => setEngineCapacity(e.target.value)}
                className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <p>*Przyśpieszenie 0-100km/h (w sekundach)</p>
              <input
                type="text"
                placeholder="np. 3.9"
                value={acceleration}
                onChange={(e) => setAcceleration(e.target.value)}
                className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <p>*Prędkość maksymalna (w km/h)</p>
              <input
                type="text"
                placeholder="np. 280"
                value={topSpeed}
                onChange={(e) => setTopSpeed(e.target.value)}
                className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <p>*Skrzynia biegów</p>
              <div className="flex space-x-4">
                <div>
                  <label
                    className={`px-4 py-2 rounded-full ${
                      transmission === "true"
                        ? "bg-red-500 text-white"
                        : "bg-gray-300 text-black"
                    }`}
                  >
                    <input
                      type="radio"
                      id="automatic"
                      name="transmission"
                      value="true"
                      checked={transmission === "true"}
                      onChange={(e) => setTransmission(e.target.value)}
                      className="hidden"
                    />
                    Automatyczna
                  </label>
                </div>
                <div>
                  <label
                    className={`px-4 py-2 rounded-full ${
                      transmission === "false"
                        ? "bg-red-500 text-white"
                        : "bg-gray-300 text-black"
                    }`}
                  >
                    <input
                      type="radio"
                      id="manual"
                      name="transmission"
                      value="false"
                      checked={transmission === "false"}
                      onChange={(e) => setTransmission(e.target.value)}
                      className="hidden"
                    />
                    Manualna
                  </label>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <p>*Typ napędu</p>
              <select
                value={drivetype}
                onChange={(e) => setDrivetype(e.target.value)}
                className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
              >
                <option value="" disabled>
                  Wybierz typ napędu
                </option>
                {drivetypes.map((drivetype, index) => (
                  <option key={index} value={index + 1}>
                    {drivetype}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <p>*Rok produkcji</p>
              <input
                type="text"
                placeholder="np. 2023"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <p>*Cena wynajmu (czas wynajmu | kwota wynajmu za dobę)</p>
              {rows.map((row, index) => (
                <div key={index} className="flex space-x-2 items-center">
                  {rows.length > 1 && (
                    <button
                      onClick={() => removeRow(index)}
                      className="mr-2 text-red-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 9l1 11h10l1-11M4 7h16m-5-3H9m0 0v3h6V4"
                        />
                      </svg>
                    </button>
                  )}
                  <input
                    type="text"
                    value={row.key}
                    placeholder="np. 2-3 dni"
                    onChange={(e) => updateRow(index, "title", e.target.value)}
                    className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
                  />
                  <input
                    type="number"
                    placeholder="np. 1500"
                    value={row.value}
                    onChange={(e) => updateRow(index, "price", e.target.value)}
                    className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
                  />
                </div>
              ))}
              <button
                onClick={addRow}
                className="mt-2 px-4 py-2 bg-airbnb text-white rounded-xl flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Dodaj kolejna informację o cenie
              </button>
            </div>
            <div className="space-y-2">
              <p>*Kaucja (w złotówkach)</p>
              <input
                type="number"
                placeholder="np. 1000, jeśli brak wpisz 0"
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
                className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <p>*Dzienny limit kilometrów</p>
              <input
                type="number"
                placeholder="np. 200, jeśli nie ma limitu wpisz 0"
                value={dailyKmLimit}
                onChange={(e) => setDailyKmLimit(e.target.value)}
                className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <p>*Opłata za każdy kilometr powyżej limitu (w złotówkach)</p>
              <input
                type="number"
                placeholder="np. 0.5"
                value={extraKmFee}
                onChange={(e) => setExtraKmFee(e.target.value)}
                className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <p>*Miasto</p>
              <input
                type="text"
                placeholder="np. Warszawa, ul. Marszałkowska 1"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <p>*Dostawa samochodu pod wskazany adres przez klienta?</p>
              <div className="flex space-x-4 pb-6">
                <div>
                  <label
                    className={`px-4 py-2 rounded-full ${
                      delivery === "true"
                        ? "bg-red-500 text-white"
                        : "bg-gray-300 text-black"
                    }`}
                  >
                    <input
                      type="radio"
                      id="yes"
                      name="delivery"
                      value="true"
                      checked={delivery === "true"}
                      onChange={(e) => setDelivery(e.target.value)}
                      className="hidden"
                    />
                    Tak
                  </label>
                </div>
                <div>
                  <label
                    className={`px-4 py-2 rounded-full ${
                      delivery === "false"
                        ? "bg-red-500 text-white"
                        : "bg-gray-300 text-black"
                    }`}
                  >
                    <input
                      type="radio"
                      id="manual"
                      name="delivery"
                      value="false"
                      checked={delivery === "false"}
                      onChange={(e) => setDelivery(e.target.value)}
                      className="hidden"
                    />
                    Nie
                  </label>
                </div>
              </div>
            </div>

            {errors.length > 0 && (
              <div className="p-5 bg-red-500 text-white rounded-xl opacity-80">
                {errors.map((error, index) => (
                  <div key={`error_${index}`}>{error}</div>
                ))}
              </div>
            )}
            <CustomButton label="Podsumowanie" onClick={sumUp} />
          </form>
        )}
      </div>
    </div>
  ) : nextPage === 2 ? (
    <div className="flex flex-col h-full pt-40 mx-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold pb-2">Podsumowanie ogłoszenia</h1>
        <h3 className="text-xl py-2">
          Aby dodać ogłoszenie wybierz 1 z 2 pakietów:
        </h3>
      </div>
      <hr />
      <div>
        <ReverseCustomButton
          label="Pakiet premium - 49zł/miesięcznie"
          onClick={handlePremiumPakiet}
        />
        <h4 className="mt-4">
          Pakiet premium zawiera:
          <ul className="list-disc list-inside mt-2">
            <li>aktywacja ogłoszenia na platformie na 30 dni</li>
            <li>pozycjonowanie ogłoszenia na pierwszej stronie</li>
            {/* <li>promocja ogłoszenia pod innymi ogłoszeniami</li> */}
            <li>
              promocja ogłoszenia w social mediach (Facebook, Instagram, TikTok)
            </li>
            <li>przekierowywanie klientów do ogłoszenia</li>
          </ul>
          <strong className="block mt-2">
            Po upływie 30 dni Twoje ogłoszenie przestanie być widoczne, aby je
            przedłużyć wymagana jest opłata w wysokości 49zł netto - nie musisz
            się niczym przejmować, w każdej chwili możesz anulować ogłoszenie
            bez żadnych kosztów!
          </strong>
          Nie wymagamy podpięcia karty, 7 dni przed zakończeniem aktywności
          ogłoszenia zostanie przesłana do Ciebie wiadomość z przypomnieniem o
          kończącym się czasie aktywności ogłoszenia oraz zapytaniem czy chcesz
          je przedłużyć. Jeśli będziesz zainteresowany przedłużeniem, prześlemy
          fakturę VAT na podany przez Ciebie adres email.
        </h4>
      </div>
      <hr />
      <hr className="my-4" />
      <div className="space-y-8">
        <div>
          <ReverseCustomButton
            label="Darmowy pakiet 0 zł"
            onClick={handleFreePakiet}
          />
          <h4 className="mt-4">
            Darmowy pakiet który zawiera:
            <ul className="list-disc list-inside mt-2">
              <li>aktywacja ogłoszenia na platformie na 30 dni</li>
              <li>domyślne pozycjonowanie ogłoszenia</li>
              <li>promocja ogłoszenia w social mediach (Facebook)</li>
              <li>przekierowywanie klientów do ogłoszenia</li>
            </ul>
            <strong className="block mt-2">
              Po upływie 30 dni Twoje ogłoszenie przestanie być widoczne, aby je
              przedłużyć wymagana jest opłata w wysokości 39zł netto - nie
              musisz się niczym przejmować, w każdej chwili możesz anulować
              ogłoszenie bez żadnych kosztów!
            </strong>
            Nie wymagamy podpięcia karty, 7 dni przed zakończeniem aktywności
            ogłoszenia zostanie przesłana do Ciebie wiadomość z przypomnieniem o
            kończącym się czasie aktywności ogłoszenia oraz zapytaniem czy
            chcesz je przedłużyć. Jeśli będziesz zainteresowany przedłużeniem,
            prześlemy fakturę VAT na podany przez Ciebie adres email.
          </h4>
        </div>
        {/* <hr></hr>
      <div className="text-center">
        <CustomButton label="Opublikuj ogłoszenie" onClick={submitAddNewOffert} />
      </div> */}
      </div>
    </div>
  ) : nextPage === 3 ? (
    <div className="flex flex-col h-full pt-40 mx-8">
      <p className="py-2">Dziękujemy za dodanie ogłoszenia!</p>

      <p className="py-2">
        Twoje ogłoszenie jest w procesie weryfikacji oraz sprawdzania, jeśli
        wszystko jest w porządku ogłoszenie zostanie dodane w przeciągu
        najbliższych 24h.
      </p>

      <p className="py-2">
        Jeśli wybrałeś opcję płatną, po sprawdzeniu ogłoszenia na podany przy
        rejestracji adres email zostanie wysłana faktura VAT, po jej opłaceniu
        ogłoszenie zostanie automatycznie aktywowane.
      </p>
    </div>
  ) : (
    <div>404 page not found</div>
  );
}
