import { Link } from "react-router-dom";

interface ButtonPropsType {
  title: string;
  link: string;
  onClick?: () => void;
}

const Button = ({ title, link, onClick }: ButtonPropsType) => {
  return (
    <div className="bg-primary rounded-md py-2 px-4 text-white">
      <Link to={link} onClick={onClick} className="px-4 py-2 block">
        {title}
      </Link>
    </div>
  );
};

export default Button;
