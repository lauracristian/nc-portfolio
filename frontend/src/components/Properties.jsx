import Filter from "./Filter";
import PropertyList from "./PropertyList";
import Search from "./Search";

export default function Properties(setSearchTerm) {
  return (
    <div id="property-list">
      <Search />
      <Filter />
      <PropertyList />
    </div>
  );
}
