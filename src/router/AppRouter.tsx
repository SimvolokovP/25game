import { Route, Routes } from "react-router-dom";
import { routes } from ".";

const AppRouter = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route
          path={route.path}
          index={route.isIndex}
          element={<route.element />}
        />
      ))}
    </Routes>
  );
};

export default AppRouter