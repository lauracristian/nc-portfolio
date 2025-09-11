import Search from "./Search";

export default function Home(setSearchTerm) {
  return (
    <div id="homepage">
      <Search setSearchTerm={setSearchTerm} />

      <ul>
        <li>Property</li>
        <li>Property</li>

        <li>Property</li>

        <li>Property</li>
      </ul>
    </div>
  );
}
