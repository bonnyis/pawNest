import {} from "react";
import { useAppStore } from "@/app/store/appStore";
type SpinnerProps = {
  size?: number;
  className?: string;
};
const LoadingSpinner = ({ size = 48, className = "" }: SpinnerProps) => {
  const { isOpen } = useAppStore();
  return (
    <div
      className={`fixed top-1/2 inset-0 flex item-center justify-center ${isOpen ? "right-1/4" : "left-0"}`}
    >
      <div
        className={`animate-spin rounded-full border-4 border-gray-200 border-t-gray-900 ${className}`}
        style={{
          width: size,
          height: size,
        }}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
