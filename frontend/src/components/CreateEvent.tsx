import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createEventCall } from "../services/api";
import axios from "axios";

const CreateEvent = () => {
  const [eventTitle, setEventTitle] = useState("");
  const [alert, setAlert] = useState(false);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<File | null>(null);
  if (startDate == null) {
    return;
  }
  const date = startDate.toISOString();
  //send image to the backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("eventTitle", eventTitle);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("category", category);
    formData.append("price", price.toString());
    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await createEventCall(formData);
      setMessage(res.message);
      console.log(res);
      setAlert(true);
      setEventTitle("");
      setDescription("");
      setPrice(0);
      setCategory("");
      setImage(null);

      setTimeout(() => {
        setAlert(false);
      }, 3000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Handle Axios error (error is now of type AxiosError)
        setMessage(error.response?.data.message);
      } else {
        // Handle unexpected errors
        setMessage("An unexpected error occurred");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  console.log(image);

  return (
    <div className="">
      <div className="isolate aspect-video w-96 rounded-xl bg-white/5 shadow-lg ring-1 ring-black/5 p-5">
        <form onSubmit={handleSubmit} className="max-w-sm w-72 mx-auto">
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Event Image
            </label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Event Title
            </label>
            <input
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="title"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="category"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="price (leave empty if free)"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="description"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              // required
            />
          </div>

          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Date
          </label>
          <div className="relative max-w-sm">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg
                className=" w-4 h-4 text-white dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
              </svg>
            </div>
            <DatePicker
              className=" text-center border-l-4 text-white border-red-500  w-full p-5 rounded text-sm  outline-none  focus:ring-0 bg-transparent"
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
              showTimeSelect
              dateFormat="Pp"
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
      </div>

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

export default CreateEvent;
