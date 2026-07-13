import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import RestaurantDashboard from "./pages/RestaurantDashboard";
import RestaurantProfile from "./pages/RestaurantProfile";
import UpdateRestaurantProfile from "./pages/UpdateRestaurantProfile";
import CreateDonation from "./pages/CreateDonation";
import MyDonations from "./pages/MyDonations";
import UpdateDonation from "./pages/UpdateDonations";
import NGOProfile from './pages/NGOProfile'
import NGODashboard from "./pages/NGODashboard";
import AvailableDonations from "./pages/AvailableDonations";
import ClaimDonation from "./pages/ClaimDonation";
import MyClaims from "./pages/MyClaims";
import UpdateNGOProfile from "./pages/UpdateNGOProfile";
import ClaimRequests from "./pages/ClaimRequests"
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
    <Route
    path="/create-donation"
    element={<CreateDonation/>}
    />
    <Route path="/my-donations" 
    element={<MyDonations/>} 
    />
    <Route
    path="/update-donation/:id"
    element={<UpdateDonation />}
    />
    <Route
    path="/ngo-profile"
    element={<NGOProfile />}
    />
    <Route
    path="/ngo-dashboard"
    element={<NGODashboard />}
    />
    <Route
    path="/available-donations"
    element={<AvailableDonations />}
    />
    <Route
    path="/claim-donation/:id"
    element={<ClaimDonation />}
    />
    <Route
    path="/my-claims"
    element={<MyClaims />}
    />
    <Route
    path="/update-ngo-profile"
    element={<UpdateNGOProfile />}
    />
    <Route
    path="/claim-requests"
    element={<ClaimRequests />}
    />
   </Routes>
  );
}

export default App;