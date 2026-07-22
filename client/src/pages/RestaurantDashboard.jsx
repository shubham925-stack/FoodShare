import { Link } from "react-router-dom";
import "../styles/RestaurantDashboard.css";
import { useNavigate } from "react-router-dom";
function RestaurantDashboard() {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate()
    const handleLogout=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user")
        navigate("/login")
    }
    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>🍽️ FoodShare</h1>
                <h2>Welcome, {user?.name} 👋</h2>
                <p>Let's reduce food waste together.</p>
            </div>
            <div className="status-card">
                <h3>Restaurant Status</h3>
                <p>
                    Verification :
                    <span className="pending">
                        Pending
                    </span>
                </p>
            </div>
            <div className="dashboard-cards">
                <Link
                    to="/create-donation"
                    className="dashboard-card"
                >
                    <h2>🍱</h2>
                    <h3>Add Donation</h3>
                    <p>
                        Donate leftover food
                    </p>
                </Link>
                <Link
                    to="/my-donations"
                    className="dashboard-card"
                >
                    <h2>📋</h2>
                    <h3>My Donations</h3>
                    <p>
                        View and manage donations
                    </p>
                </Link>
                <Link
                    to="/update-restaurant-profile"
                    className="dashboard-card"
                >
                    <h2>👤</h2>
                    <h3>Edit Profile</h3>
                    <p>
                        Update restaurant details
                    </p>
                </Link>
                <div
                    className="dashboard-card"
                    onClick={() => navigate("/claim-requests")}
                >
                    <h2>Claim Requests</h2>
                    <p>Review NGO requests</p>
                </div>
                <div
                    className="dashboard-card logout-card"
                    onClick={handleLogout}
                >
                    <h2>🚪</h2>
                    <h3>Logout</h3>
                    <p>
                        Sign out
                    </p>
                </div>
            </div>
        </div>
    );
}
export default RestaurantDashboard;