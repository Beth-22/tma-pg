const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  ...props
}) => {
  const baseClasses =
    "rounded-lg font-medium transition-all duration-200 active:scale-95";

  const variants = {
    primary: "bg-telegram-button text-telegram-buttonText hover:opacity-90",
    secondary:
      "bg-gray-500/10 text-black hover:bg-gray-500/20 border border-gray-300/30",
    outline:
      "border border-telegram-button text-telegram-button hover:bg-telegram-button hover:text-telegram-buttonText",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const classes = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    ${className}
  `.trim();

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
