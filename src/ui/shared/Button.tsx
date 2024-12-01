interface ButtonProps {
  label: string
  onClick?: () => void
  className?: string
  ariaPressed?: boolean
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  className = "",
  ariaPressed,
}) => {
  return (
    <button
      className={`px-4 py-2 text-sm font-bold rounded-full transition-colors duration-200 focus:outline-none ${className}`}
      onClick={onClick}
      aria-pressed={ariaPressed}
    >
      {label}
    </button>
  )
}

export default Button
