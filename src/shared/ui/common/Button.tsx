import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "cancel" | "confirm" | "danger" | "primary";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}
const typeStyle = {
  confirm: "bg-sky-400 text-white hover:bg-sky-500",
  cancel: "border-gray-300 text-gray-600 hover:bg-gray-100",
  danger: "bg-red-400 text-white hover:bg-red-500",
  primary:
    "border-gray-300 bg-gray-300 hover:text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500",
  // primary: "", // 색상 다시 정할 것
};
const sizeStyle: Record<ButtonSize, string> = {
  sm: "p-2 text-sm",
  md: "p-3",
  lg: "p-4 text-lg",
};
const Button = ({
  variant = "primary",
  size = "sm",
  className = "",
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={`border p-2 rounded-lg  ${typeStyle[variant]} ${sizeStyle[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
