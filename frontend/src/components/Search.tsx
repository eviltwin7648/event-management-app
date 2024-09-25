import Button from "./Button";

const Search = ({
  location,
  category,
  setSelectedLocation,
  setSelectedCategory,
  setSearchTerm,
}: {
  location: string[];
  category: string[];
  setSelectedCategory: (value: string) => void;
  setSelectedLocation: (value: string) => void;
  setSearchTerm: (value: string) => void;
  searchTerm: string;
}) => {
  return (
    <div className="bg-navy_blue m-auto rounded-[20px] min-h-[144px] max-w-[1200px] text-white flex items-center justify-around">
      <div>
        <p className="mb-2">Looking For</p>
        <select
          className="text-navy_blue text-xs rounded-md px-2 py-4 w-[290px]"
          name="Choose Event Type"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="" disabled selected>
            Choose Event Type
          </option>
          {category.map((cat) => (
            <option value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div>
        <p className="mb-2">Location</p>
        <select
          className="text-navy_blue text-xs rounded-md px-2 py-4 w-[290px]"
          id="cars"
          name="Choose Location"
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="" disabled selected>
            Choose Location
          </option>
          {location.map((loc) => (
            <option value={loc}>{loc}</option>
          ))}
        </select>
      </div>
      <div>
        <p className="mb-2">Search</p>
        <input
          type="text"
          className="text-navy_blue text-xs rounded-md px-2 py-4 w-[290px]"
          placeholder="Enter Title"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        <Button title={"🔎︎"} link={""} />
      </div>
    </div>
  );
};

export default Search;
