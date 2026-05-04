import { RouterProvider } from "react-router-dom";
import { router } from "./routers";
import { useEffect } from "react";
import { useAuthStore } from "@/app/store/authStore";
import { useSocketStore } from "@/app/store/socketStore";

const App = () => {
  const { token } = useAuthStore();
  const { connect } = useSocketStore();

  useEffect(() => {
    if (token) {
      connect(token);
    }
  }, [token]);

  return <RouterProvider router={router} />;
};

export default App;
