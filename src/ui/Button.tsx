import styles from "./Button.module.css";

interface ButtonProps {
  className?: string;
  onClick?: (event: React.SyntheticEvent) => {};
  children?: React.ReactNode;
  type?: "button" | "reset" | "submit";
}

const Button = ({ type, className, onClick, children }: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={onClick}
      type={type || "button"}
    >
      {children}
    </button>
  );
};

export default Button;
