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
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <Routes>

      {/* Public Routes */}

      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* Restaurant Routes */}

      <Route

        path="/restaurant-dashboard"

        element={

          <ProtectedRoute allowedRoles={["Restaurant"]}>

            <RestaurantDashboard />

          </ProtectedRoute>

        }

      />

      <Route

        path="/restaurant-profile"

        element={

          <ProtectedRoute allowedRoles={["Restaurant"]}>

            <RestaurantProfile />

          </ProtectedRoute>

        }

      />

      <Route

        path="/update-restaurant-profile"

        element={

          <ProtectedRoute allowedRoles={["Restaurant"]}>

            <UpdateRestaurantProfile />

          </ProtectedRoute>

        }

      />

      <Route

        path="/create-donation"

        element={

          <ProtectedRoute allowedRoles={["Restaurant"]}>

            <CreateDonation />

          </ProtectedRoute>

        }

      />

      <Route

        path="/my-donations"

        element={

          <ProtectedRoute allowedRoles={["Restaurant"]}>

            <MyDonations />

          </ProtectedRoute>

        }

      />

      <Route

        path="/update-donation/:id"

        element={

          <ProtectedRoute allowedRoles={["Restaurant"]}>

            <UpdateDonation />

          </ProtectedRoute>

        }

      />

      <Route

        path="/claim-requests"

        element={

          <ProtectedRoute allowedRoles={["Restaurant"]}>

            <ClaimRequests />

          </ProtectedRoute>

        }

      />

      {/* NGO Routes */}

      <Route

        path="/ngo-dashboard"

        element={

          <ProtectedRoute allowedRoles={["NGO"]}>

            <NGODashboard />

          </ProtectedRoute>

        }

      />

      <Route

        path="/ngo-profile"

        element={

          <ProtectedRoute allowedRoles={["NGO"]}>

            <NGOProfile />

          </ProtectedRoute>

        }

      />

      <Route

        path="/update-ngo-profile"

        element={

          <ProtectedRoute allowedRoles={["NGO"]}>

            <UpdateNGOProfile />

          </ProtectedRoute>

        }

      />

      <Route

        path="/available-donations"

        element={

          <ProtectedRoute allowedRoles={["NGO"]}>

            <AvailableDonations />

          </ProtectedRoute>

        }

      />

      <Route

        path="/claim-donation/:id"

        element={

          <ProtectedRoute allowedRoles={["NGO"]}>

            <ClaimDonation />

          </ProtectedRoute>

        }

      />

      <Route

        path="/my-claims"

        element={

          <ProtectedRoute allowedRoles={["NGO"]}>

            <MyClaims />

          </ProtectedRoute>

        }

      />

    </Routes>

  );

}

export default App;