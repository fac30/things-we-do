interface ButtonProps {
  label: string;
  onClick?: () => void;
  onEventClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  ariaPressed?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  onEventClick,
  className = "",
  ariaPressed,
}) => {
  if (onClick && onEventClick) {
    console.warn(
      "Warning: You cannot pass both onClick and onEventClick to Button."
    );
  }
  return (
    <button
      className={`px-4 py-2 text-sm font-bold rounded-full transition-colors duration-200 ${className}`}
      onClick={onClick || onEventClick}
      aria-pressed={ariaPressed}
    >
      {label}
    </button>
  );
};

export default Button;
