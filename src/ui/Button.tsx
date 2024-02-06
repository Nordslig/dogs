import styles from "./Button.module.css";

interface ButtonProps {
  type: "button" | "reset" | "submit";
  className?: string;
  onClick: () => {};
  children?: React.ReactNode;
}

const Button = ({ type, className, onClick }: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={onClick}
      type={"button" || type}
    ></button>
  );
};

export default Button;
