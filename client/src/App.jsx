import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import RestaurantDashboard from "./pages/RestaurantDashboard";
import RestaurantProfile from "./pages/RestaurantProfile";
import UpdateRestaurantProfile from "./pages/UpdateRestaurantProfile";
function App() {
  return (
    <Routes>
    <Route path="/" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route
        path="/restaurant-dashboard"
        element={<RestaurantDashboard />}
    />
    <Route
        path="/restaurant-profile"
        element={<RestaurantProfile />}
    />
    <Route
    path="/restaurant-dashboard"
    element={<RestaurantDashboard/>}
    />
    <Route
    path="/update-restaurant-profile"
    element={<UpdateRestaurantProfile />}
    />
   </Routes>
  );
}

export default App;