import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ROUTES, ROUTES_INFO } from "@/shared/routes/routes";
const SubHeader = () => {
  const [currentName, setCurrentName] = useState<string>("");
  const [currentDesc, setCurrentDesc] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== ROUTES.HOME) {
      const routeInfo = ROUTES_INFO.filter(
        (item) => item.path === location.pathname,
      )[0];
      console.log(routeInfo);
      setCurrentName(routeInfo?.title ?? "");
      setCurrentDesc(routeInfo?.desc ?? "");
    }
  }, [location]);
  return (
    <div className="text-center bg-oliveGr bg-opacity-10 border-b border-oliveGr border-opacity-30">
      <h2 className="pt-3 font-bold text-lg">{currentName}</h2>
      <p className="py-3 text-base">{currentDesc}</p>
    </div>
  );
};
export default SubHeader;
