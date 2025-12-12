import "./Button.css";

type ButtonProps = {
  text: string;
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
};

function Button({
  text,
  type = "button",
  onClick,
  className = "",
  variant = "primary",
}: ButtonProps) {
  // variant används som extra klass, ex: button--secondary
  const variantClass = `button--${variant}`;
  return (
    <button
      type={type}
      onClick={onClick}
      className={`button ${variantClass} ${className}`}
    >
      {text}
    </button>
  );
}

export default Button;
