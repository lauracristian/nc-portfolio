import { Link } from "react-router-dom";

export default function PropertyCard({ properties }) {
  return (
    <div id="property-card">
      {properties.map((property) => (
        <Link
          key={property.property_id}
          to={`/properties/${property.property_id}`}
        >
          <div>{property.property_name}</div>
          <div>£ {property.price_per_night} per night</div>
        </Link>
      ))}
    </div>
  );
}
