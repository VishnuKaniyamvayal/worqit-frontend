import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home/Home";
import NotFound from "./components/NotFound";
import Profile from "./pages/Profile/Profile";
import AddEmployee from "./pages/Employee/AddEmployee";
import ViewEmployee from "./pages/Employee/ViewEmployee";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes allowedRoles={["admin"]}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/add-employee",
          element: <AddEmployee />,
        },
        {
          path: "/view-employees",
          element: <ViewEmployee />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;