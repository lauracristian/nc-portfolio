import { useState } from "react";
import { Link } from "react-router-dom";

export default function PropertyCard({ properties }) {
  const [favourited, setFavourited] = useState(false);

  return (
    <>
      {properties.map((property) => (
        <div key={property.property_id} id="property-card">
          <Link to={`/properties/${property.property_id}`}>
            <h3>{property.property_name}</h3>
          </Link>
          <div>£ {property.price_per_night} per night</div>
          <button
            onClick={() => {
              setFavourited(!favourited);
            }}
          >
            {favourited ? "❤️" : "🤍"}
          </button>
        </div>
      ))}
    </>
  );
}
