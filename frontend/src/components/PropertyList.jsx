import axios from "axios";
import { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import { useSearchParams } from "react-router-dom";

export default function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [searchParams] = useSearchParams();
  const searchLocation = searchParams.get("search").toLowerCase() || "";

  useEffect(() => {
    axios
      .get("https://airbnc-b4cu.onrender.com/api/properties")
      .then(({ data }) => {
        setProperties(data.properties);
      });
  }, []);

  const filteredProperties = properties.filter((property) =>
    property.location.toLowerCase().includes(searchLocation)
  );

  return (
    <>
      <PropertyCard properties={filteredProperties} />
    </>
  );
}
