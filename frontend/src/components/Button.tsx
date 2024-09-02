interface ButtonPropsType {
  title: string;
  link: string;
  isActive: boolean;
}

const Button = ({ title, link, isActive }: ButtonPropsType) => {
  return (
    <div
      className={`text-white rounded-md ${
        isActive ? "bg-gray-700" : "bg-transparent"
      }`}
    >
      <a href={link} className="px-4 py-2 block">
        {title}
      </a>
    </div>
  );
};

export default Button;
