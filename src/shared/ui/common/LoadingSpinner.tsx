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
      className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center ${isOpen ? "" : ""}`}
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
