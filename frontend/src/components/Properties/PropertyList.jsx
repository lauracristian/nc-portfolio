import axios from "axios";
import { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import { useSearchParams } from "react-router-dom";

export default function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [searchParams] = useSearchParams();
  const searchLocation = searchParams.get("search").toLowerCase() || "";
  const sortBy = searchParams.get("sort");

  useEffect(() => {
    axios
      .get("https://airbnc-b4cu.onrender.com/api/properties")
      .then(({ data }) => {
        setProperties(data.properties);
      });
  }, []);

  let filteredProperties = properties.filter((property) =>
    property.location.toLowerCase().includes(searchLocation)
  );

  if (sortBy === "maxprice") {
    filteredProperties = [...filteredProperties].sort(
      (a, b) => +b.price_per_night - +a.price_per_night
    );
  } else if (sortBy === "minprice") {
    filteredProperties = [...filteredProperties].sort(
      (a, b) => +a.price_per_night - +b.price_per_night
    );
  } else if (sortBy === "favourites") {
    filteredProperties = [...filteredProperties].sort(
      (a, b) => +b.favourite_count - +a.favourite_count
    );
  }

  return (
    <>
      <PropertyCard properties={filteredProperties} />
    </>
  );
}
