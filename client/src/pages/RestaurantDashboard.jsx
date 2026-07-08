import { Link } from "react-router-dom";
import "../styles/RestaurantDashboard.css";
function RestaurantDashboard() {
    const user = JSON.parse(localStorage.getItem("user"));
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
                <Link
                    to="/login"
                    className="dashboard-card logout-card"
                >
                    <h2>🚪</h2>
                    <h3>Logout</h3>
                    <p>
                        Sign out
                    </p>
                </Link>
            </div>
            <div className="recent-section">
                <h2>Recent Donations</h2>
                <p>No donations yet.</p>
            </div>
        </div>
    );
}
export default RestaurantDashboard;