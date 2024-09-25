import Button from "./Button";
import Image from "../assets/image4.png";

const HomeCreateEvent = () => {
  return (
    <div className="bg-navy_blue h-64 flex flex-row">
      <div className="w-1/2 h-full m-auto flex justify-center items-center ">
        <img src={Image} className=" object-contain h-full w-full" alt="png" />
      </div>
      <div className="flex w-1/2  flex-col justify-center gap-3 items-start">
        {/* <div className="text-white gap-4"> */}
          <p className="text-white font-bold text-4xl">Make your own Event</p>
          <p className="text-gray-100">Hosting an exiciting event? List here. </p>
        
        <Button title="Create Events" link="/createevent" />
      </div>
    </div>
  );
};

export default HomeCreateEvent;
