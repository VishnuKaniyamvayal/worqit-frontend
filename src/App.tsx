import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home/Home";
import NotFound from "./components/NotFound";
import Profile from "./pages/Profile/Profile";
import AddEmployee from "./pages/Employee/AddEmployee/";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoutes allowedRoles={["admin"]}>
        <MainLayout />
      </ProtectedRoutes>,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path:"/add-employee",
          element: <AddEmployee />,
        },
        {
          path:"/profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
     {
    path: "*", // catch-all for anything not matched
    element: <NotFound />,
  },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
