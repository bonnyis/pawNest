import { useEffect } from "react";
import Button from "@/shared/ui/common/Button";
interface Props {
  onCompleted: (address: string) => void;
  className?: string;
}

const DaumPostCode = ({ onCompleted, className }: Props) => {
  const handlePostCode = () => {
    if (!window.daum || !onCompleted) {
      console.error("Daum script not loaded");
      return;
    }

    new window.daum.Postcode({
      oncomplete: (data: any) => {
        onCompleted(data.address);
      },
    }).open();
  };
  useEffect(() => {
    const SCRIPT_URL =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);
  return (
    <div className={className}>
      <Button size={"md"} variant="primary" onClick={() => handlePostCode()}>
        주소검색
      </Button>
    </div>
  );
};

export default DaumPostCode;
