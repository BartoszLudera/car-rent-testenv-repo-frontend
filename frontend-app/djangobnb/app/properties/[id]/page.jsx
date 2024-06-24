"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ReservationSideBar from "../../components/properties/ReservationSideBar";
import apiService from "../../services/apiServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faBolt,
  faCogs,
  faRoad,
  faCar,
  faArrowLeft,
  faArrowRight,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { get_enginetypes, get_drivetypes, get_userdetails } from "../../lib/action";

export default function PropertyDetailPage({ params }) {
  const [property, setProperty] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [engineData, setEngineData] = useState([]);
  const [driveData, setDriveData] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [companyData, setCompanyData] = useState([]);

  useEffect(() => {
    async function fetchProperty() {
      try {
        const response = await apiService.get(`http://127.0.0.1:8000/api/items/${params.id}/`);
        setProperty(response.data);
      } catch (error) {
        console.error('Error fetching property:', error);
      }
    }

    async function getEngineData() {
      const _engineData = await get_enginetypes();
      setEngineData(_engineData);
    }

    async function getDriveData() {
      const _driveData = await get_drivetypes();
      setDriveData(_driveData);
    }

    fetchProperty();
    getEngineData();
    getDriveData();
  }, [params.id]);

  useEffect(() => {
    if (property) {
      console.log(property.created_by);
      async function getUserData() {
        try {
          const _userData = await get_userdetails(property.created_by);
          setCompanyData(_userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      getUserData();
    }
  }, [property]);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <main className="max-w-[1500px] mx-auto px-4 md:px-10 pb-6 pt-40">
      {property && (
        <div className="flex flex-col md:flex-row gap-10">
          <div className="relative w-full md:w-2/3">
            <div
              className="relative w-full mb-4 overflow-hidden rounded-xl"
              style={{ paddingTop: "56.25%" }}
            >
              <Image
                src={property.images[currentImageIndex].image_url}
                layout="fill"
                className="absolute top-0 left-0 w-full h-full object-cover"
                alt={property.title}
              />
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
            <div className="px-4">
              <div>
                <h1 className="mb-8 text-3xl md:text-4xl font-bold">
                  {property.title}
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <span className="text-lg text-gray-600">
                    <FontAwesomeIcon
                      icon={faBolt}
                      className="mr-2 text-airbnb"
                    />
                    <strong>Moc:</strong> {property.car_power} KM
                  </span>
                  <span className="text-lg text-gray-600">
                    <FontAwesomeIcon
                      icon={faTachometerAlt}
                      className="mr-2 text-airbnb"
                    />
                    <strong>0-100km/h:</strong> {property.acceleration} s
                  </span>
                  <span className="text-lg text-gray-600">
                    <FontAwesomeIcon
                      icon={faTachometerAlt}
                      className="mr-2 text-airbnb"
                    />
                    <strong>V-max:</strong> {property.max_speed} km/h
                  </span>
                  <span className="text-lg text-gray-600">
                    <FontAwesomeIcon
                      icon={faCogs}
                      className="mr-2 text-airbnb"
                    />
                    <strong>Skrzynia biegów:</strong>{" "}
                    {property.automatic_gearbox ? "Automatyczna" : "Manualna"}
                  </span>
                  <span className="text-lg text-gray-600">
                    <FontAwesomeIcon
                      icon={faRoad}
                      className="mr-2 text-airbnb"
                    />
                    <strong>Układ napędowy:</strong> {driveData[property.drive]}
                  </span>
                  <span className="text-lg text-gray-600">
                    <FontAwesomeIcon
                      icon={faCar}
                      className="mr-2 text-red-600"
                    />
                    <strong>Silnik:</strong> {property.engine_size}{" "}
                    {engineData[property.engine_type]}
                  </span>
                </div>
                <hr className="my-4" />
                <div style={{ whiteSpace: "pre-wrap" }}>
                  {showFullDescription
                    ? property.description
                    : `${property.description.slice(0, 500)}...`}
                </div>
                {property.description.length > 500 && (
                  <button
                    onClick={toggleDescription}
                    className="bg-airbnb text-white p-2 rounded-full mt-2 flex justify-between items-center w-36 mx-auto"
                    >
                    <p>{showFullDescription ? 'Pokaż mniej' : 'Pokaż więcej'}</p>
                    <FontAwesomeIcon
                      icon={showFullDescription ? faChevronUp : faChevronDown}
                    />
                  </button>
                )}
              </div>
              <hr className="my-4" />
              <div className="flex justify-between items-center">
                <p className="text-xs">ID: {property.id}</p>
                <p className="text-xs">Created at: {property.created_at}</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 flex flex-col">
            <div className="mb-4">
              <ReservationSideBar id={params.id} name={companyData.visible_name} email={companyData.contect_email} phone={companyData.contact_phonenumber} website={companyData.website}/>
              <div className="mt-6">
                <h3 className="text-2xl mb-4">Lokalizacja</h3>
                <p>
                  <strong>Lokalizacja wypożyczalni:</strong>{" "}
                  {property.location}
                </p>
                <p>
                  <strong>Dostawa pod wskazany adres przez klient:</strong>{" "}
                  {property.delivery_to_customer === true ? "Tak" : "Nie"}
                </p>
                <h3 className="text-2xl mb-4 mt-4">Cennik</h3>
                <div className="overflow-y-auto" style={{ maxHeight: "200px" }}>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr>
                        <th className="border-b py-2">Okres najmu</th>
                        <th className="border-b py-2">Cena za dobę</th>
                      </tr>
                    </thead>
                    <tbody>
                      {property.prices.map((price, index) => (
                        <tr key={index}>
                          <td className="border-b py-2">{price.title}</td>
                          <td className="border-b py-2">{price.price} zł</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <hr className="my-4" />
                <p>
                  <strong>Kaucja:</strong> {property.deposit} zł
                </p>
                <hr className="my-3" />
                <p>
                  <strong>Limit kilometrów: </strong>
                  {property.distance_limit === "0"
                    ? "Brak limitu kilometrów"
                    : `${property.distance_limit} km dziennie, cena za każdy kilometr powyżej limitu: ${property.price_per_addicional_distance} zł`}
                </p>
                <hr className="my-3" />
                <p className="text-xm text-gray-600 py-4 flex justify-center font-bold">
                  Wszystkie podane kwoty są kwotami netto
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
