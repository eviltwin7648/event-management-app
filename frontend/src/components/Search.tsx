import Button from "./Button";

const Search = () => {
  return (
    <div className="bg-navy_blue m-auto rounded-[20px] min-h-[144px] max-w-[1200px] text-white flex items-center justify-around">
      <div>
        <p className="mb-2">Looking For</p>
        <select
          id="cars"
          className="text-navy_blue text-xs rounded-md px-2 py-4 w-[290px]"
          name="Choose Event Type"
        >
          <option value="" disabled selected>
            Choose Event Type
          </option>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="fiat">Fiat</option>
          <option value="audi">Audi</option>
        </select>
      </div>
      <div>
        <p className="mb-2">Location</p>
        <select
          className="text-navy_blue text-xs rounded-md px-2 py-4 w-[290px]"
          id="cars"
          name="Choose Location"
        >
          <option value="" disabled selected>
            Choose Location
          </option>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="fiat">Fiat</option>
          <option value="audi">Audi</option>
        </select>
      </div>
      <div>
        <p className="mb-2">When</p>
        <select
          className="text-navy_blue text-xs rounded-md px-2 py-4 w-[290px]"
          id="cars"
          name="Choose Date"
        >
          <option value="" disabled selected>
            Choose Date
          </option>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="fiat">Fiat</option>
          <option value="audi">Audi</option>
        </select>
      </div>
      <div>
       <Button
       title={'🔎︎'}
       link={'/'}
       />
      </div>
    </div>
  );
};

export default Search;
