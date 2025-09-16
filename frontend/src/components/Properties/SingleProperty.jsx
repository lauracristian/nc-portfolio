import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Reviews from "../Reviews/Reviews";

export default function SingleProperty() {
  const [property, setProperty] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://airbnc-b4cu.onrender.com/api/properties/${id}`)
      .then(({ data }) => {
        setProperty(data);
      });
  }, [id]);

  return (
    <div>
      <h2>{property.property_name}</h2>
      <p>- Hosted by: {property.host} -</p>
      <br />
      <p>{property.description}</p>
      <br />
      <p>Favourited by: {property.favourite_count}</p> <br />
      <Reviews />
    </div>
  );
}
