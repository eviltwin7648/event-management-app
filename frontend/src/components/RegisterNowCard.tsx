import Button from "./Button";

const RegisterNowCard = ({
  date,
  price,
  onClick,
}: {
  date: string;
  price: number;
  onClick: () => void;
}) => {
  const formattedDate = new Date(date).toLocaleString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const currentDate = new Date();
  const eventdate = new Date(date);
  console.log(currentDate > eventdate);

  return (
    <div className="bg-white text-black flex flex-col rounded-lg p-5 gap-3">
      <p className="text-2xl font-bold">Date & Time</p>
      <p className="text-gray-400 text-[18px]">{formattedDate}</p>
      <p className="text-2xl font-bold">Price</p>
      <p className="text-gray-400 text-[18px]">₹ {price}</p>
      {currentDate > eventdate ? (
        <div className="text-center">
          <Button title="Registration Closed" link="" />
          <p className="text-gray-400 mt-2">No Refunds</p>
        </div>
      ) : (
        <div className="text-center">
          <Button onClick={onClick} title="Register Now" link="" />
          <p className="text-gray-400 mt-2">No Refunds</p>
        </div>
      )}
    </div>
  );
};

export default RegisterNowCard;
