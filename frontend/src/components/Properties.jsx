import Filter from "./Filter";
import PropertyList from "./PropertyList";
import Search from "./Search";
import { useState } from "react";

export default function Properties(setSearchTerm) {
  return (
    <div id="property-list">
      <Search setSearchTerm={setSearchTerm} />
      <Filter />
      <PropertyList />
    </div>
  );
}
