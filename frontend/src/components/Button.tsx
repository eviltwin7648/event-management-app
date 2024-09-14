interface ButtonPropsType {
  title: string;
  link: string;
  onClick?:()=>void
}

const Button = ({ title, link,onClick }: ButtonPropsType) => {
  
  if (onClick) onClick()
  return (
    <div className="bg-primary rounded-md py-2 px-4 text-white">
      <a href={link} className="px-4 py-2 block">
        {title}
      </a>
    </div>
  );
};

export default Button;
