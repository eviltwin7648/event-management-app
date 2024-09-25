import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createEventCall } from "../services/api";
import axios from "axios";

const CreateEventPage = () => {
  const [eventTitle, setEventTitle] = useState("");
  const [alert, setAlert] = useState(false);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState<number>();
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);

  if (startDate == null) {
    return;
  }
  const date = startDate.toISOString();

  const Category = category == 'Other' ? customCategory : category

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("eventTitle", eventTitle);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("category", Category);
    formData.append("location", location);
    formData.append("price", price?.toString() || " ");
    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await createEventCall(formData);
      setMessage(res.message);
      setAlert(true);
      setEventTitle("");
      setDescription("");
      setPrice(0);
      setCategory("");
      setLocation("");
      setImage(null);

      setTimeout(() => {
        setAlert(false);
      }, 3000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data.message);
      } else {
        setMessage("An unexpected error occurred");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col w-full m-auto p-10 text-black justify-center items-center">
      <h3 className="font-bold text-4xl">Create Event</h3>
      <form onSubmit={handleSubmit} className="w-[816px]">
        <div className="mb-5 w-full">
          <label>Event Title</label>
          <input
            type="text"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            placeholder="Enter the Title"
            required
          />
        </div>
        <div className="mb-5 w-full">
          <label>Event Venue</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter the Venue"
            required
          />
        </div>
        <div className="mb-5">
          <label>Event Category</label>
          <select
            value={category}
            className="w-full bg-white text-black   p-2.5 rounded "
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option className="text-gray-400" value="" disabled selected>
              Choose a Category
            </option>
            <option value="Music">Music</option>
            <option value="Sports">Sports</option>
            <option value="Education">Education</option>
            <option value="Other">Other (Create new category)</option>
          </select>
          {category == "Other" && (
            <input
              type="text"
              className="w-full mt-2 p-2.5 border rounded"
              placeholder="Enter new category"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              required
            />
          )}
        </div>
        <div className="mb-5">
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            placeholder="Enter the Price"
            required
          />
        </div>
        <div className="flex justify-between gap-5">
          <div className="w-full">
            <label>Start Date</label>
            <div className="relative bg-white rounded">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg
                  className=" w-4 h-4 text-black z-10 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <DatePicker
                className=" text-center border-l-4  border-red-500  w-full p-5 rounded text-sm  outline-none  focus:ring-0"
                selected={startDate}
                onChange={(date: Date | null) => setStartDate(date)}
                showTimeSelect
                dateFormat="Pp"
              />
            </div>
          </div>
          <div className="w-full">
            <label>End Date</label>
            <div className="relative  bg-white rounded">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg
                  className=" w-4 h-4 text-black z-10"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <DatePicker
                className=" text-center border-l-4  border-red-500  w-full p-5 rounded text-sm  outline-none  focus:ring-0"
                selected={startDate}
                onChange={(date: Date | null) => setStartDate(date)}
                showTimeSelect
                dateFormat="Pp"
              />
            </div>
          </div>
        </div>
        <h3 className="font-bold text-center my-10 text-4xl">
          Event Description
        </h3>

        <div className="mb-5">
          <label>Event Image</label>
          <div
            onClick={() => {
              imageRef.current?.click();
            }}
            className="h-64 w-full bg-gray-200 cursor-pointer rounded-xl flex justify-center items-center"
          >
            <input
              ref={imageRef}
              className="hidden"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {image ? (
              <img
                className="object-cover rounded-xl  h-full w-full"
                src={URL.createObjectURL(image)}
                alt=""
              />
            ) : (
              <div className="h-20 w-20">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#000000"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      opacity="0.5"
                      d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15"
                      stroke="#545454"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <path
                      d="M12 16V3M12 3L16 7.375M12 3L8 7.375"
                      stroke="#545454"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </div>
            )}
          </div>
        </div>
        <div className="mb-5">
          <label>Event Description</label>
          <textarea
            value={description}
            rows={8}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Type here..."
            className="w-full bg-white p-2.5 rounded-xl "
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </form>

      {alert ? (
        <div className="absolute left-4 bottom-4 backdrop-blur p-4 rounded-md bg-white/20 ">
          <p className="text-white text-center">{message}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CreateEventPage;
