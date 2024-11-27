interface CategoryButtonProps {
  label: string; // The category name displayed on the button
  isActive?: boolean; // Optional prop to highlight the active button
  onClick?: () => void; // Optional click handler
}

const buttonCategoryBarClass = `
  whitespace-nowrap px-4 py-2 text-sm font-small text-white 
  bg-[#1b192e] rounded-full focus:outline-none focus:ring-2 
  focus:ring-twd-secondary-purple active:bg-twd-secondary-purple sm:text-base 
  transition-colors duration-200`;

const CategoryButton: React.FC<CategoryButtonProps> = ({ label, isActive = false, onClick }) => {
  const activeClass = isActive ? 'bg-twd-secondary-purple' : '';

  return (
    <button
      className={`${buttonCategoryBarClass} ${activeClass}`}
      onClick={onClick}
      aria-pressed={isActive} // For accessibility
    >
      {label}
    </button>
  );
};

export default CategoryButton;