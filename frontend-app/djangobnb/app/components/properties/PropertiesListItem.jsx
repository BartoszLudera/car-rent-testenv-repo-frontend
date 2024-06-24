import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faBolt, faCog, faCar } from '@fortawesome/free-solid-svg-icons';

export default function PropertiesListItem({ property }) {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  if (!isClient) {
    return null;
  }

  return (
    <div
      className="cursor-pointer border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition duration-300 ease-in-out"
      onClick={() => router.push(`/properties/${property.id}`)}
    >
      <div className="relative w-full" style={{ height: "200px" }}>
        <Image
          src={property.images[0].image_url}
          layout="fill"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 65vw, 30vw"
          className="object-cover"
          alt={property.title}
        />
      </div>

      <div className="p-4">
      <div className="h-16 overflow-hidden">
            <p className="text-lg font-bold">{truncateText(property.title, 150)}</p>
          </div>
        
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faTachometerAlt} color="#ff385c" />
            <span>{property.car_power} km</span>
          </div>

          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faBolt} color="#ff385c" />
            <span>0-100 w {property.acceleration}s</span>
          </div>

          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faCar} color="#ff385c" />
            <span>
              {property.drive_type === "1"
                ? "RWD"
                : property.drive_type === "2"
                ? "AWD"
                : "FWD"}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faCog} color="#ff385c" />
            <span>
              {property.automatic_gearbox
                ? "automatyczna"
                : "manualna"}
            </span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between">
          <p className="text-sm text-gray-500">
            od <strong>{property.prices[0].price} zł</strong> za dobę
          </p>
          <p className="text-sm text-gray-500 font-bold pr-2 ">{property.location}</p>
        </div>
        
        
      </div>
    </div>
  );
}
