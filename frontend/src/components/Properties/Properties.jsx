import Filter from "../Toolbars/Filter";
import PropertyList from "./PropertyList";
import Search from "../Toolbars/Search";

export default function Properties(setSearchTerm) {
  return (
    <div id="property-list">
      <Search />
      <Filter />
      <PropertyList />
    </div>
  );
}
