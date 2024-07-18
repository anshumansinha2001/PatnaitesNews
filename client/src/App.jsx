import { RouterProvider } from "react-router-dom";
import router from "./router/Router";
import { useSelector } from "react-redux";

export default function App() {
  const themeMode = useSelector((state) => state.theme.themeMode);

  return (
    <div data-theme={themeMode}>
      <RouterProvider router={router} />
    </div>
  );
}
