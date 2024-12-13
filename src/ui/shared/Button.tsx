interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  ariaPressed?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  className = "",
  ariaPressed,
  disabled = false,
}) => {
  return (
    <button
      className={`px-4 py-2 text-sm font-bold rounded-full transition-colors duration-200 ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      } ${className}`}
      onClick={disabled ? undefined : onClick}
      aria-pressed={ariaPressed}
    >
      {label}
    </button>
  );
};

export default Button;
