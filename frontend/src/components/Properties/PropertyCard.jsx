import { useState } from "react";
import { Link } from "react-router-dom";

export default function PropertyCard({ properties }) {
  const [favourited, setFavourited] = useState({});

  function handleFavourite(id) {
    setFavourited((currentFavourite) => ({
      ...currentFavourite,
      [id]: !currentFavourite[id],
    }));
  }

  return (
    <>
      {properties.map((property) => (
        <div key={property.property_id} id="property-card">
          <div className="property-details">
            <Link to={`/properties/${property.property_id}`}>
              <h3>{property.property_name}</h3>
            </Link>
            <div>£ {property.price_per_night} per night</div>
          </div>
          <button onClick={() => handleFavourite(property.property_id)}>
            {favourited[property.property_id] ? "❤️" : "🤍"}
          </button>
        </div>
      ))}
    </>
  );
}
